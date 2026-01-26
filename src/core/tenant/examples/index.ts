/**
 * Example Tenant Customizations
 * 
 * Demonstrates fork-free customization using the tenant override system.
 */

import type { TenantCustomization } from '../types';

/**
 * Example 1: Acme Corp - Marketing Page Customization
 * 
 * Customizes the marketing page template with Acme's branding
 */
export const acmeCorpCustomization: TenantCustomization = {
  tenantId: 'acme-corp',
  tenantName: 'Acme Corporation',
  baseTemplate: 'marketing-page',
  overrides: {
    // Theme customization
    'theme.colors.primary': '#ff5722',
    'theme.colors.secondary': '#ff9800',
    'theme.typography.fontFamily': 'Inter, sans-serif',

    // Metadata
    'metadata.title': 'Acme Corp - Enterprise Solutions',
    'metadata.description': 'Leading provider of enterprise software solutions',

    // Hero section
    'pages.home.sections.hero.props.title': 'Welcome to Acme Corporation',
    'pages.home.sections.hero.props.subtitle': 'Building the future of enterprise software',
    'pages.home.sections.hero.props.buttonText': 'Get Started with Acme',
    'pages.home.sections.hero.props.buttonLink': '/demo',

    // Features section
    'pages.home.sections.features.props.title': 'Why Choose Acme?',
    'pages.home.sections.features.props.description': 'Our solutions are trusted by Fortune 500 companies worldwide',
  },
  metadata: {
    createdAt: '2026-01-25T00:00:00Z',
    version: '1.0.0',
    description: 'Acme Corp branding and content customization',
  },
};

/**
 * Example 2: TechStart - Landing Page Customization
 * 
 * Customizes the landing page template for a startup
 */
export const techStartCustomization: TenantCustomization = {
  tenantId: 'techstart',
  tenantName: 'TechStart Inc',
  baseTemplate: 'landing-page',
  overrides: {
    // Bold startup colors
    'theme.colors.primary': '#9c27b0',
    'theme.colors.secondary': '#00bcd4',
    'theme.typography.fontFamily': 'Montserrat, sans-serif',
    'theme.radius.md': 12,
    'theme.radius.lg': 20,

    // Metadata
    'metadata.title': 'TechStart - Innovation Platform',
    'metadata.description': 'Revolutionizing how teams collaborate',

    // Hero
    'pages.home.sections.hero.props.title': 'The Future of Team Collaboration',
    'pages.home.sections.hero.props.subtitle': 'Work smarter, not harder',
    'pages.home.sections.hero.props.buttonText': 'Start Free Trial',
    'pages.home.sections.hero.props.buttonLink': '/signup',

    // Features
    'pages.home.sections.features.props.title': 'Built for Modern Teams',
  },
  metadata: {
    createdAt: '2026-01-25T00:00:00Z',
    version: '1.0.0',
    description: 'TechStart branding with modern, bold design',
  },
};

/**
 * Example 3: GreenLeaf - Blog Template Customization
 * 
 * Customizes the blog template for an environmental organization
 */
export const greenLeafCustomization: TenantCustomization = {
  tenantId: 'greenleaf',
  tenantName: 'GreenLeaf Environmental',
  baseTemplate: 'blog',
  overrides: {
    // Earth-tone colors
    'theme.colors.primary': '#2e7d32',
    'theme.colors.secondary': '#8bc34a',
    'theme.colors.background': '#f1f8e9',
    'theme.typography.fontFamily': 'Merriweather, serif',
    'theme.typography.fontSize': 18,

    // Metadata
    'metadata.title': 'GreenLeaf Environmental Blog',
    'metadata.description': 'News and insights on environmental conservation',

    // Blog header
    'pages.home.sections.header.props.title': 'The GreenLeaf Chronicle',
    'pages.home.sections.header.props.subtitle': 'Stories from the frontlines of conservation',
  },
  metadata: {
    createdAt: '2026-01-25T00:00:00Z',
    version: '1.0.0',
    description: 'Environmental theme with warm, natural colors',
  },
};

/**
 * Example 4: SecureAuth - Authentication Pages
 * 
 * Customizes auth template for a security-focused SaaS
 */
