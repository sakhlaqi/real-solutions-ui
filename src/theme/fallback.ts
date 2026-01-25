/**
 * Fallback Theme
 * 
 * Minimal fallback theme used when API is unavailable or themes fail to load.
 * Provides basic styling to ensure application remains functional.
 * 
 * Note: This is NOT a preset. Official presets are stored in the API/database.
 * This exists only as an emergency fallback.
 */

import type { Theme } from './theme.types';

export const fallbackTheme: Theme = {
  meta: {
    id: 'fallback',
    name: 'Fallback',
    version: '1.0.0',
    category: 'custom',
    description: 'Emergency fallback theme when API is unavailable',
    tags: ['fallback', 'internal'],
  },
  tokens: {
    colors: {
      // Primary colors
      primary: '#0066cc',
      primaryLight: '#3385d6',
      primaryDark: '#0052a3',
      primaryContrast: '#ffffff',
      
      // Secondary colors
      secondary: '#6b7280',
      secondaryLight: '#9ca3af',
      secondaryDark: '#4b5563',
      secondaryContrast: '#ffffff',
      
      // Accent color
      accent: '#f59e0b',
      accentLight: '#fbbf24',
      accentDark: '#d97706',
      
      // Background colors
      background: '#ffffff',
      backgroundSecondary: '#f9fafb',
      backgroundTertiary: '#f3f4f6',
      
      // Surface colors
      surface: '#ffffff',
      surfaceElevated: '#ffffff',
      surfaceOverlay: 'rgba(0, 0, 0, 0.5)',
      
      // Text colors
      textPrimary: '#111827',
      textSecondary: '#6b7280',
      textTertiary: '#9ca3af',
      textDisabled: '#d1d5db',
      textInverse: '#ffffff',
      
      // Border colors
      border: '#e5e7eb',
      borderLight: '#f3f4f6',
      borderFocus: '#0066cc',
      
      // Semantic state colors
      success: '#10b981',
      successLight: '#34d399',
      successDark: '#059669',
      
      warning: '#f59e0b',
      warningLight: '#fbbf24',
      warningDark: '#d97706',
      
      error: '#ef4444',
      errorLight: '#f87171',
      errorDark: '#dc2626',
      
      info: '#0ea5e9',
      infoLight: '#38bdf8',
      infoDark: '#0284c7',
    },
    typography: {
      fontFamily: {
        primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        secondary: 'Georgia, serif',
        monospace: 'Monaco, Consolas, monospace',
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      lineHeight: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.75,
        loose: 2.0,
      },
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem',
      '3xl': '4rem',
      '4xl': '6rem',
      '5xl': '8rem',
    },
    radius: {
      none: '0',
      sm: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      '2xl': '1rem',
      full: '9999px',
    },
    shadows: {
      none: 'none',
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    },
    motion: {
      duration: {
        instant: 75,
        fast: 150,
        normal: 300,
        slow: 500,
        slower: 800,
      },
      easing: {
        linear: 'linear',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
    breakpoints: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536,
    },
    zIndex: {
      base: 0,
      dropdown: 1000,
      sticky: 1100,
      overlay: 1150,
      modal: 1200,
      popover: 1300,
      tooltip: 1400,
      toast: 1600,
    },
  },
};
