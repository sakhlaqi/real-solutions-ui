/**
 * Template Migration System
 * 
 * Handles version migrations with hooks and utilities
 */

import type { SemanticVersion } from './versioning';
import { parseVersion, versionToString, compareVersions } from './versioning';

/**
 * Migration function signature
 */
export type MigrationFunction<T = any> = (data: T, context: MigrationContext) => T | Promise<T>;

/**
 * Migration context
 */
export interface MigrationContext {
  fromVersion: SemanticVersion;
  toVersion: SemanticVersion;
  templateId: string;
  dryRun?: boolean;
  warnings: string[];
  errors: string[];
}

/**
 * Migration definition
 */
export interface Migration {
  /** Unique migration ID */
  id: string;
  
  /** Source version */
  from: string;
  
  /** Target version */
  to: string;
  
  /** Migration function */
  migrate: MigrationFunction;
  
  /** Description */
  description?: string;
  
  /** Breaking changes introduced */
  breaking?: boolean;
}

/**
 * Migration result
 */
export interface MigrationResult<T = any> {
  success: boolean;
  data?: T;
  version: SemanticVersion;
  migrationsApplied: string[];
  warnings: string[];
  errors: string[];
}

/**
 * Migration registry
 */
export class MigrationRegistry {
  private migrations = new Map<string, Migration[]>();

  /**
   * Register a migration for a template
   */
  register(templateId: string, migration: Migration): void {
    if (!this.migrations.has(templateId)) {
      this.migrations.set(templateId, []);
    }
    
    const templateMigrations = this.migrations.get(templateId)!;
    templateMigrations.push(migration);
    
    // Sort by version
    templateMigrations.sort((a, b) => {
      const fromA = parseVersion(a.from);
      const fromB = parseVersion(b.from);
      return compareVersions(fromA, fromB) === 'less' ? -1 : 1;
    });
  }

  /**
   * Get migrations for a template between versions
   */
  getMigrations(
    templateId: string,
    fromVersion: string,
    toVersion: string
  ): Migration[] {
    const templateMigrations = this.migrations.get(templateId) || [];
    const from = parseVersion(fromVersion);
    const to = parseVersion(toVersion);
    
    return templateMigrations.filter(migration => {
      const migrationFrom = parseVersion(migration.from);
      const migrationTo = parseVersion(migration.to);
      
      // Migration is applicable if it's within the range
      return (
        compareVersions(migrationFrom, from) !== 'less' &&
        compareVersions(migrationTo, to) !== 'greater'
      );
    });
  }

  /**
   * Apply migrations to data
   */
  async migrate<T = any>(
    templateId: string,
    data: T,
    fromVersion: string,
    toVersion: string,
    options: { dryRun?: boolean } = {}
  ): Promise<MigrationResult<T>> {
    const migrations = this.getMigrations(templateId, fromVersion, toVersion);
    
    const context: MigrationContext = {
      fromVersion: parseVersion(fromVersion),
      toVersion: parseVersion(toVersion),
      templateId,
      dryRun: options.dryRun,
      warnings: [],
      errors: [],
    };

    let currentData = data;
    const applied: string[] = [];

    try {
      for (const migration of migrations) {
        if (!options.dryRun) {
          currentData = await migration.migrate(currentData, context);
        }
        applied.push(migration.id);
        
        if (migration.breaking) {
          context.warnings.push(
            `Migration ${migration.id} contains breaking changes: ${migration.description}`
          );
        }
      }

      return {
        success: true,
        data: currentData,
        version: parseVersion(toVersion),
        migrationsApplied: applied,
        warnings: context.warnings,
        errors: context.errors,
      };
    } catch (error) {
      context.errors.push(`Migration failed: ${error}`);
      
      return {
        success: false,
        version: context.fromVersion,
        migrationsApplied: applied,
        warnings: context.warnings,
        errors: context.errors,
      };
    }
  }

  /**
   * Check if migration path exists
   */
  hasMigrationPath(
    templateId: string,
    fromVersion: string,
    toVersion: string
  ): boolean {
    const migrations = this.getMigrations(templateId, fromVersion, toVersion);
    return migrations.length > 0;
  }
}

/**
 * Global migration registry
 */
export const migrationRegistry = new MigrationRegistry();

/**
 * Common migration utilities
 */
export const MigrationUtils = {
  /**
   * Rename a property
   */
  renameProperty(data: any, oldPath: string, newPath: string): any {
    const value = getNestedValue(data, oldPath);
    if (value !== undefined) {
      setNestedValue(data, newPath, value);
      deleteNestedValue(data, oldPath);
    }
    return data;
  },

  /**
   * Move property to different location
   */
  moveProperty(data: any, from: string, to: string): any {
    return this.renameProperty(data, from, to);
  },

  /**
   * Transform property value
   */
  transformProperty<T = any>(
    data: any,
    path: string,
    transform: (value: T) => T
  ): any {
    const value = getNestedValue(data, path);
    if (value !== undefined) {
      setNestedValue(data, path, transform(value));
    }
    return data;
  },

  /**
   * Remove property
   */
  removeProperty(data: any, path: string): any {
    deleteNestedValue(data, path);
    return data;
  },

  /**
   * Add property with default value
   */
  addProperty(data: any, path: string, defaultValue: any): any {
    const existing = getNestedValue(data, path);
    if (existing === undefined) {
      setNestedValue(data, path, defaultValue);
    }
    return data;
  },

  /**
   * Merge objects
   */
  mergeObjects(target: any, source: any): any {
    return { ...target, ...source };
  },
};

/**
 * Helper: Get nested value
 */
function getNestedValue(obj: any, path: string): any {
  const keys = path.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (current === null || current === undefined) {
      return undefined;
    }
    current = current[key];
  }
  
  return current;
}

/**
 * Helper: Set nested value
 */
function setNestedValue(obj: any, path: string, value: any): void {
  const keys = path.split('.');
  let current = obj;
  
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current)) {
      current[key] = {};
    }
    current = current[key];
  }
  
  current[keys[keys.length - 1]] = value;
}

/**
 * Helper: Delete nested value
 */
function deleteNestedValue(obj: any, path: string): void {
  const keys = path.split('.');
  let current = obj;
  
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current)) {
      return;
    }
    current = current[key];
  }
  
  delete current[keys[keys.length - 1]];
}
