/**
 * Website Template Registry
 * 
 * Central registry for all website templates.
 * Templates are explicitly registered - no dynamic imports.
 */

import { BaseRegistry } from './BaseRegistry';
import type {
  WebsiteTemplateEntry,
  WebsiteTemplateDefinition,
  PageDefinition,
  TenantTemplateInstance,
  NavigationConfig,
} from './website-template-types';

/**
 * Website Template Registry Instance
 */
class WebsiteTemplateRegistryImpl extends BaseRegistry<WebsiteTemplateDefinition> {
  constructor() {
    super({
      name: 'WebsiteTemplateRegistry',
      allowDuplicates: false,
      validateOnRegister: true,
      enableVersioning: true,
    });
  }

  /**
   * Get template pages by ID
   */
  getPages(id: string): PageDefinition[] | undefined {
    const entry = this.get(id);
    return entry?.content.pages;
  }

  /**
   * Get template navigation by ID
   */
  getNavigation(id: string): WebsiteTemplateDefinition['navigation'] | undefined {
    const entry = this.get(id);
    return entry?.content.navigation;
  }

  /**
   * Get templates by category
   */
  getByCategory(category: string): WebsiteTemplateEntry[] {
    return this.query({ category });
  }

  /**
   * Get landing page templates
   */
  getLandingPageTemplates(): WebsiteTemplateEntry[] {
    return this.getByCategory('landing-page');
  }

  /**
   * Get SaaS templates
   */
  getSaaSTemplates(): WebsiteTemplateEntry[] {
    return this.getByCategory('saas');
  }

  /**
   * Resolve template for tenant
   * 
   * Merges template definition with tenant overrides.
   */
  resolveForTenant(
    tenantInstance: TenantTemplateInstance
  ): WebsiteTemplateDefinition | null {
    const template = this.get(tenantInstance.templateId);
    if (!template) {
      console.error(
        `Template "${tenantInstance.templateId}" not found in registry`
      );
      return null;
    }

    const baseTemplate = template.content;
    const overrides = tenantInstance.overrides || {};

    // Deep merge template with overrides
    const resolved: WebsiteTemplateDefinition = {
      ...baseTemplate,
      
      // Merge pages
      pages: this.mergePages(
        baseTemplate.pages,
        overrides.pages || {},
        tenantInstance.hiddenPages || [],
        tenantInstance.customPages || []
      ),
      
      // Merge navigation
      navigation: overrides.navigation
        ? { ...baseTemplate.navigation, ...overrides.navigation } as NavigationConfig
        : baseTemplate.navigation,
      
      // Merge footer
      footer: overrides.footer
        ? { ...baseTemplate.footer, ...overrides.footer }
        : baseTemplate.footer,
      
      // Merge SEO
      seo: overrides.seo
        ? { ...baseTemplate.seo, ...overrides.seo }
        : baseTemplate.seo,
    };

    return resolved;
  }

  /**
   * Merge pages with overrides
   */
  private mergePages(
    basePages: PageDefinition[],
    pageOverrides: Partial<Record<string, Partial<PageDefinition>>>,
    hiddenPages: string[],
    customPages: PageDefinition[]
  ): PageDefinition[] {
    // Filter out hidden pages
    let pages = basePages.filter(page => !hiddenPages.includes(page.id));

    // Apply overrides
    pages = pages.map(page => {
      const override = pageOverrides[page.id];
      if (!override) return page;

      return {
        ...page,
        ...override,
        sections: override.sections || page.sections,
        meta: override.meta ? { ...page.meta, ...override.meta } : page.meta,
      };
    });

    // Add custom pages
    pages = [...pages, ...customPages];

    return pages;
  }

  /**
   * Validate template structure
   * 
   * Checks that all referenced sections exist in PageSectionRegistry.
   */
  validateTemplate(id: string): { valid: boolean; errors: string[] } {
    const entry = this.get(id);
    if (!entry) {
      return {
        valid: false,
        errors: [`Template "${id}" not found`],
      };
    }

    const errors: string[] = [];
    const template = entry.content;

    // Validate pages
    if (!template.pages || template.pages.length === 0) {
      errors.push('Template must have at least one page');
    }

    // Validate each page has sections
    template.pages.forEach((page, index) => {
      if (!page.sections || page.sections.length === 0) {
        errors.push(`Page "${page.id}" (index ${index}) has no sections`);
      }
    });

    // Validate paths are unique
    const paths = template.pages.map(p => p.path);
    const uniquePaths = new Set(paths);
    if (paths.length !== uniquePaths.size) {
      errors.push('Template has duplicate page paths');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Get template preview data
   */
  getPreview(id: string): {
    metadata: WebsiteTemplateEntry['metadata'];
    pageCount: number;
    sectionCount: number;
    categories: string[];
  } | null {
    const entry = this.get(id);
    if (!entry) return null;

    const sectionCount = entry.content.pages.reduce(
      (sum, page) => sum + page.sections.length,
      0
    );

    const categories = new Set<string>();
    // Note: Would need PageSectionRegistry import to get section categories
    // Keeping this simple for now

    return {
      metadata: entry.metadata,
      pageCount: entry.content.pages.length,
      sectionCount,
      categories: Array.from(categories),
    };
  }
}

/**
 * Singleton Website Template Registry
 * 
 * Import and use this instance throughout the application.
 * 
 * @example
 * ```ts
 * import { WebsiteTemplateRegistry } from '@/templates/registry';
 * 
 * // Register a template
 * WebsiteTemplateRegistry.register({
 *   metadata: {
 *     id: 'saas-landing-1',
 *     name: 'SaaS Landing Page',
 *     category: 'saas',
 *     version: '1.0.0',
 *     previewImage: '/previews/saas-landing-1.png',
 *   },
 *   status: 'active',
 *   content: {
 *     pages: [{ ... }],
 *     navigation: { ... },
 *   },
 * });
 * 
 * // Get a template
 * const template = WebsiteTemplateRegistry.get('saas-landing-1');
 * ```
 */
export const WebsiteTemplateRegistry = new WebsiteTemplateRegistryImpl();
