import { ZodError } from 'zod';
import {
  PageConfigSchema,
  JsonNodeSchema,
  ComponentTypeSchema,
  TemplateTypeSchema,
  BehaviorKeySchema,
  type PageConfig,
  type JsonNode,
} from './pageSchema';

/**
 * Validators
 * 
 * Runtime validation utilities for page configurations
 */

/**
 * Validation Result
 */
export interface ValidationResult<T = any> {
  success: boolean;
  data?: T;
  errors?: ValidationError[];
}

/**
 * Validation Error
 */
export interface ValidationError {
  path: string[];
  message: string;
  code: string;
}

/**
 * Convert Zod errors to ValidationError format
 */
function formatZodErrors(error: ZodError): ValidationError[] {
  if (!error) {
    console.error('[formatZodErrors] Error is null or undefined:', error);
    return [{
      path: [],
      message: 'Error object is null or undefined',
      code: 'NULL_ERROR',
    }];
  }
  
  if (!error.issues) {
    console.error('[formatZodErrors] Error.issues is missing:', error);
    return [{
      path: [],
      message: 'Error object missing issues array',
      code: 'MISSING_ERRORS',
    }];
  }
  
  return error.issues.map((err) => ({
    path: err.path.map(String),
    message: err.message,
    code: err.code,
  }));
}

/**
 * Validate Page Configuration
 * 
 * Validates a complete page configuration against the schema
 * 
 * @param config - Page configuration object
 * @returns Validation result with typed data or errors
 */
export function validatePageConfig(config: unknown): ValidationResult<PageConfig> {
  try {
    const data = PageConfigSchema.parse(config);
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.log('[validatePageConfig] Caught error:', error);
    console.log('[validatePageConfig] Error instanceof ZodError:', error instanceof ZodError);
    console.log('[validatePageConfig] Error type:', typeof error);
    console.log('[validatePageConfig] Error constructor:', error?.constructor?.name);
    console.log('[validatePageConfig] Has issues property:', 'issues' in (error as any));
    console.log('[validatePageConfig] Has errors property:', 'errors' in (error as any));
    
    // Check for ZodError by duck-typing (more reliable with HMR)
    if (error && typeof error === 'object' && 'issues' in error) {
      const zodError = error as any;
      console.log('[validatePageConfig] Using issues array:', zodError.issues);
      return {
        success: false,
        errors: zodError.issues.map((err: any) => ({
          path: err.path.map(String),
          message: err.message,
          code: err.code,
        })),
      };
    }
    
    // Fallback for instanceof check
    if (error instanceof ZodError) {
      console.log('[validatePageConfig] ZodError.issues:', error.issues);
      return {
        success: false,
        errors: formatZodErrors(error),
      };
    }
    
    return {
      success: false,
      errors: [
        {
          path: [],
          message: error instanceof Error ? error.message : 'Unknown validation error',
          code: 'UNKNOWN_ERROR',
        },
      ],
    };
  }
}

/**
 * Validate JSON Node
 * 
 * Validates a single component node
 * 
 * @param node - JSON node object
 * @returns Validation result
 */
export function validateJsonNode(node: unknown): ValidationResult<JsonNode> {
  try {
    const data = JsonNodeSchema.parse(node);
    return {
      success: true,
      data,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        errors: formatZodErrors(error),
      };
    }
    return {
      success: false,
      errors: [
        {
          path: [],
          message: error instanceof Error ? error.message : 'Unknown validation error',
          code: 'UNKNOWN_ERROR',
        },
      ],
    };
  }
}

/**
 * Validate Component Type
 * 
 * Checks if a component type exists in the registry
 * 
 * @param type - Component type string
 * @returns Validation result
 */
export function validateComponentType(type: string): ValidationResult<string> {
  try {
    const data = ComponentTypeSchema.parse(type);
    return {
      success: true,
      data,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        errors: formatZodErrors(error),
      };
    }
    return {
      success: false,
      errors: [
        {
          path: [],
          message: error instanceof Error ? error.message : 'Unknown validation error',
          code: 'UNKNOWN_ERROR',
        },
      ],
    };
  }
}

/**
 * Validate Template Type
 * 
 * Checks if a template type exists in the registry
 * 
 * @param type - Template type string
 * @returns Validation result
 */
export function validateTemplateType(type: string): ValidationResult<string> {
  try {
    const data = TemplateTypeSchema.parse(type);
    return {
      success: true,
      data,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        errors: formatZodErrors(error),
      };
    }
    return {
      success: false,
      errors: [
        {
          path: [],
          message: error instanceof Error ? error.message : 'Unknown validation error',
          code: 'UNKNOWN_ERROR',
        },
      ],
    };
  }
}

/**
 * Validate Behavior Key
 * 
 * Checks if a behavior exists in the registry
 * 
 * @param key - Behavior key string
 * @returns Validation result
 */
export function validateBehaviorKey(key: string): ValidationResult<string> {
  try {
    const data = BehaviorKeySchema.parse(key);
    return {
      success: true,
      data,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        errors: formatZodErrors(error),
      };
    }
    return {
      success: false,
      errors: [
        {
          path: [],
          message: error instanceof Error ? error.message : 'Unknown validation error',
          code: 'UNKNOWN_ERROR',
        },
      ],
    };
  }
}

/**
 * Safe Parse Page Config
 * 
 * Parses page config without throwing errors
 * 
 * @param config - Page configuration
 * @returns Safe parse result
 */
export function safeParsePageConfig(config: unknown) {
  return PageConfigSchema.safeParse(config);
}

/**
 * Assert Valid Page Config
 * 
 * Throws error if page config is invalid
 * 
 * @param config - Page configuration
 * @throws {ZodError} If validation fails
 */
export function assertValidPageConfig(config: unknown): asserts config is PageConfig {
  PageConfigSchema.parse(config);
}

/**
 * Get Validation Summary
 * 
 * Returns a human-readable summary of validation errors
 * 
 * @param errors - Array of validation errors
 * @returns Summary string
 */
export function getValidationSummary(errors: ValidationError[]): string {
  if (errors.length === 0) {
    return 'No errors';
  }

  const summary = errors.map((err) => {
    const path = err.path.length > 0 ? err.path.join('.') : 'root';
    return `  - ${path}: ${err.message}`;
  }).join('\n');

  return `Validation failed with ${errors.length} error(s):\n${summary}`;
}

/**
 * Validate and Log
 * 
 * Validates config and logs errors to console
 * 
 * @param config - Page configuration
 * @param label - Optional label for logging
 * @returns Validation result
 */
export function validateAndLog(
  config: unknown,
  label: string = 'Page Config'
): ValidationResult<PageConfig> {
  const result = validatePageConfig(config);

  if (!result.success) {
    console.error(`${label} Validation Failed:`);
    console.error(getValidationSummary(result.errors || []));
  } else {
    console.log(`${label} Validation Passed ✓`);
  }

  return result;
}
