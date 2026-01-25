import { CURRENT_SCHEMA_VERSION, type PageConfig } from './pageSchema';

/**
 * Schema Migrations
 * 
 * Handles versioning and migration of page configurations
 * across schema changes.
 */

/**
 * Schema Version Type
 */
export type SchemaVersion = '1.0.0' | string;

/**
 * Migration Function Type
 */
export type MigrationFn = (config: any) => any;

/**
 * Migration Definition
 */
export interface Migration {
  from: SchemaVersion;
  to: SchemaVersion;
  migrate: MigrationFn;
  description: string;
}

/**
 * Migration Registry
 * 
 * Defines all available migrations between schema versions
 */
export const migrations: Migration[] = [
  // Example migration (for future use)
  // {
  //   from: '1.0.0',
  //   to: '2.0.0',
  //   description: 'Add support for nested slots',
  //   migrate: (config) => {
  //     return {
  //       ...config,
  //       meta: {
  //         ...config.meta,
  //         version: '2.0.0',
  //       },
  //     };
  //   },
  // },
];

/**
 * Get Schema Version
 * 
 * Extracts the version from a page configuration
 * 
 * @param config - Page configuration
 * @returns Schema version or undefined
 */
export function getSchemaVersion(config: any): SchemaVersion | undefined {
  return config?.meta?.version || config?.version;
}

/**
 * Set Schema Version
 * 
 * Updates the version in a page configuration
 * 
 * @param config - Page configuration
 * @param version - New version
 * @returns Updated configuration
 */
export function setSchemaVersion(config: any, version: SchemaVersion): any {
  if (config.meta) {
    return {
      ...config,
      meta: {
        ...config.meta,
        version,
      },
    };
  }
  return {
    ...config,
    version,
  };
}

/**
 * Find Migration Path
 * 
 * Finds the sequence of migrations needed to go from one version to another
 * 
 * @param from - Source version
 * @param to - Target version
 * @returns Array of migrations or null if no path exists
 */
export function findMigrationPath(
  from: SchemaVersion,
  to: SchemaVersion
): Migration[] | null {
  if (from === to) {
    return [];
  }

  // Build migration graph
  const graph = new Map<SchemaVersion, Migration[]>();
  migrations.forEach((migration) => {
    if (!graph.has(migration.from)) {
      graph.set(migration.from, []);
    }
    graph.get(migration.from)!.push(migration);
  });

  // BFS to find path
  const queue: { version: SchemaVersion; path: Migration[] }[] = [
    { version: from, path: [] },
  ];
  const visited = new Set<SchemaVersion>([from]);

  while (queue.length > 0) {
    const { version, path } = queue.shift()!;

    const nextMigrations = graph.get(version) || [];
    for (const migration of nextMigrations) {
      if (migration.to === to) {
        return [...path, migration];
      }

      if (!visited.has(migration.to)) {
        visited.add(migration.to);
        queue.push({
          version: migration.to,
          path: [...path, migration],
        });
      }
    }
  }

  return null;
}

/**
 * Migrate Configuration
 * 
 * Migrates a page configuration from one version to another
 * 
 * @param config - Page configuration
 * @param targetVersion - Target schema version (defaults to current)
 * @returns Migrated configuration
 * @throws {Error} If migration path not found or migration fails
 */
export function migrateConfig(
  config: any,
  targetVersion: SchemaVersion = CURRENT_SCHEMA_VERSION
): PageConfig {
  const currentVersion = getSchemaVersion(config);

  if (!currentVersion) {
    console.warn('No schema version found in config, assuming current version');
    return setSchemaVersion(config, targetVersion);
  }

  if (currentVersion === targetVersion) {
    return config;
  }

  const path = findMigrationPath(currentVersion, targetVersion);

  if (!path) {
    throw new Error(
      `No migration path found from version ${currentVersion} to ${targetVersion}`
    );
  }

  if (path.length === 0) {
    return config;
  }

  console.log(`Migrating config from ${currentVersion} to ${targetVersion}`);
  console.log(`Migration path: ${path.map((m) => `${m.from} → ${m.to}`).join(', ')}`);

  let migratedConfig = config;

  for (const migration of path) {
    console.log(`Applying migration: ${migration.description}`);
    try {
      migratedConfig = migration.migrate(migratedConfig);
    } catch (error) {
      throw new Error(
        `Migration from ${migration.from} to ${migration.to} failed: ${error}`
      );
    }
  }

  return migratedConfig;
}

/**
 * Is Version Compatible
 * 
 * Checks if a config version is compatible with the current schema
 * 
 * @param configVersion - Configuration version
 * @param currentVersion - Current schema version (defaults to CURRENT_SCHEMA_VERSION)
 * @returns True if compatible or migration available
 */
export function isVersionCompatible(
  configVersion: SchemaVersion,
  currentVersion: SchemaVersion = CURRENT_SCHEMA_VERSION
): boolean {
  if (configVersion === currentVersion) {
    return true;
  }

  const path = findMigrationPath(configVersion, currentVersion);
  return path !== null;
}

/**
 * Get Migration Summary
 * 
 * Returns a summary of available migrations
 * 
 * @returns Migration summary string
 */
export function getMigrationSummary(): string {
  if (migrations.length === 0) {
    return 'No migrations available';
  }

  const summary = migrations.map((m) => {
    return `  ${m.from} → ${m.to}: ${m.description}`;
  }).join('\n');

  return `Available migrations:\n${summary}`;
}

/**
 * Validate and Migrate
 * 
 * Convenience function that validates and migrates a config
 * 
 * @param config - Page configuration
 * @param targetVersion - Target version
 * @returns Migrated and validated config
 */
export function validateAndMigrate(
  config: any,
  targetVersion: SchemaVersion = CURRENT_SCHEMA_VERSION
): PageConfig {
  const migrated = migrateConfig(config, targetVersion);
  
  // Import validation here to avoid circular dependencies
  const { validatePageConfig } = require('./validators');
  const result = validatePageConfig(migrated);

  if (!result.success) {
    throw new Error(
      `Config validation failed after migration: ${result.errors?.map((e: any) => e.message).join(', ')}`
    );
  }

  return result.data!;
}
