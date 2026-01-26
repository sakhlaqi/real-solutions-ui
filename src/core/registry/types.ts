/**
 * Template Registry Types
 * 
 * Core type definitions for the template marketplace system.
 * All templates, sections, and layouts use these types.
 */

/**
 * Template Metadata
 * 
 * Standard metadata fields for all template resources.
 */
export interface TemplateMetadata {
  /** Unique identifier (kebab-case) */
  id: string;
  
  /** Human-readable name */
  name: string;
  
  /** Category for grouping */
  category: string;
  
  /** Semantic version (e.g., "1.0.0") */
  version: string;
  
  /** Preview image URL or path */
  previewImage?: string;
  
  /** Optional description */
  description?: string;
  
  /** Tags for search/filtering */
  tags?: string[];
  
  /** Author/creator */
  author?: string;
  
  /** License type */
  license?: string;
  
  /** Creation timestamp */
  createdAt?: string;
  
  /** Last update timestamp */
  updatedAt?: string;
}

/**
 * Registry Entry Status
 */
export type RegistryEntryStatus = 'active' | 'deprecated' | 'beta' | 'archived';

/**
 * Base Registry Entry
 * 
 * Common fields for all registry entries.
 */
export interface BaseRegistryEntry<T = unknown> {
  /** Entry metadata */
  metadata: TemplateMetadata;
  
  /** Entry status */
  status: RegistryEntryStatus;
  
  /** The actual content/component */
  content: T;
  
  /** Dependencies (other registry entry IDs) */
  dependencies?: string[];
  
  /** Compatibility version range */
  compatibility?: {
    minVersion?: string;
    maxVersion?: string;
  };
}

/**
 * Registry Configuration
 * 
 * Configuration options for a registry instance.
 */
export interface RegistryConfig {
  /** Registry name for debugging */
  name: string;
  
  /** Allow duplicate IDs (default: false) */
  allowDuplicates?: boolean;
  
  /** Validate entries on registration (default: true) */
  validateOnRegister?: boolean;
  
  /** Enable versioning (default: true) */
  enableVersioning?: boolean;
}

/**
 * Registry Query Options
 */
export interface RegistryQueryOptions {
  /** Filter by category */
  category?: string;
  
  /** Filter by status */
  status?: RegistryEntryStatus;
  
  /** Filter by tags (AND logic) */
  tags?: string[];
  
  /** Include deprecated entries (default: false) */
  includeDeprecated?: boolean;
  
  /** Include archived entries (default: false) */
  includeArchived?: boolean;
  
  /** Search term (matches name, description) */
  search?: string;
}

/**
 * Registry Statistics
 */
export interface RegistryStats {
  /** Total number of entries */
  total: number;
  
  /** Entries by status */
  byStatus: Record<RegistryEntryStatus, number>;
  
  /** Entries by category */
  byCategory: Record<string, number>;
  
  /** Unique versions */
  versions: string[];
}
