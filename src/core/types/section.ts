/**
 * Section Type Contracts (Phase 0A)
 * 
 * FROZEN: These contracts mirror presentation/src/types/section.ts
 * ensuring type compatibility across all repos.
 */

/**
 * Section Categories
 */
export type SectionCategory =
  | 'hero'
  | 'features'
  | 'pricing'
  | 'testimonials'
  | 'cta'
  | 'footer'
  | 'header'
  | 'content'
  | 'gallery'
  | 'team'
  | 'blog'
  | 'contact'
  | 'faq'
  | 'stats'
  | 'logos'
  | 'auth'
  | 'dashboard'
  | 'checkout'
  | 'profile'
  | 'settings'
  | 'notifications'
  | 'custom';

/**
 * Section Slot Definition
 */
export interface SectionSlot {
  type: 'text' | 'richtext' | 'media' | 'button' | 'array' | 'object';
  editable: boolean;
  optional?: boolean;
  maxLength?: number;
  allowedTypes?: string[];
  itemType?: SectionSlot;
  properties?: Record<string, SectionSlot>;
}

/**
 * Section Layout Configuration
 */
export interface SectionLayout {
  container?: 'centered' | 'full' | 'narrow' | 'wide';
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number;
  spacing?: {
    py?: {
      xs?: number;
      sm?: number;
      md?: number;
      lg?: number;
      xl?: number;
    };
    px?: {
      xs?: number;
      sm?: number;
      md?: number;
      lg?: number;
      xl?: number;
    };
  };
  grid?: {
    columns?: {
      xs?: number;
      sm?: number;
      md?: number;
      lg?: number;
      xl?: number;
    };
    gap?: number;
  };
}

/**
 * Section JSON Schema
 */
export interface SectionJsonSchema {
  type: 'object';
  properties: Record<string, {
    type: string;
    description?: string;
    enum?: string[];
    properties?: Record<string, unknown>;
    items?: unknown;
    [key: string]: unknown;
  }>;
  required?: string[];
  additionalProperties?: boolean;
}

/**
 * Section Definition (Blueprint)
 */
export interface SectionDefinition {
  id: string;
  name: string;
  category: SectionCategory;
  version: string;
  description?: string;
  tags?: string[];
  previewImage?: string;
  schema: SectionJsonSchema;
  defaultProps: Record<string, unknown>;
  slots?: Record<string, SectionSlot>;
  layout?: SectionLayout;
  requiredTokens?: string[];
  dependencies?: string[];
  examples?: Array<{
    name: string;
    description?: string;
    props: Record<string, unknown>;
  }>;
}

/**
 * Section Instance
 */
export interface SectionInstance {
  id: string;
  type: string;
  version?: string;
  props?: Record<string, unknown>;
  visible?: boolean | {
    featureFlag?: string;
    userRole?: string[];
    subscription?: string[];
  };
}

/**
 * Section Override
 */
export interface SectionOverride {
  props?: Record<string, unknown>;
  visible?: boolean | {
    featureFlag?: string;
    userRole?: string[];
    subscription?: string[];
  };
}

/**
 * Resolved Section
 */
export interface ResolvedSection extends SectionInstance {
  definition: SectionDefinition;
  resolvedProps: Record<string, unknown>;
  appliedOverrides?: SectionOverride;
}
