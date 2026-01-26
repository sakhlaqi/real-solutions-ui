/**
 * Layout Validation Examples
 * 
 * Demonstrates how each layout works with the JSON renderer.
 * These examples validate that layouts can be instantiated from JSON config.
 */

import { LayoutConfig } from '../behaviours/useLayoutRenderer';

/**
 * Example: Marketing Layout with Full Website Structure
 */
export const marketingWebsiteExample: LayoutConfig = {
  template: {
    type: 'marketing-layout',
    version: '1.0.0',
    props: {
      stickyHeader: true,
      sidebarVisible: false,
      maxWidth: 1280,
    },
  },
  sections: [
    { 
      id: 'hero', 
      type: 'hero-center-aligned',
      props: {
        heading: 'Welcome to Our Product',
        subheading: 'The best solution for your business',
      },
    },
    { 
      id: 'features', 
      type: 'features-grid-3-columns',
      props: {
        title: 'Key Features',
      },
    },
    { 
      id: 'testimonials', 
      type: 'testimonials-grid',
      props: {
        title: 'What Our Customers Say',
      },
    },
    { 
      id: 'cta', 
      type: 'cta-simple-centered',
      props: {
        heading: 'Ready to Get Started?',
        buttonText: 'Sign Up Now',
      },
    },
  ],
  metadata: {
    title: 'Home Page',
    description: 'Marketing website home page',
  },
};

/**
 * Example: Landing Page Layout for Campaign
 */
export const landingPageExample: LayoutConfig = {
  template: {
    type: 'landing-layout',
    version: '1.0.0',
    props: {
      transparentHeader: true,
      smoothScroll: true,
      maxWidth: 1200,
    },
  },
  sections: [
    { 
      id: 'hero', 
      type: 'hero-image-right',
      props: {
        heading: 'Limited Time Offer',
        subheading: 'Get 50% off for the first 100 customers',
      },
    },
    { 
      id: 'benefits', 
      type: 'features-with-alternating-layouts',
      props: {
        title: 'Why Choose Us',
      },
    },
    { 
      id: 'social-proof', 
      type: 'logo-cloud-simple-with-title',
      props: {
        title: 'Trusted by Leading Companies',
      },
    },
    { 
      id: 'pricing', 
      type: 'pricing-single-price',
      props: {
        price: '$49',
        period: 'month',
      },
    },
    { 
      id: 'final-cta', 
      type: 'cta-simple-centered',
      props: {
        heading: 'Don\'t Miss Out',
        buttonText: 'Claim Your Discount',
      },
    },
  ],
  metadata: {
    title: 'Special Offer Landing Page',
    description: 'Campaign landing page for limited time offer',
  },
};

/**
 * Example: Dashboard Layout for Application
 */
export const dashboardExample: LayoutConfig = {
  template: {
    type: 'dashboard-layout',
    version: '1.0.0',
    props: {
      sidebarVisible: true,
      sidebarWidth: 280,
    },
  },
  sections: [
    { 
      id: 'stats', 
      type: 'stats-grid-4-columns',
      props: {
        title: 'Overview',
      },
    },
    { 
      id: 'recent-activity', 
      type: 'dashboard-latest-news',
      props: {
        title: 'Recent Activity',
      },
    },
  ],
  metadata: {
    title: 'Dashboard',
    description: 'Main dashboard view',
  },
};

/**
 * Example: Blank Page Layout for Custom Design
 */
export const blankPageExample: LayoutConfig = {
  template: {
    type: 'blank-layout',
    version: '1.0.0',
    props: {
      applyTheme: true,
      fullHeight: true,
      maxWidth: 500,
      padding: 24,
    },
  },
  sections: [
    { 
      id: 'content', 
      type: 'sign-up-simple-card',
      props: {
        title: 'Create Account',
      },
    },
  ],
  metadata: {
    title: 'Sign Up',
    description: 'User registration page',
  },
};

/**
 * Example: Marketing Layout with Sidebar (Blog/Docs)
 */
export const blogLayoutExample: LayoutConfig = {
  template: {
    type: 'marketing-layout',
    version: '1.0.0',
    props: {
      stickyHeader: true,
      sidebarVisible: true,
      sidebarPosition: 'right',
      stickySidebar: true,
      sidebarWidth: 300,
      maxWidth: 1200,
    },
  },
  sections: [
    { 
      id: 'article-hero', 
      type: 'blog-hero',
      props: {
        title: 'Understanding React Performance',
        author: 'John Doe',
        date: '2026-01-25',
      },
    },
    { 
      id: 'article-content', 
      type: 'blog-content',
      props: {
        content: 'Article content here...',
      },
    },
  ],
  metadata: {
    title: 'Blog Post',
    description: 'Blog article with table of contents sidebar',
  },
};

/**
 * All validation examples
 */
export const layoutValidationExamples = {
  marketingWebsite: marketingWebsiteExample,
  landingPage: landingPageExample,
  dashboard: dashboardExample,
  blankPage: blankPageExample,
  blogLayout: blogLayoutExample,
};

/**
 * Layout Capabilities Matrix
 * 
 * Documents what each layout supports
 */
export const layoutCapabilities = {
  'dashboard-layout': {
    slots: ['header', 'sidebar', 'main', 'footer'],
    features: ['sticky-header', 'collapsible-sidebar', 'responsive'],
    bestFor: ['admin', 'dashboard', 'application'],
  },
  'two-column-layout': {
    slots: ['header', 'left', 'right', 'footer'],
    features: ['adjustable-split', 'responsive'],
    bestFor: ['master-detail', 'settings', 'comparison'],
  },
  'tabs-layout': {
    slots: ['header', 'tabs', 'footer'],
    features: ['tab-navigation', 'content-organization'],
    bestFor: ['multi-view', 'organized-content', 'settings'],
  },
  'marketing-layout': {
    slots: ['header', 'main', 'sidebar', 'footer'],
    features: ['sticky-header', 'sidebar-positioning', 'full-width-sections', 'max-width-constraint'],
    bestFor: ['marketing-site', 'product-pages', 'blog', 'documentation'],
  },
  'landing-layout': {
    slots: ['header', 'main', 'footer'],
    features: ['transparent-header', 'smooth-scroll', 'conversion-optimized'],
    bestFor: ['landing-pages', 'campaigns', 'lead-generation'],
  },
  'blank-layout': {
    slots: ['content'],
    features: ['minimal-constraints', 'flexible-theming', 'optional-padding'],
    bestFor: ['custom-designs', 'auth-pages', 'error-pages', 'coming-soon'],
  },
};
