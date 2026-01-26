/**
 * Template JSON Schema Validation and Linting
 * 
 * Ensures template JSON integrity and best practices
 */

import type { VersionedTemplateMetadata } from './versioning';

/**
 * Validation rule
 */
export interface ValidationRule {
  id: string;
  name: string;
  description: string;
  severity: 'error' | 'warning' | 'info';
  check: (data: any, context: ValidationContext) => ValidationIssue | null;
}

/**
 * Validation context
 */
export interface ValidationContext {
  templateId: string;
  version: string;
  path: string[];
}

/**
 * Validation issue
 */
export interface ValidationIssue {
  ruleId: string;
  severity: 'error' | 'warning' | 'info';
  message: string;
  path: string;
  suggestion?: string;
}

/**
 * Validation result
 */
export interface ValidationResult {
  valid: boolean;
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
  info: ValidationIssue[];
}

/**
 * Template validator
 */
export class TemplateValidator {
  private rules: ValidationRule[] = [];

  /**
   * Register validation rule
   */
  addRule(rule: ValidationRule): void {
    this.rules.push(rule);
  }

  /**
   * Validate template data
   */
  validate(
    data: any,
    context: Omit<ValidationContext, 'path'>
  ): ValidationResult {
    const issues: ValidationIssue[] = [];
    const fullContext: ValidationContext = { ...context, path: [] };

    // Run all rules
    for (const rule of this.rules) {
      const issue = rule.check(data, fullContext);
      if (issue) {
        issues.push(issue);
      }
    }

    // Recursively validate nested objects
    this.validateNested(data, fullContext, issues);

    // Categorize issues
    const errors = issues.filter(i => i.severity === 'error');
    const warnings = issues.filter(i => i.severity === 'warning');
    const info = issues.filter(i => i.severity === 'info');

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      info,
    };
  }

  /**
   * Validate nested objects
   */
  private validateNested(
    data: any,
    context: ValidationContext,
    issues: ValidationIssue[]
  ): void {
    if (typeof data !== 'object' || data === null) {
      return;
    }

    for (const [key, value] of Object.entries(data)) {
      const nestedContext = {
        ...context,
        path: [...context.path, key],
      };

      // Run rules on nested value
      for (const rule of this.rules) {
        const issue = rule.check(value, nestedContext);
        if (issue) {
          issues.push(issue);
        }
      }

      // Recurse
      if (typeof value === 'object' && value !== null) {
        this.validateNested(value, nestedContext, issues);
      }
    }
  }

  /**
   * Get all rules
   */
  getRules(): ValidationRule[] {
    return [...this.rules];
  }
}

/**
 * Global template validator
 */
export const templateValidator = new TemplateValidator();

/**
 * Built-in validation rules
 */

// Rule: Required fields
templateValidator.addRule({
  id: 'required-fields',
  name: 'Required Fields',
  description: 'Ensures all required fields are present',
  severity: 'error',
  check: (data, context) => {
    if (context.path.length === 0) {
      const required = ['id', 'name', 'version'];
      for (const field of required) {
        if (!(field in data)) {
          return {
            ruleId: 'required-fields',
            severity: 'error',
            message: `Required field missing: ${field}`,
            path: field,
          };
        }
      }
    }
    return null;
  },
});

// Rule: Valid version format
templateValidator.addRule({
  id: 'valid-version',
  name: 'Valid Version',
  description: 'Ensures version follows semver format',
  severity: 'error',
  check: (data, context) => {
    if (context.path[context.path.length - 1] === 'versionString') {
      const semverRegex = /^\d+\.\d+\.\d+(?:-[a-zA-Z0-9.-]+)?(?:\+[a-zA-Z0-9.-]+)?$/;
      if (typeof data === 'string' && !semverRegex.test(data)) {
        return {
          ruleId: 'valid-version',
          severity: 'error',
          message: 'Invalid semver format',
          path: context.path.join('.'),
          suggestion: 'Use format: major.minor.patch (e.g., 1.2.3)',
        };
      }
    }
    return null;
  },
});

// Rule: Consistent naming convention
templateValidator.addRule({
  id: 'naming-convention',
  name: 'Naming Convention',
  description: 'Ensures consistent kebab-case naming',
  severity: 'warning',
  check: (data, context) => {
    if (context.path[context.path.length - 1] === 'id') {
      const kebabCase = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
      if (typeof data === 'string' && !kebabCase.test(data)) {
        return {
          ruleId: 'naming-convention',
          severity: 'warning',
          message: 'ID should use kebab-case',
          path: context.path.join('.'),
          suggestion: 'Use lowercase with hyphens (e.g., my-template-id)',
        };
      }
    }
    return null;
  },
});

// Rule: No empty strings
templateValidator.addRule({
  id: 'no-empty-strings',
  name: 'No Empty Strings',
  description: 'Prevents empty string values',
  severity: 'warning',
  check: (data, context) => {
    if (typeof data === 'string' && data.trim() === '') {
      return {
        ruleId: 'no-empty-strings',
        severity: 'warning',
        message: 'Empty string value',
        path: context.path.join('.'),
        suggestion: 'Provide a meaningful value or remove the property',
      };
    }
    return null;
  },
});

