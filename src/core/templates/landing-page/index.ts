/**
 * Landing Page Template
 * 
 * Complete landing page template converted from MUI Material UI Landing Page
 */

export * from './meta';
export * from './theme';

// Re-export for convenience
import { landingPageMeta } from './meta';
import { landingPageTheme } from './theme';

export const landingPageTemplate = {
  ...landingPageMeta,
  metadata: {
    title: landingPageMeta.name,
    description: landingPageMeta.description,
  },
  theme: landingPageTheme,
  pages: {
    home: {
      title: 'Home',
      sections: {
        hero: { id: 'hero', type: 'hero' },
        features: { id: 'features', type: 'features' },
        testimonials: { id: 'testimonials', type: 'testimonials' },
        pricing: { id: 'pricing', type: 'pricing' },
        faq: { id: 'faq', type: 'faq' },
      },
    },
  },
};

export default landingPageTemplate;
