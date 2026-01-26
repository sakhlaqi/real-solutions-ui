/**
 * Template Governance System
 * 
 * Enterprise-grade governance for template management
 * - Versioning (semver)
 * - Migration hooks
 * - Deprecation warnings
 * - Template locking
 * - JSON validation & linting
 */

// Versioning
export {
  type SemanticVersion,
  type TemplateVersion,
  type DeprecationNotice,
  type TemplateStatus,
  type VersionedTemplateMetadata,
  type VersionComparison,
  parseVersion,
  versionToString,
  compareVersions,
  satisfiesVersion,
  bumpVersion,
  hasBreakingChanges,
  isPrerelease,
  isStable,
} from './versioning';

// Migration
export {
  type MigrationFunction,
  type MigrationContext,
  type Migration,
  type MigrationResult,
  MigrationRegistry,
  migrationRegistry,
  MigrationUtils,
} from './migration';

// Deprecation
export {
  type DeprecationSeverity,
  type DeprecationHandler,
  DeprecationRegistry,
  deprecationRegistry,
  formatDeprecationMessage,
  createDeprecation,
  deprecated,
} from './deprecation';

// Locking & Status
export {
  type LockResult,
  type StatusTransition,
  TemplateGovernance,
  templateGovernance,
  guardModification,
  publishTemplate,
  deprecateTemplate,
  archiveTemplate,
} from './locking';

// Validation
export {
  type ValidationRule,
  type ValidationContext,
  type ValidationIssue,
  type ValidationResult,
  TemplateValidator,
  templateValidator,
  formatValidationResult,
  templateSchema,
} from './validation';

/**
 * Governance utilities
 */
export const GovernanceUtils = {
  /**
   * Create a new template with governance metadata
   */
  createTemplate(
    id: string,
    name: string,
    initialVersion = '0.1.0'
  ): VersionedTemplateMetadata {
    const version = parseVersion(initialVersion);
    
    return {
      id,
      name,
      version: {
        version,
        versionString: versionToString(version),
        releaseDate: new Date().toISOString(),
        changelog: ['Initial release'],
      },
      status: 'draft',
      locked: false,
      tags: [],
    };
  },

  /**
   * Prepare template for publication
   */
  prepareForPublish(
    metadata: VersionedTemplateMetadata,
    options: {
      author?: string;
      changelog?: string[];
      breakingChanges?: string[];
    } = {}
  ): {
    success: boolean;
    metadata?: VersionedTemplateMetadata;
    errors: string[];
  } {
    const errors: string[] = [];

    // Validate metadata
    const validation = templateValidator.validate(metadata, {
      templateId: metadata.id,
      version: metadata.version.versionString,
    });
    
    if (!validation.valid) {
      errors.push(...validation.errors.map(e => e.message));
      return { success: false, errors };
    }

    // Check if can modify
    if (!templateGovernance.canModify(metadata.id)) {
      errors.push('Template cannot be modified (locked or wrong status)');
      return { success: false, errors };
    }

    // Update metadata
    const updatedMetadata: VersionedTemplateMetadata = {
      ...metadata,
      status: 'published',
      locked: true,
      author: options.author || metadata.author,
      version: {
        ...metadata.version,
        changelog: options.changelog || metadata.version.changelog,
        breakingChanges: options.breakingChanges || metadata.version.breakingChanges,
      },
    };

    return {
      success: true,
      metadata: updatedMetadata,
      errors: [],
    };
  },

  /**
   * Check template health
   */
  checkHealth(metadata: VersionedTemplateMetadata): {
    healthy: boolean;
    issues: string[];
    warnings: string[];
  } {
    const issues: string[] = [];
    const warnings: string[] = [];

    // Validate
    const validation = templateValidator.validate(metadata, {
      templateId: metadata.id,
      version: metadata.version.versionString,
    });
    
    issues.push(...validation.errors.map(e => e.message));
    warnings.push(...validation.warnings.map(w => w.message));

    // Check deprecations
    const deprecations = deprecationRegistry.getDeprecations(metadata.id);
    if (deprecations.length > 0) {
      warnings.push(`Template has ${deprecations.length} deprecation(s)`);
    }

    // Check version stability
    if (!isStable(metadata.version.version)) {
      warnings.push('Template version is not stable (< 1.0.0 or prerelease)');
    }

    return {
      healthy: issues.length === 0,
      issues,
      warnings,
    };
  },
};

// Re-export utilities
import { parseVersion, versionToString, isStable } from './versioning';
