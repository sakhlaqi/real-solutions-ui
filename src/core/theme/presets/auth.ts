/**
 * Authentication Theme Preset
 * 
 * Clean, trustworthy design for auth flows
 */

import type { ThemePreset } from '../types';

export const authPreset: ThemePreset = {
  id: 'auth-mui',
  name: 'Authentication Theme',
  description: 'Professional blue theme for authentication pages',
  version: '1.0.0',
  mode: 'light',

  colors: {
    // Primary - Trustworthy blue
    primary: '#1976d2',
    primaryLight: '#42a5f5',
    primaryDark: '#1565c0',
    primaryContrast: '#ffffff',

    // Secondary - Neutral gray
    secondary: '#424242',
    secondaryLight: '#616161',
    secondaryDark: '#212121',
    secondaryContrast: '#ffffff',

    // Background
    background: '#fafafa',
    surface: '#ffffff',
    paper: '#ffffff',

    // Text
    textPrimary: '#212121',
    textSecondary: '#757575',
    textDisabled: '#bdbdbd',

    // Status
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
    info: '#2196f3',

    // UI
    border: '#e0e0e0',
    divider: '#e0e0e0',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },

  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 16,
    fontWeight: 400,

    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
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
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.6,
    },
    body: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    caption: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.4,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.75,
      textTransform: 'uppercase',
      letterSpacing: '0.02857em',
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
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },

  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
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
