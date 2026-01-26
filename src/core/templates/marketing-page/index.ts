/**
 * Marketing Page Template
 * 
 * Complete website template converted from MUI Material UI Marketing Page
 */

export * from './meta';
export * from './theme';

// Re-export for convenience
import { marketingPageMeta } from './meta';
import { marketingPageTheme } from './theme';

// Template structure (pages would be loaded dynamically in real app)
export const marketingPageTemplate = {
  ...marketingPageMeta,
  metadata: {
    title: marketingPageMeta.name,
    description: marketingPageMeta.description,
  },
  theme: marketingPageTheme,
  pages: {
    home: {
      title: 'Home',
      sections: {
        hero: { id: 'hero', type: 'hero' },
        features: { id: 'features', type: 'features' },
        testimonials: { id: 'testimonials', type: 'testimonials' },
        cta: { id: 'cta', type: 'cta' },
      },
    },
    pricing: {
      title: 'Pricing',
      sections: {
        hero: { id: 'pricing-hero', type: 'hero' },
        plans: { id: 'pricing-plans', type: 'pricing' },
        faq: { id: 'faq', type: 'faq' },
      },
    },
  },
};

export default marketingPageTemplate;
