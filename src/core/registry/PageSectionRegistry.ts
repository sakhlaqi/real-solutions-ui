/**
 * Page Section Registry
 * 
 * Central registry for all reusable page sections.
 * Sections are explicitly registered - no dynamic imports.
 */

import { BaseRegistry } from './BaseRegistry';
import type { PageSectionEntry, PageSectionDefinition } from './page-section-types';

/**
 * Page Section Registry Instance
 */
class PageSectionRegistryImpl extends BaseRegistry<PageSectionDefinition> {
  constructor() {
    super({
      name: 'PageSectionRegistry',
      allowDuplicates: false,
      validateOnRegister: true,
      enableVersioning: true,
    });
  }

  /**
   * Get section component by ID
   */
  getComponent(id: string): React.ComponentType<any> | undefined {
    const entry = this.get(id);
    return entry?.content.component;
  }

  /**
   * Get section default props by ID
   */
  getDefaultProps(id: string): Record<string, unknown> | undefined {
    const entry = this.get(id);
    return entry?.content.defaultProps;
  }

  /**
   * Get sections by category
   */
  getByCategory(category: string): PageSectionEntry[] {
    return this.query({ category });
  }

  /**
   * Get all hero sections
   */
  getHeroSections(): PageSectionEntry[] {
    return this.getByCategory('hero');
  }

  /**
   * Get all feature sections
   */
  getFeatureSections(): PageSectionEntry[] {
    return this.getByCategory('features');
  }

  /**
   * Get all CTA sections
   */
  getCTASections(): PageSectionEntry[] {
    return this.getByCategory('cta');
  }

  /**
   * Validate section props against schema
   */
  validateProps(id: string, props: Record<string, unknown>): boolean {
    const entry = this.get(id);
    if (!entry) {
      throw new Error(`Section "${id}" not found in registry`);
    }

    const schema = entry.content.schema;
    if (!schema) {
      // No schema defined, accept any props
      return true;
    }

    // Basic validation - check required fields
    const required = schema.required || [];
    for (const field of required) {
      if (!(field in props)) {
        throw new Error(
          `Section "${id}" is missing required prop: "${field}"`
        );
      }
    }

    return true;
  }

  /**
   * Get section examples for preview/testing
   */
  getExamples(id: string): PageSectionEntry['content']['examples'] {
    const entry = this.get(id);
    return entry?.content.examples;
  }
}

/**
 * Singleton Page Section Registry
 * 
 * Import and use this instance throughout the application.
 * 
 * @example
 * ```ts
 * import { PageSectionRegistry } from '@/templates/registry';
 * 
 * // Register a section
 * PageSectionRegistry.register({
 *   metadata: {
 *     id: 'hero-simple',
 *     name: 'Simple Hero',
 *     category: 'hero',
 *     version: '1.0.0',
 *   },
 *   status: 'active',
 *   content: {
 *     component: HeroSimple,
 *     defaultProps: { title: 'Welcome' },
 *   },
 * });
 * 
 * // Get a section
 * const section = PageSectionRegistry.get('hero-simple');
 * ```
 */
export const PageSectionRegistry = new PageSectionRegistryImpl();
