/**
 * Template Type Contracts (Phase 0A)
 * 
 * FROZEN: These contracts mirror presentation/src/types/template.ts
 * ensuring type compatibility across all repos.
 * 
 * Re-exported from presentation layer for consistency.
 */

/**
 * Template Categories
 */
export type TemplateCategory =
  | 'landing'
  | 'marketing'
  | 'blog'
  | 'dashboard'
  | 'auth'
  | 'ecommerce'
  | 'portfolio'
  | 'docs'
  | 'custom';

/**
 * Template Tier
 */
export type TemplateTier =
  | 'free'
  | 'premium'
  | 'enterprise'
  | 'custom';

/**
 * Page Section Reference
 */
export interface PageSectionReference {
  id: string;
  type: string;
  version?: string;
  props?: Record<string, unknown>;
}

/**
 * Page Definition
 */
export interface PageDefinition {
  id: string;
  title: string;
  description?: string;
  layout: {
    type: string;
    version?: string;
    props?: Record<string, unknown>;
  };
  sections: PageSectionReference[];
  metadata?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
    [key: string]: unknown;
  };
}

/**
 * Template Preset
 */
export interface TemplatePreset {
  meta: {
    id: string;
    name: string;
    description?: string;
    version: string;
    author?: string;
    category: TemplateCategory;
    tier: TemplateTier;
    tags?: string[];
    previewImage?: string;
  };
  pages: {
    [pageKey: string]: PageDefinition;
  };
  theme_preset_id?: string;
  metadata?: {
    industry?: string;
    useCases?: string[];
    demoUrl?: string;
    docsUrl?: string;
    [key: string]: unknown;
  };
}

/**
 * Template Override
 */
export interface TemplateOverride {
  meta?: Partial<TemplatePreset['meta']>;
  pages?: {
    [pageKey: string]: Partial<PageDefinition>;
  };
  theme_preset_id?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Resolved Template
 */
export interface ResolvedTemplate extends TemplatePreset {
  appliedOverrides?: TemplateOverride;
  basePreset?: {
    id: string;
    name: string;
    version: string;
  };
}
