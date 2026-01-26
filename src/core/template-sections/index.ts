/**
 * Template Sections Module
 * 
 * JSON-based page section definitions for the template marketplace.
 * These are layout-aware blocks that consume components and composites.
 * 
 * Directory structure:
 * - /auth - Authentication sections (signin, signup)
 * - /blog - Blog sections (cards, article list, search)
 * - /checkout - E-commerce checkout sections (stepper, forms, summary)
 * - /contact - Contact sections (forms, info)
 * - /cta - Call-to-action sections
 * - /dashboard - Dashboard sections (stats, charts, data grids)
 * - /faq - FAQ sections (accordion, list)
 * - /features - Feature showcase sections
 * - /footer - Footer sections
 * - /gallery - Image gallery sections (grid, masonry, woven)
 * - /hero - Hero sections
 * - /logo-collection - Logo/brand showcase sections
 * - /navigation - Navigation sections (app bar, breadcrumbs, bottom nav)
 * - /notifications - Notification sections (snackbar, alert banners)
 * - /pricing - Pricing sections
 * - /profile - User profile sections (header, account menu)
 * - /settings - Settings sections (panels, toggles)
 * - /stats - Statistics sections
 * - /testimonials - Testimonial sections
 * 
 * Each section is defined as a JSON blueprint with:
 * - Schema validation (JSON Schema)
 * - Default props and slots
 * - Layout configuration
 * - Styling definitions
 * - Interaction patterns
 * - Accessibility features
 * - Multiple examples
 * 
 * Total: 45 sections across 21 categories
 */

export const TEMPLATE_SECTIONS_PATH = __dirname;

export const SECTION_CATEGORIES = [
  'auth',
  'blog',
  'checkout',
  'contact',
  'cta',
  'dashboard',
  'faq',
  'features',
  'footer',
  'gallery',
  'hero',
  'highlights',
  'logo-collection',
  'navigation',
  'notifications',
  'pricing',
  'profile',
  'settings',
  'stats',
  'testimonials',
] as const;

export type SectionCategory = typeof SECTION_CATEGORIES[number];

/**
 * Get the path to a section JSON file
 */
export function getSectionPath(category: SectionCategory, filename: string): string {
  return `${TEMPLATE_SECTIONS_PATH}/${category}/${filename}`;
}

/**
 * Load a section JSON file
 */
export async function loadSectionJson(category: SectionCategory, filename: string): Promise<any> {
  const path = getSectionPath(category, filename);
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load section: ${category}/${filename}`);
  }
  return response.json();
}
