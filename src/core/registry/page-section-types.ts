/**
 * Page Section Types
 * 
 * Type definitions for page sections - reusable building blocks
 * that compose into complete pages.
 */

import type { BaseRegistryEntry } from './types';

/**
 * Page Section Categories
 */
export type PageSectionCategory =
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
  | 'custom';

/**
 * Page Section Props
 * 
 * JSON-serializable props that configure a page section.
 * Must be compatible with theme tokens.
 */
export interface PageSectionProps {
  /** Section-specific configuration */
  [key: string]: unknown;
}

/**
 * Page Section Schema
 * 
 * JSON Schema for validating section props.
 */
export interface PageSectionSchema {
  type: 'object';
  properties: Record<string, unknown>;
  required?: string[];
  additionalProperties?: boolean;
}

/**
 * Page Section Definition
 * 
 * Defines a reusable page section component.
 */
export interface PageSectionDefinition {
  /** Component renderer (React component) */
  component: React.ComponentType<PageSectionProps>;
  
  /** Default props */
  defaultProps: PageSectionProps;
  
  /** JSON Schema for props validation */
  schema?: PageSectionSchema;
  
  /** Example configurations for previews */
  examples?: Array<{
    name: string;
    description?: string;
    props: PageSectionProps;
  }>;
  
  /** Required theme tokens */
  requiredTokens?: string[];
  
  /** Component slots for customization */
  slots?: string[];
}

/**
 * Page Section Registry Entry
 */
export type PageSectionEntry = BaseRegistryEntry<PageSectionDefinition>;

/**
 * Page Section Instance
 * 
 * An instance of a page section with specific props.
 * Used in page JSON definitions.
 */
export interface PageSectionInstance {
  /** Reference to registered section ID */
  sectionId: string;
  
  /** Props override (merged with defaultProps) */
  props?: PageSectionProps;
  
  /** Tenant-specific overrides */
  overrides?: Partial<PageSectionProps>;
  
  /** Visibility conditions */
  visible?: boolean | {
    featureFlag?: string;
    userRole?: string[];
  };
}
