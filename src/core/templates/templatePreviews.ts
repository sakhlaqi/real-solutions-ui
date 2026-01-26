/**
 * Template Preview Generator
 * 
 * Generates preview metadata for all registered templates
 */

import type { WebsiteTemplateEntry } from '../registry/website-template-types';

export interface TemplatePreview {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnail: string;
  previewUrl: string;
  tags: string[];
  features: string[];
  pageCount: number;
  sectionCount: number;
  status: 'active' | 'beta' | 'deprecated' | 'archived';
}

/**
 * Generate preview from template entry
 */
export function generatePreview(entry: WebsiteTemplateEntry): TemplatePreview {
  const { metadata, content, status } = entry;
  
  const sectionCount = content.pages.reduce(
    (total, page) => total + (page.sections?.length || 0),
    0
  );
  
  return {
    id: metadata.id,
    name: metadata.name,
    description: metadata.description || '',
    category: metadata.category,
    thumbnail: `/templates/${metadata.id}/thumbnail.png`,
    previewUrl: `/preview/${metadata.id}`,
    tags: metadata.tags || [],
    features: [],
    pageCount: content.pages.length,
    sectionCount,
    status,
  };
}

/**
 * Marketing Page Template Preview
 */
export const marketingPagePreview: TemplatePreview = {
  id: 'marketing-page-mui',
  name: 'Marketing Page',
  description: 'Professional marketing website template with hero, features, testimonials, pricing, and FAQ sections. Perfect for SaaS products and services.',
  category: 'marketing',
  thumbnail: '/templates/marketing-page/thumbnail.png',
  previewUrl: '/templates/marketing-page/preview',
  tags: ['marketing', 'saas', 'business', 'mui', 'professional'],
  features: [
    'Responsive hero section with CTA',
    'Product features showcase',
    'Customer testimonials',
    'Pricing tables',
    'FAQ section',
    'Newsletter signup',
    'Professional footer',
  ],
  pageCount: 2,
  sectionCount: 9, // home: 7 sections, pricing: 4 sections (but some overlap)
  status: 'active',
};

/**
 * Landing Page Template Preview
 */
export const landingPagePreview: TemplatePreview = {
  id: 'landing-page-mui',
  name: 'Landing Page',
  description: 'Conversion-optimized landing page template with hero, features, social proof, and strong CTAs. Perfect for product launches and campaigns.',
  category: 'landing-page',
  thumbnail: '/templates/landing-page/thumbnail.png',
  previewUrl: '/templates/landing-page/preview',
  tags: ['landing', 'conversion', 'campaign', 'mui', 'lead-generation'],
  features: [
    'Conversion-optimized hero',
    'Social proof section',
    'Feature highlights',
    'Single-page design',
    'Strong CTAs throughout',
    'Mobile-first responsive',
  ],
  pageCount: 1,
  sectionCount: 8,
  status: 'active',
};

/**
 * All template previews
 */
export const allTemplatePreviews: TemplatePreview[] = [
  marketingPagePreview,
  landingPagePreview,
];

/**
 * Get preview by ID
 */
export function getTemplatePreview(id: string): TemplatePreview | undefined {
  return allTemplatePreviews.find(preview => preview.id === id);
}

/**
 * Get previews by category
 */
export function getPreviewsByCategory(category: string): TemplatePreview[] {
  return allTemplatePreviews.filter(preview => preview.category === category);
}

/**
 * Get previews by tag
 */
export function getPreviewsByTag(tag: string): TemplatePreview[] {
  return allTemplatePreviews.filter(preview => preview.tags.includes(tag));
}

/**
 * Search previews
 */
export function searchPreviews(query: string): TemplatePreview[] {
  const lowerQuery = query.toLowerCase();
  return allTemplatePreviews.filter(preview =>
    preview.name.toLowerCase().includes(lowerQuery) ||
    preview.description.toLowerCase().includes(lowerQuery) ||
    preview.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}
