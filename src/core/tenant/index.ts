/**
 * Tenant Customization System
 * 
 * Fork-free customization model allowing tenants to override template properties
 * without modifying base template code.
 */

// Type exports
export type {
  TenantCustomization,
  OverrideMap,
  OverrideValue,
  OverrideSchema,
  SchemaProperty,
  ValidationResult,
  ValidationError,
  ValidationWarning,
  AppliedCustomization,
  ApplyOverridesOptions,
} from './types';

// Parser exports
export {
  parseOverridePath,
  getValueAtPath,
  setValueAtPath,
  pathExists,
  deleteValueAtPath,
  getAllPaths,
  matchPath,
} from './parser';

// Applicator exports
export {
  applyTenantCustomization,
  applyOverrides,
  extractOverrides,
  mergeOverrides,
  filterOverridesByPattern,
} from './applicator';

// Validator exports
export {
  validateOverrides,
  createTemplateSchema,
  validateColor,
} from './validator';
