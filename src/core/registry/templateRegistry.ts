/**
 * Template Registry
 * 
 * Maps template IDs to React components for JSON-driven template composition.
 * Enables dynamic template loading and marketplace functionality.
 */

import type { ComponentType } from 'react';
import { BaseRegistry } from './BaseRegistry';
import type { BaseRegistryEntry } from './types';

export type TemplateComponent<P = any> = ComponentType<P> & {
  displayName?: string;
};

export interface TemplateRegistryEntry extends BaseRegistryEntry<TemplateComponent> {
  metadata: {
    id: string;
    name: string;
    description?: string;
    version: string;
    category: string;
    tags?: string[];
    author?: string;
    thumbnail?: string;
    previewUrl?: string;
  };
}

/**
 * Template Registry
 * 
 * Manages full-page template components for the marketplace and tenant customization.
 * 
 * @example
 * ```ts
 * // Register a template
 * registerTemplate('landing-basic', {
 *   metadata: {
 *     id: 'landing-basic',
 *     name: 'Basic Landing Page',
 *     version: '1.0.0',
 *     category: 'landing',
 *   },
 *   status: 'active',
 *   content: LandingBasicTemplate,
 * });
 * 
 * // Get template component
 * const Template = getTemplate('landing-basic');
 * ```
 */
class TemplateRegistryClass extends BaseRegistry<TemplateComponent> {
  constructor() {
    super({
      name: 'TemplateRegistry',
      allowDuplicates: false,
      validateOnRegister: true,
      enableVersioning: true,
    });
  }

  /**
   * Register a template component
   */
  registerTemplate(entry: TemplateRegistryEntry): void {
    this.register(entry);
  }

  /**
   * Get a template component by ID
   */
  getTemplate(id: string, version?: string): TemplateComponent | null {
    // TODO: Implement version lookup when versioning is fully supported
    const entry = this.get(id);
    return entry?.content ?? null;
  }

  /**
   * Get all templates by category
   */
  getTemplatesByCategory(category: string): TemplateRegistryEntry[] {
    return this.query({ category }) as TemplateRegistryEntry[];
  }

  /**
   * Get all templates by tag
   */
  getTemplatesByTag(tag: string): TemplateRegistryEntry[] {
    return this.getAll().filter((entry) =>
      (entry as TemplateRegistryEntry).metadata.tags?.includes(tag)
    ) as TemplateRegistryEntry[];
  }

  /**
   * Search templates by name or description
   */
  searchTemplates(query: string): TemplateRegistryEntry[] {
    const lowerQuery = query.toLowerCase();
    return this.getAll().filter((entry) => {
      const meta = (entry as TemplateRegistryEntry).metadata;
      return (
        meta.name.toLowerCase().includes(lowerQuery) ||
        meta.description?.toLowerCase().includes(lowerQuery)
      );
    }) as TemplateRegistryEntry[];
  }
}

// Singleton instance
export const templateRegistry = new TemplateRegistryClass();

// Convenience functions
export const registerTemplate = (entry: TemplateRegistryEntry) =>
  templateRegistry.registerTemplate(entry);

export const getTemplate = (id: string, version?: string) =>
  templateRegistry.getTemplate(id, version);

export const getTemplatesByCategory = (category: string) =>
  templateRegistry.getTemplatesByCategory(category);

export const getTemplatesByTag = (tag: string) =>
  templateRegistry.getTemplatesByTag(tag);

export const searchTemplates = (query: string) =>
  templateRegistry.searchTemplates(query);

export const listTemplates = () => templateRegistry.getAll() as TemplateRegistryEntry[];

export const getTemplateStats = () => templateRegistry.getStats();
