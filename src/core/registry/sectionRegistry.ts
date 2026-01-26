/**
 * Section Registry
 * 
 * Maps section IDs to React components for JSON-driven page composition.
 * Enables dynamic section loading and template marketplace functionality.
 */

import type { ComponentType } from 'react';
import { BaseRegistry } from './BaseRegistry';
import type { BaseRegistryEntry } from './types';

export type SectionComponent<P = any> = ComponentType<P> & {
  displayName?: string;
};

export interface SectionRegistryEntry extends BaseRegistryEntry<SectionComponent> {
  metadata: {
    id: string;
    name: string;
    description?: string;
    version: string;
    category: string;
    tags?: string[];
    schema?: Record<string, any>;
    defaultProps?: Record<string, any>;
    thumbnail?: string;
    previewUrl?: string;
  };
}

/**
 * Section Registry
 * 
 * Manages page section components for template composition.
 * 
 * @example
 * ```ts
 * // Register a section
 * registerSection('hero-simple', {
 *   metadata: {
 *     id: 'hero-simple',
 *     name: 'Simple Hero',
 *     version: '1.0.0',
 *     category: 'hero',
 *   },
 *   status: 'active',
 *   content: HeroSimpleSection,
 * });
 * 
 * // Get section component
 * const Section = getSection('hero-simple');
 * ```
 */
class SectionRegistryClass extends BaseRegistry<SectionComponent> {
  constructor() {
    super({
      name: 'SectionRegistry',
      allowDuplicates: false,
      validateOnRegister: true,
      enableVersioning: true,
    });
  }

  /**
   * Register a section component
   */
  registerSection(entry: SectionRegistryEntry): void {
    this.register(entry);
  }

  /**
   * Get a section component by ID
   */
  getSection(id: string, version?: string): SectionComponent | null {
    // TODO: Implement version lookup when versioning is fully supported
    const entry = this.get(id);
    return entry?.content ?? null;
  }

  /**
   * Get all sections by category
   */
  getSectionsByCategory(category: string): SectionRegistryEntry[] {
    return this.query({ category }) as SectionRegistryEntry[];
  }

  /**
   * Get all sections by tag
   */
  getSectionsByTag(tag: string): SectionRegistryEntry[] {
    return this.getAll().filter((entry) =>
      (entry as SectionRegistryEntry).metadata.tags?.includes(tag)
    ) as SectionRegistryEntry[];
  }

  /**
   * Search sections by name or description
   */
  searchSections(query: string): SectionRegistryEntry[] {
    const lowerQuery = query.toLowerCase();
    return this.getAll().filter((entry: BaseRegistryEntry<SectionComponent>) => {
      const meta = (entry as SectionRegistryEntry).metadata;
      return (
        meta.name.toLowerCase().includes(lowerQuery) ||
        meta.description?.toLowerCase().includes(lowerQuery)
      );
    }) as SectionRegistryEntry[];
  }

  /**
   * Get section schema for validation
   */
  getSectionSchema(id: string, version?: string): Record<string, any> | null {
    // TODO: Implement version lookup when versioning is fully supported
    const entry = this.get(id) as SectionRegistryEntry | null;
    return entry?.metadata.schema ?? null;
  }

  /**
   * Get section default props
   */
  getSectionDefaultProps(id: string, version?: string): Record<string, any> | null {
    // TODO: Implement version lookup when versioning is fully supported
    const entry = this.get(id) as SectionRegistryEntry | null;
    return entry?.metadata.defaultProps ?? null;
  }
}

// Singleton instance
export const sectionRegistry = new SectionRegistryClass();

// Convenience functions
export const registerSection = (entry: SectionRegistryEntry) =>
  sectionRegistry.registerSection(entry);

export const getSection = (id: string, version?: string) =>
  sectionRegistry.getSection(id, version);

export const getSectionsByCategory = (category: string) =>
  sectionRegistry.getSectionsByCategory(category);

export const getSectionsByTag = (tag: string) =>
  sectionRegistry.getSectionsByTag(tag);

export const searchSections = (query: string) =>
  sectionRegistry.searchSections(query);

export const listSections = () => sectionRegistry.getAll() as SectionRegistryEntry[];

export const getSectionSchema = (id: string, version?: string) =>
  sectionRegistry.getSectionSchema(id, version);

export const getSectionDefaultProps = (id: string, version?: string) =>
  sectionRegistry.getSectionDefaultProps(id, version);

export const getSectionStats = () => sectionRegistry.getStats();
