/**
 * Marketing Page Template - Metadata
 * 
 * Converted from MUI Material UI Marketing Page Template
 * Source: https://mui.com/material-ui/getting-started/templates/
 */

export const marketingPageMeta = {
  id: 'marketing-page-mui',
  name: 'Marketing Page',
  description: 'Professional marketing website template with hero, features, testimonials, pricing, and FAQ sections. Perfect for SaaS products and services.',
  category: 'marketing' as const,
  version: '1.0.0',
  author: 'Material-UI (Converted)',
  tags: ['marketing', 'saas', 'business', 'mui', 'professional'],
  thumbnail: '/templates/marketing-page/thumbnail.png',
  previewUrl: '/templates/marketing-page/preview',
  features: [
    'Responsive hero section with CTA',
    'Product features showcase',
    'Customer testimonials',
    'Pricing tables',
    'FAQ section',
    'Newsletter signup',
    'Professional footer',
  ],
  pages: ['home', 'pricing', 'faq'],
  layouts: {
    default: 'marketing-layout',
  },
  status: 'active' as const,
  license: 'MIT',
  sourceUrl: 'https://mui.com/material-ui/getting-started/templates/marketing-page/',
};

export type MarketingPageMeta = typeof marketingPageMeta;
