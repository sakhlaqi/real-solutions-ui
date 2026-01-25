/**
 * Schema Module
 * 
 * JSON Schema definitions and validation for page configurations.
 * Provides runtime validation, type safety, and schema migrations.
 * 
 * @example
 * ```typescript
 * import { validatePageConfig, PageConfig } from './schema';
 * 
 * const config = {
 *   template: 'DashboardLayout',
 *   slots: {
 *     header: { type: 'HeaderComposite', props: { title: 'Dashboard' } },
 *   },
 * };
 * 
 * const result = validatePageConfig(config);
 * if (result.success) {
 *   console.log('Valid config:', result.data);
 * } else {
 *   console.error('Validation errors:', result.errors);
 * }
 * ```
 */

import type { PageConfig } from './pageSchema';

// Schema Definitions
export {
  PageConfigSchema,
  JsonNodeSchema,
  ComponentTypeSchema,
  TemplateTypeSchema,
  BehaviorKeySchema,
  SlotContentSchema,
  SlotsSchema,
  PageMetadataSchema,
  DataSourceSchema,
  CURRENT_SCHEMA_VERSION,
  examplePageConfig,
} from './pageSchema';

export type {
  JsonNode,
  SlotContent,
  Slots,
  PageMetadata,
  DataSource,
  PageConfig,
} from './pageSchema';

// Validators
export {
  validatePageConfig,
  validateJsonNode,
  validateComponentType,
  validateTemplateType,
  validateBehaviorKey,
  safeParsePageConfig,
  assertValidPageConfig,
  getValidationSummary,
  validateAndLog,
} from './validators';

export type {
  ValidationResult,
  ValidationError,
} from './validators';

// Migrations
export {
  migrations,
  getSchemaVersion,
  setSchemaVersion,
  findMigrationPath,
  migrateConfig,
  isVersionCompatible,
  getMigrationSummary,
  validateAndMigrate,
} from './migrations';

export type {
  SchemaVersion,
  MigrationFn,
  Migration,
} from './migrations';

/**
 * Quick Validation Helper
 * 
 * Validates a page config and returns typed result or throws
 * 
 * @param config - Page configuration to validate
 * @returns Validated and typed page config
 * @throws {Error} If validation fails
 */
export function validateOrThrow(config: unknown): PageConfig {
  const { validatePageConfig } = require('./validators');
  const result = validatePageConfig(config);
  
  if (!result.success) {
    const { getValidationSummary } = require('./validators');
    throw new Error(getValidationSummary(result.errors || []));
  }
  
  return result.data!;
}

/**
 * Schema Utilities
 */
export const SchemaUtils = {
  /**
   * Check if config is valid
   */
  isValid: (config: unknown): boolean => {
    const { validatePageConfig } = require('./validators');
    return validatePageConfig(config).success;
  },

  /**
   * Get config errors
   */
  getErrors: (config: unknown) => {
    const { validatePageConfig } = require('./validators');
    const result = validatePageConfig(config);
    return result.success ? [] : result.errors || [];
  },

  /**
   * Migrate to current version
   */
  migrate: (config: any) => {
    const { migrateConfig, CURRENT_SCHEMA_VERSION } = require('./migrations');
    return migrateConfig(config, CURRENT_SCHEMA_VERSION);
  },

  /**
   * Validate and migrate
   */
  validateAndMigrate: (config: any) => {
    const { validateAndMigrate } = require('./migrations');
    return validateAndMigrate(config);
  },
};
