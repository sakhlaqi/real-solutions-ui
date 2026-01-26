/**
 * Blog Template Theme Preset
 * 
 * Clean, readable design for content
 */

import type { ThemePreset } from '../types';

export const blogPreset: ThemePreset = {
  id: 'blog-mui',
  name: 'Blog Theme',
  description: 'Clean green theme optimized for content readability',
  version: '1.0.0',
  mode: 'light',

  colors: {
    // Primary - Natural green
    primary: '#2e7d32',
    primaryLight: '#4caf50',
    primaryDark: '#1b5e20',
    primaryContrast: '#ffffff',

    // Secondary - Warm orange
    secondary: '#ff6f00',
    secondaryLight: '#ff9800',
    secondaryDark: '#e65100',
    secondaryContrast: '#ffffff',

    // Background
    background: '#fafafa',
    surface: '#ffffff',
    paper: '#ffffff',

    // Text
    textPrimary: '#212121',
    textSecondary: '#616161',
    textDisabled: '#9e9e9e',

    // Status
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
    info: '#2196f3',

    // UI
    border: '#e0e0e0',
    divider: '#eeeeee',
    overlay: 'rgba(0, 0, 0, 0.4)',
  },

  typography: {
    fontFamily: '"Georgia", "Cambria", "Times New Roman", serif',
    fontSize: 18, // Larger base for readability
    fontWeight: 400,

    h1: {
      fontSize: '2.75rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.875rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: 1.6,
    },
    body: {
      fontSize: '1.125rem', // 18px for article body
      fontWeight: 400,
      lineHeight: 1.8, // Extra line height for reading
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
    sm: 2,
    md: 4,
    lg: 8,
    xl: 12,
    full: 9999,
  },

  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 2px 4px 0 rgba(0, 0, 0, 0.08)',
    lg: '0 4px 8px 0 rgba(0, 0, 0, 0.1)',
    xl: '0 8px 16px 0 rgba(0, 0, 0, 0.12)',
    '2xl': '0 12px 24px 0 rgba(0, 0, 0, 0.15)',
  },

  breakpoints: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },

  providers: {
    mui: true,
    internal: true,
  },
};