export const secureAuthCustomization: TenantCustomization = {
  tenantId: 'secureauth',
  tenantName: 'SecureAuth Pro',
  baseTemplate: 'sign-in',
  overrides: {
    // Professional security colors
    'theme.colors.primary': '#1565c0',
    'theme.colors.secondary': '#37474f',
    'theme.typography.fontFamily': 'Roboto, sans-serif',

    // Metadata
    'metadata.title': 'SecureAuth Pro - Login',
    'metadata.description': 'Enterprise-grade authentication platform',

    // Sign-in page
    'pages.signIn.sections.form.props.title': 'Sign in to SecureAuth Pro',
    'pages.signIn.sections.form.props.subtitle': 'Your enterprise security dashboard',
    'pages.signIn.sections.form.props.buttonText': 'Sign In Securely',

    // Sign-up page
    'pages.signUp.sections.form.props.title': 'Create SecureAuth Account',
    'pages.signUp.sections.form.props.buttonText': 'Create Account',

    // Forgot password
    'pages.forgotPassword.sections.form.props.title': 'Reset Your Password',
    'pages.forgotPassword.sections.form.props.subtitle': 'We\'ll send you a secure reset link',
  },
  metadata: {
    createdAt: '2026-01-25T00:00:00Z',
    version: '1.0.0',
    description: 'Professional security-focused branding',
  },
};

/**
 * Example 5: Minimal Customization - Only Logo & Colors
 * 
 * Demonstrates minimal override for quick branding
 */
export const minimalCustomization: TenantCustomization = {
  tenantId: 'minimal-brand',
  tenantName: 'Minimal Brand',
  baseTemplate: 'marketing-page',
  overrides: {
    // Just brand colors
    'theme.colors.primary': '#e91e63',
    'theme.colors.secondary': '#673ab7',
  },
  metadata: {
    createdAt: '2026-01-25T00:00:00Z',
    version: '1.0.0',
    description: 'Minimal branding override - colors only',
  },
};

/**
 * Example 6: Advanced Customization - Multiple Page Sections
 * 
 * Demonstrates deep customization across multiple sections
 */
export const advancedCustomization: TenantCustomization = {
  tenantId: 'advanced-corp',
  tenantName: 'Advanced Corporation',
  baseTemplate: 'landing-page',
  overrides: {
    // Theme
    'theme.colors.primary': '#6366f1',
    'theme.colors.secondary': '#ec4899',
    'theme.colors.background': '#0f172a',
    'theme.colors.surface': '#1e293b',
    'theme.colors.paper': '#334155',
    'theme.colors.textPrimary': '#f1f5f9',
    'theme.colors.textSecondary': '#cbd5e1',
    'theme.typography.fontFamily': 'Inter, sans-serif',
    'theme.radius.md': 16,
    'theme.spacing.md': 24,

    // Multiple sections
    'pages.home.sections.hero.props.title': 'Transform Your Business',
    'pages.home.sections.hero.props.subtitle': 'Next-generation solutions for modern enterprises',
    'pages.home.sections.hero.props.buttonText': 'Schedule Demo',
    
    'pages.home.sections.features.props.title': 'Advanced Features',
    'pages.home.sections.features.props.description': 'Everything you need to succeed',
    
    'pages.home.sections.testimonials.props.title': 'Trusted by Industry Leaders',
    
    'pages.home.sections.cta.props.title': 'Ready to Get Started?',
    'pages.home.sections.cta.props.buttonText': 'Start Free Trial',
    'pages.home.sections.cta.props.buttonLink': '/trial',
  },
  metadata: {
    createdAt: '2026-01-25T00:00:00Z',
    version: '1.0.0',
    description: 'Advanced dark theme with comprehensive customization',
  },
};

/**
 * All example customizations
 */
export const exampleCustomizations = {
  acmeCorp: acmeCorpCustomization,
  techStart: techStartCustomization,
  greenLeaf: greenLeafCustomization,
  secureAuth: secureAuthCustomization,
  minimal: minimalCustomization,
  advanced: advancedCustomization,
};
