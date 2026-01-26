/**
 * Website Template Types
 * 
 * Type definitions for complete website templates composed of pages.
 */

import type { BaseRegistryEntry } from './types';
import type { PageSectionInstance } from './page-section-types';

/**
 * Website Template Categories
 */
export type WebsiteTemplateCategory =
  | 'landing-page'
  | 'portfolio'
  | 'blog'
  | 'ecommerce'
  | 'saas'
  | 'corporate'
  | 'agency'
  | 'personal'
  | 'education'
  | 'nonprofit'
  | 'custom';

/**
 * Page Definition
 * 
 * A single page within a website template.
 */
export interface PageDefinition {
  /** Page identifier */
  id: string;
  
  /** Page title */
  title: string;
  
  /** URL path (e.g., "/", "/about", "/contact") */
  path: string;
  
  /** Layout type */
  layout?: string;
  
  /** Page sections in order */
  sections: PageSectionInstance[];
  
  /** Page metadata */
  meta?: {
    description?: string;
    keywords?: string[];
    ogImage?: string;
  };
  
  /** Whether page requires authentication */
  protected?: boolean;
}

/**
 * Navigation Configuration
 */
export interface NavigationConfig {
  /** Logo configuration */
  logo?: {
    text?: string;
    image?: string;
    link?: string;
  };
  
  /** Navigation links */
  links: Array<{
    label: string;
    path: string;
    external?: boolean;
  }>;
  
  /** CTA button in navigation */
  cta?: {
    label: string;
    path: string;
  };
}

/**
 * Website Template Definition
 * 
 * Complete website template with pages, navigation, and configuration.
 */
export interface WebsiteTemplateDefinition {
  /** Template pages */
  pages: PageDefinition[];
  
  /** Navigation configuration */
  navigation?: NavigationConfig;
  
  /** Footer configuration */
  footer?: {
    copyright?: string;
    links?: Array<{
      title: string;
      items: Array<{
        label: string;
        path: string;
      }>;
    }>;
    social?: Array<{
      platform: string;
      url: string;
    }>;
  };
  
  /** Recommended theme preset */
  recommendedTheme?: string;
  
  /** Required features/plugins */
  requiredFeatures?: string[];
  
  /** SEO defaults */
  seo?: {
    siteName?: string;
    defaultTitle?: string;
    defaultDescription?: string;
    twitterHandle?: string;
  };
}

/**
 * Website Template Registry Entry
 */
export type WebsiteTemplateEntry = BaseRegistryEntry<WebsiteTemplateDefinition>;

/**
 * Tenant Template Instance
 * 
 * A tenant's instance of a website template with customizations.
 */
export interface TenantTemplateInstance {
  /** Reference to template ID */
  templateId: string;
  
  /** Template version */
  version: string;
  
  /** Tenant-specific overrides */
  overrides?: {
    /** Override specific pages */
    pages?: Partial<Record<string, Partial<PageDefinition>>>;
    
    /** Override navigation */
    navigation?: Partial<NavigationConfig>;
    
    /** Override footer */
    footer?: Partial<WebsiteTemplateDefinition['footer']>;
    
    /** Override SEO */
    seo?: Partial<WebsiteTemplateDefinition['seo']>;
  };
  
  /** Hidden pages (tenant can hide default pages) */
  hiddenPages?: string[];
  
  /** Additional custom pages */
  customPages?: PageDefinition[];
}