// Rule: Changelog present for published templates
templateValidator.addRule({
  id: 'changelog-required',
  name: 'Changelog Required',
  description: 'Published templates should have changelog',
  severity: 'warning',
  check: (data, context) => {
    if (context.path.length === 0) {
      if (data.status === 'published' && !data.version?.changelog) {
        return {
          ruleId: 'changelog-required',
          severity: 'warning',
          message: 'Published templates should include a changelog',
          path: 'version.changelog',
          suggestion: 'Add changelog entries to document changes',
        };
      }
    }
    return null;
  },
});

// Rule: Breaking changes documented
templateValidator.addRule({
  id: 'breaking-changes-documented',
  name: 'Breaking Changes Documented',
  description: 'Major version bumps should document breaking changes',
  severity: 'error',
  check: (data, context) => {
    if (context.path.length === 0 && data.version) {
      const { major } = data.version.version || {};
      if (major > 0 && !data.version.breakingChanges?.length) {
        return {
          ruleId: 'breaking-changes-documented',
          severity: 'error',
          message: 'Major version requires breaking changes documentation',
          path: 'version.breakingChanges',
          suggestion: 'Document breaking changes for major version updates',
        };
      }
    }
    return null;
  },
});

// Rule: Author information
templateValidator.addRule({
  id: 'author-info',
  name: 'Author Information',
  description: 'Templates should include author information',
  severity: 'info',
  check: (data, context) => {
    if (context.path.length === 0 && !data.author) {
      return {
        ruleId: 'author-info',
        severity: 'info',
        message: 'Consider adding author information',
        path: 'author',
        suggestion: 'Add author field for maintainability',
      };
    }
    return null;
  },
});

// Rule: License specified
templateValidator.addRule({
  id: 'license-specified',
  name: 'License Specified',
  description: 'Templates should specify a license',
  severity: 'info',
  check: (data, context) => {
    if (context.path.length === 0 && !data.license) {
      return {
        ruleId: 'license-specified',
        severity: 'info',
        message: 'Consider specifying a license',
        path: 'license',
        suggestion: 'Add license field (e.g., MIT, Apache-2.0)',
      };
    }
    return null;
  },
});

// Rule: Tags for categorization
templateValidator.addRule({
  id: 'tags-present',
  name: 'Tags Present',
  description: 'Templates should have tags for discoverability',
  severity: 'info',
  check: (data, context) => {
    if (context.path.length === 0) {
      if (!data.tags || !Array.isArray(data.tags) || data.tags.length === 0) {
        return {
          ruleId: 'tags-present',
          severity: 'info',
          message: 'Consider adding tags for categorization',
          path: 'tags',
          suggestion: 'Add relevant tags (e.g., ["marketing", "landing"])',
        };
      }
    }
    return null;
  },
});

/**
 * Format validation result for display
 */
export function formatValidationResult(result: ValidationResult): string {
  const lines: string[] = [];
  
  if (result.valid) {
    lines.push('✅ Validation passed');
  } else {
    lines.push('❌ Validation failed');
  }
  
  if (result.errors.length > 0) {
    lines.push('\nErrors:');
    for (const error of result.errors) {
      lines.push(`  ❌ [${error.path}] ${error.message}`);
      if (error.suggestion) {
        lines.push(`     💡 ${error.suggestion}`);
      }
    }
  }
  
  if (result.warnings.length > 0) {
    lines.push('\nWarnings:');
    for (const warning of result.warnings) {
      lines.push(`  ⚠️  [${warning.path}] ${warning.message}`);
      if (warning.suggestion) {
        lines.push(`     💡 ${warning.suggestion}`);
      }
    }
  }
  
  if (result.info.length > 0) {
    lines.push('\nInfo:');
    for (const info of result.info) {
      lines.push(`  ℹ️  [${info.path}] ${info.message}`);
      if (info.suggestion) {
        lines.push(`     💡 ${info.suggestion}`);
      }
    }
  }
  
  return lines.join('\n');
}

/**
 * Schema definition for template JSON
 */
export const templateSchema = {
  type: 'object',
  required: ['id', 'name', 'version'],
  properties: {
    id: {
      type: 'string',
      pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$',
      description: 'Unique template identifier (kebab-case)',
    },
    name: {
      type: 'string',
      minLength: 1,
      description: 'Human-readable template name',
    },
    version: {
      type: 'object',
      required: ['version', 'versionString', 'releaseDate'],
      properties: {
        version: {
          type: 'object',
          required: ['major', 'minor', 'patch'],
          properties: {
            major: { type: 'number', minimum: 0 },
            minor: { type: 'number', minimum: 0 },
            patch: { type: 'number', minimum: 0 },
            prerelease: { type: 'string' },
            build: { type: 'string' },
          },
        },
        versionString: {
          type: 'string',
          pattern: '^\\d+\\.\\d+\\.\\d+(?:-[a-zA-Z0-9.-]+)?(?:\\+[a-zA-Z0-9.-]+)?$',
        },
        releaseDate: {
          type: 'string',
          format: 'date-time',
        },
        changelog: {
          type: 'array',
          items: { type: 'string' },
        },
        breakingChanges: {
          type: 'array',
          items: { type: 'string' },
        },
      },
    },
    status: {
      type: 'string',
      enum: ['draft', 'preview', 'published', 'deprecated', 'archived'],
    },
    locked: {
      type: 'boolean',
    },
    author: {
      type: 'string',
    },
    license: {
      type: 'string',
    },
    tags: {
      type: 'array',
      items: { type: 'string' },
    },
  },
};
