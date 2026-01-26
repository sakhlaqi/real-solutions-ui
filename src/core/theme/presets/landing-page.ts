/**
 * MUI Landing Page Theme Preset
 * 
 * Bold, conversion-focused design
 * Source: MUI Material Landing Page Template
 */

import type { ThemePreset } from '../types';

export const landingPagePreset: ThemePreset = {
  id: 'landing-page-mui',
  name: 'Landing Page Theme',
  description: 'Bold indigo theme for conversion-focused landing pages',
  version: '1.0.0',
  mode: 'light',

  colors: {
    // Primary - Bold indigo
    primary: '#6366f1',
    primaryLight: '#818cf8',
    primaryDark: '#4f46e5',
    primaryContrast: '#ffffff',

    // Secondary - Pink accent
    secondary: '#ec4899',
    secondaryLight: '#f472b6',
    secondaryDark: '#db2777',
    secondaryContrast: '#ffffff',

    // Background
    background: '#ffffff',
    surface: '#fafafa',
    paper: '#ffffff',

    // Text
    textPrimary: '#0f172a', // Slate 900
    textSecondary: '#475569', // Slate 600
    textDisabled: '#94a3b8', // Slate 400

    // Status
    success: '#10b981', // Emerald
    warning: '#f59e0b', // Amber
    error: '#ef4444', // Red
    info: '#3b82f6', // Blue

    // UI
    border: '#e2e8f0', // Slate 200
    divider: '#e2e8f0',
    overlay: 'rgba(0, 0, 0, 0.6)',
  },

  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 16,
    fontWeight: 400,

    h1: {
      fontSize: '3.5rem',
      fontWeight: 800,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '3rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '2.25rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body: {
      fontSize: '1.125rem',
      fontWeight: 400,
      lineHeight: 1.75,
    },
    bodySmall: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.6,
    },
    caption: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
  },

  spacing: {
    unit: 8,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64,
  },

  radius: {
    none: 0,
    sm: 6,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },

  shadows: {
    none: 'none',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },

  breakpoints: {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },

  providers: {
    mui: true,
    internal: true,
  },
};
