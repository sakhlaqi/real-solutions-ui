/**
 * Base Registry
 * 
 * Generic registry implementation for managing template resources.
 * All specialized registries extend this base class.
 */

import type {
  BaseRegistryEntry,
  RegistryConfig,
  RegistryQueryOptions,
  RegistryStats,
  RegistryEntryStatus,
} from './types';

/**
 * Base Registry Class
 * 
 * Thread-safe, type-safe registry for managing versioned template resources.
 * 
 * @example
 * ```ts
 * const registry = new BaseRegistry<MyContent>({ name: 'MyRegistry' });
 * registry.register({
 *   metadata: { id: 'my-item', name: 'My Item', version: '1.0.0', category: 'general' },
 *   status: 'active',
 *   content: myContentData,
 * });
 * ```
 */
export class BaseRegistry<T = unknown> {
  private entries = new Map<string, BaseRegistryEntry<T>>();
  private config: Required<RegistryConfig>;

  constructor(config: RegistryConfig) {
    this.config = {
      allowDuplicates: false,
      validateOnRegister: true,
      enableVersioning: true,
      ...config,
    };
  }

  /**
   * Register a new entry
   * 
   * @throws Error if duplicate ID exists and allowDuplicates is false
   */
  register(entry: BaseRegistryEntry<T>): void {
    const { id } = entry.metadata;

    // Check for duplicates
    if (!this.config.allowDuplicates && this.entries.has(id)) {
      throw new Error(
        `[${this.config.name}] Entry with id "${id}" already exists. ` +
        `Use update() to modify existing entries.`
      );
    }

    // Validate entry
    if (this.config.validateOnRegister) {
      this.validate(entry);
    }

    this.entries.set(id, entry);
  }

  /**
   * Register multiple entries at once
   */
  registerMany(entries: BaseRegistryEntry<T>[]): void {
    entries.forEach(entry => this.register(entry));
  }

  /**
   * Get entry by ID
   */
  get(id: string): BaseRegistryEntry<T> | undefined {
    return this.entries.get(id);
  }

  /**
   * Get entry content by ID
   */
  getContent(id: string): T | undefined {
    return this.entries.get(id)?.content;
  }

  /**
   * Check if entry exists
   */
  has(id: string): boolean {
    return this.entries.has(id);
  }

  /**
   * Update existing entry
   * 
   * @throws Error if entry doesn't exist
   */
  update(id: string, updates: Partial<BaseRegistryEntry<T>>): void {
    const existing = this.entries.get(id);
    if (!existing) {
      throw new Error(`[${this.config.name}] Entry "${id}" not found`);
    }

    const updated = {
      ...existing,
      ...updates,
      metadata: {
        ...existing.metadata,
        ...(updates.metadata || {}),
      },
    };

    this.entries.set(id, updated);
  }

  /**
   * Remove entry by ID
   */
  remove(id: string): boolean {
    return this.entries.delete(id);
  }

  /**
   * Get all entries
   */
  getAll(): BaseRegistryEntry<T>[] {
    return Array.from(this.entries.values());
  }

  /**
   * Get all entry IDs
   */
  getAllIds(): string[] {
    return Array.from(this.entries.keys());
  }

  /**
   * Query entries with filters
   */
  query(options: RegistryQueryOptions = {}): BaseRegistryEntry<T>[] {
    let results = this.getAll();

    // Filter by status
    if (options.status) {
      results = results.filter(entry => entry.status === options.status);
    }

    // Exclude deprecated unless explicitly included
    if (!options.includeDeprecated) {
      results = results.filter(entry => entry.status !== 'deprecated');
    }

    // Exclude archived unless explicitly included
    if (!options.includeArchived) {
      results = results.filter(entry => entry.status !== 'archived');
    }

    // Filter by category
    if (options.category) {
      results = results.filter(entry => entry.metadata.category === options.category);
    }

    // Filter by tags (AND logic - entry must have all specified tags)
    if (options.tags && options.tags.length > 0) {
      results = results.filter(entry => {
        const entryTags = entry.metadata.tags || [];
        return options.tags!.every(tag => entryTags.includes(tag));
      });
    }

    // Search filter
    if (options.search) {
      const searchLower = options.search.toLowerCase();
      results = results.filter(entry => {
        const name = entry.metadata.name.toLowerCase();
        const description = (entry.metadata.description || '').toLowerCase();
        return name.includes(searchLower) || description.includes(searchLower);
      });
    }

    return results;
  }

  /**
   * Get all categories
   */
  getCategories(): string[] {
    const categories = new Set<string>();
    this.entries.forEach(entry => {
      categories.add(entry.metadata.category);
    });
    return Array.from(categories).sort();
  }

  /**
   * Get all tags
   */
  getTags(): string[] {
    const tags = new Set<string>();
    this.entries.forEach(entry => {
      (entry.metadata.tags || []).forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }

  /**
   * Get registry statistics
   */
  getStats(): RegistryStats {
    const entries = this.getAll();
    
    const byStatus: Record<RegistryEntryStatus, number> = {
      active: 0,
      deprecated: 0,
      beta: 0,
      archived: 0,
    };
    
    const byCategory: Record<string, number> = {};
    const versions = new Set<string>();

    entries.forEach(entry => {
      // Count by status
      byStatus[entry.status]++;

      // Count by category
      const category = entry.metadata.category;
      byCategory[category] = (byCategory[category] || 0) + 1;

      // Collect versions
      versions.add(entry.metadata.version);
    });

    return {
      total: entries.length,
      byStatus,
      byCategory,
      versions: Array.from(versions).sort(),
    };
  }

  /**
   * Clear all entries
   */
  clear(): void {
    this.entries.clear();
  }

  /**
   * Get registry size
   */
  size(): number {
    return this.entries.size;
  }

  /**
   * Validate entry structure
   * 
   * @throws Error if entry is invalid
   */
  private validate(entry: BaseRegistryEntry<T>): void {
    const { metadata, status, content } = entry;

    // Validate metadata
    if (!metadata.id || typeof metadata.id !== 'string') {
      throw new Error('Entry metadata.id is required and must be a string');
    }

    if (!metadata.name || typeof metadata.name !== 'string') {
      throw new Error('Entry metadata.name is required and must be a string');
    }

    if (!metadata.category || typeof metadata.category !== 'string') {
      throw new Error('Entry metadata.category is required and must be a string');
    }

    if (!metadata.version || typeof metadata.version !== 'string') {
      throw new Error('Entry metadata.version is required and must be a string');
    }

    // Validate version format (basic semver check)
    if (this.config.enableVersioning && !/^\d+\.\d+\.\d+/.test(metadata.version)) {
      throw new Error(
        `Entry metadata.version "${metadata.version}" is invalid. ` +
        `Expected semantic version format (e.g., "1.0.0")`
      );
    }

    // Validate status
    const validStatuses: RegistryEntryStatus[] = ['active', 'deprecated', 'beta', 'archived'];
    if (!validStatuses.includes(status)) {
      throw new Error(
        `Entry status "${status}" is invalid. ` +
        `Must be one of: ${validStatuses.join(', ')}`
      );
    }

    // Validate content exists
    if (content === undefined || content === null) {
      throw new Error('Entry content is required');
    }
  }
}
