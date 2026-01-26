/**
 * Landing Page Template - Metadata
 * 
 * Converted from MUI Material UI Landing Page Template
 * Optimized for conversions and lead generation
 */

export const landingPageMeta = {
  id: 'landing-page-mui',
  name: 'Landing Page',
  description: 'Conversion-optimized landing page template with hero, features, social proof, and strong CTAs. Perfect for product launches and campaigns.',
  category: 'landing-page' as const,
  version: '1.0.0',
  author: 'Material-UI (Converted)',
  tags: ['landing', 'conversion', 'campaign', 'mui', 'lead-generation'],
  thumbnail: '/templates/landing-page/thumbnail.png',
  previewUrl: '/templates/landing-page/preview',
  features: [
    'Conversion-optimized hero',
    'Social proof section',
    'Feature highlights',
    'Single-page design',
    'Strong CTAs throughout',
    'Mobile-first responsive',
  ],
  pages: ['home'],
  layouts: {
    default: 'landing-layout',
  },
  status: 'active' as const,
  license: 'MIT',
  sourceUrl: 'https://mui.com/material-ui/getting-started/templates/landing-page/',
};

export type LandingPageMeta = typeof landingPageMeta;
