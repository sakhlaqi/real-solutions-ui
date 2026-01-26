/**
 * Override Validator
 * 
 * Validates tenant overrides against schema definitions.
 */

import type {
  OverrideMap,
  OverrideValue,
  OverrideSchema,
  SchemaProperty,
  ValidationResult,
  ValidationError,
  ValidationWarning,
} from './types';
import { pathExists, matchPath } from './parser';

/**
 * Get JavaScript type of a value
 */
function getType(value: OverrideValue): string {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  return typeof value;
}

/**
 * Validate a single override value against schema property
 */
function validateProperty(
  path: string,
  value: OverrideValue,
  property: SchemaProperty
): ValidationError[] {
  const errors: ValidationError[] = [];
  const valueType = getType(value);

  // Type check
  if (property.type !== 'any' && valueType !== property.type) {
    // Allow null for non-required properties
    if (!(value === null && !property.required)) {
      errors.push({
        path,
        message: `Expected type ${property.type}, got ${valueType}`,
        expectedType: property.type,
        receivedType: valueType,
        value,
      });
      return errors; // Don't continue validation if type is wrong
    }
  }

  // Required check
  if (property.required && (value === null || value === undefined)) {
    errors.push({
      path,
      message: 'Required property is missing or null',
      value,
    });
  }

  // String validations
  if (property.type === 'string' && typeof value === 'string') {
    if (property.pattern && !property.pattern.test(value)) {
      errors.push({
        path,
        message: `Value does not match pattern ${property.pattern}`,
        value,
      });
    }
  }

  // Number validations
  if (property.type === 'number' && typeof value === 'number') {
    if (property.min !== undefined && value < property.min) {
      errors.push({
        path,
        message: `Value ${value} is less than minimum ${property.min}`,
        value,
      });
    }
    if (property.max !== undefined && value > property.max) {
      errors.push({
        path,
        message: `Value ${value} is greater than maximum ${property.max}`,
        value,
      });
    }
  }

  // Enum validation
  if (property.enum && property.enum.length > 0) {
    const stringifiedValue = JSON.stringify(value);
    const enumMatches = property.enum.some(e => JSON.stringify(e) === stringifiedValue);
    
    if (!enumMatches) {
      errors.push({
        path,
        message: `Value must be one of: ${property.enum.map(e => JSON.stringify(e)).join(', ')}`,
        value,
      });
    }
  }

  // Object property validation
  if (property.type === 'object' && typeof value === 'object' && value !== null && !Array.isArray(value)) {
    if (property.properties) {
      for (const [key, subProperty] of Object.entries(property.properties)) {
        const subPath = `${path}.${key}`;
        const subValue = (value as any)[key];
        errors.push(...validateProperty(subPath, subValue, subProperty));
      }
    }
  }

  // Array item validation
  if (property.type === 'array' && Array.isArray(value)) {
    if (property.items) {
      value.forEach((item, index) => {
        const itemPath = `${path}[${index}]`;
        errors.push(...validateProperty(itemPath, item, property.items!));
      });
    }
  }

  return errors;
}

/**
 * Find matching schema property for a path (supports wildcards)
 */
function findSchemaProperty(
  path: string,
  schema: OverrideSchema
): SchemaProperty | undefined {
  // Try exact match first
  if (path in schema.allowedPaths) {
    return schema.allowedPaths[path];
  }

  // Try wildcard matches
  for (const [pattern, property] of Object.entries(schema.allowedPaths)) {
    if (matchPath(path, pattern)) {
      return property;
    }
  }

  return undefined;
}

/**
 * Validate tenant overrides against schema
 * 
 * @param overrides - Override map to validate
 * @param schema - Schema definition
 * @returns Validation result
 */
export function validateOverrides(
  overrides: OverrideMap,
  schema: OverrideSchema
): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];

  for (const [path, value] of Object.entries(overrides)) {
    // Find matching schema property
    const property = findSchemaProperty(path, schema);

    if (!property) {
      // Unknown path
      if (schema.allowUnknownPaths) {
        warnings.push({
          path,
          message: 'Path not defined in schema (allowed but unvalidated)',
          suggestion: 'Consider adding this path to the schema for validation',
        });
      } else {
        errors.push({
          path,
          message: 'Path not allowed by schema',
          value,
        });
      }
      continue;
    }

    // Validate property
    errors.push(...validateProperty(path, value, property));

    // Run custom validator if defined
    if (schema.validators && schema.validators[path]) {
      const customValidation = schema.validators[path](value);
      if (!customValidation.valid) {
        errors.push(...customValidation.errors);
        if (customValidation.warnings) {
          warnings.push(...customValidation.warnings);
        }
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings: warnings.length > 0 ? warnings : undefined,
  };
}

/**
 * Create a schema for common template properties
 */
export function createTemplateSchema(): OverrideSchema {
  return {
    allowedPaths: {
      // Theme overrides
      'theme.colors.primary': { type: 'string', description: 'Primary brand color', pattern: /^#[0-9a-f]{6}$/i },
      'theme.colors.secondary': { type: 'string', description: 'Secondary brand color', pattern: /^#[0-9a-f]{6}$/i },
      'theme.colors.*': { type: 'string', description: 'Any theme color', pattern: /^#[0-9a-f]{6}$/i },
      'theme.typography.fontFamily': { type: 'string', description: 'Font family' },
      'theme.typography.fontSize': { type: 'number', description: 'Base font size', min: 12, max: 24 },
      'theme.spacing.*': { type: 'number', description: 'Spacing values', min: 0 },
      'theme.radius.*': { type: 'number', description: 'Border radius values', min: 0 },
      'theme.**': { type: 'any', description: 'Any theme property' },

      // Metadata overrides
      'metadata.title': { type: 'string', required: true, description: 'Template title' },
      'metadata.description': { type: 'string', description: 'Template description' },
      'metadata.**': { type: 'any', description: 'Any metadata property' },

      // Page overrides
      'pages.*.title': { type: 'string', description: 'Page title' },
      'pages.*.sections.*.props.title': { type: 'string', description: 'Section title' },
      'pages.*.sections.*.props.subtitle': { type: 'string', description: 'Section subtitle' },
      'pages.*.sections.*.props.description': { type: 'string', description: 'Section description' },
      'pages.*.sections.*.props.buttonText': { type: 'string', description: 'Button text' },
      'pages.*.sections.*.props.buttonLink': { type: 'string', description: 'Button link' },
      'pages.**': { type: 'any', description: 'Any page property' },
    },
    allowUnknownPaths: false,
  };
}

/**
 * Validate a color value
 */
export function validateColor(value: OverrideValue): ValidationResult {
  const errors: ValidationError[] = [];

  if (typeof value !== 'string') {
    errors.push({
      path: 'color',
      message: 'Color must be a string',
      expectedType: 'string',
      receivedType: getType(value),
      value,
    });
    return { valid: false, errors };
  }

  // Check hex format
  if (!/^#[0-9a-f]{6}$/i.test(value)) {
    errors.push({
      path: 'color',
      message: 'Color must be a valid hex color (e.g., #ff5722)',
      value,
    });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
