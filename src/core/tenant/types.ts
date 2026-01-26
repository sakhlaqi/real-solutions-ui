/**
 * Tenant Customization Type System
 * 
 * Allows tenants to customize templates without forking through JSON-based overrides.
 * Supports deep path notation for precise customization.
 */

import type { ThemeOverride } from '../theme/types';

/**
 * Override value can be any JSON-serializable type
 */
export type OverrideValue = string | number | boolean | null | OverrideValue[] | { [key: string]: OverrideValue };

/**
 * Map of override paths to values
 * Uses dot notation for deep property access
 * 
 * @example
 * {
 *   "theme.colors.primary": "#ff5722",
 *   "pages.home.sections.hero.props.title": "Welcome Acme",
 *   "metadata.title": "Acme Corp"
 * }
 */
export interface OverrideMap {
  [path: string]: OverrideValue;
}

/**
 * Tenant customization configuration
 */
export interface TenantCustomization {
  /** Unique identifier for the tenant */
  tenantId: string;

  /** Name of the tenant (for display) */
  tenantName: string;

  /** Base template to customize */
  baseTemplate: string;

  /** JSON-based overrides using dot notation paths */
  overrides: OverrideMap;

  /** Optional metadata */
  metadata?: {
    createdAt?: string;
    updatedAt?: string;
    version?: string;
    description?: string;
  };
}

/**
 * Override validation result
 */
export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings?: ValidationWarning[];
}

/**
 * Validation error
 */
export interface ValidationError {
  path: string;
  message: string;
  expectedType?: string;
  receivedType?: string;
  value?: OverrideValue;
}

/**
 * Validation warning (non-blocking)
 */
export interface ValidationWarning {
  path: string;
  message: string;
  suggestion?: string;
}

/**
 * Schema definition for override validation
 */
export interface OverrideSchema {
  /** Allowed override paths with type information */
  allowedPaths: {
    [path: string]: SchemaProperty;
  };

  /** Whether to allow unknown paths (default: false) */
  allowUnknownPaths?: boolean;

  /** Custom validation functions */
  validators?: {
    [path: string]: (value: OverrideValue) => ValidationResult;
  };
}

/**
 * Schema property definition
 */
export interface SchemaProperty {
  /** Expected type */
  type: 'string' | 'number' | 'boolean' | 'object' | 'array' | 'any';

  /** Whether the property is required */
  required?: boolean;

  /** Description for documentation */
  description?: string;

  /** Default value */
  default?: OverrideValue;

  /** Validation pattern (for strings) */
  pattern?: RegExp;

  /** Minimum value (for numbers) */
  min?: number;

  /** Maximum value (for numbers) */
  max?: number;

  /** Allowed values (enum) */
  enum?: OverrideValue[];

  /** Nested schema (for objects) */
  properties?: { [key: string]: SchemaProperty };

  /** Item schema (for arrays) */
  items?: SchemaProperty;
}

/**
 * Applied customization result
 */
export interface AppliedCustomization<T = any> {
  /** Original template/data */
  original: T;

  /** Customized template/data with overrides applied */
  customized: T;

  /** List of applied override paths */
  appliedPaths: string[];

  /** Tenant info */
  tenant: {
    id: string;
    name: string;
  };
}

/**
 * Override application options
 */
export interface ApplyOverridesOptions {
  /** Whether to validate overrides before applying (default: true) */
  validate?: boolean;

  /** Whether to throw on validation errors (default: false) */
  strict?: boolean;

  /** Schema to validate against */
  schema?: OverrideSchema;

  /** Whether to merge arrays or replace them (default: 'replace') */
  arrayMergeStrategy?: 'merge' | 'replace';
}
