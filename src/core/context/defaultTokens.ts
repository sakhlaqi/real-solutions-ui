/**
 * Default Design Tokens
 * 
 * Fallback tokens used when no external theme is provided.
 * These conform to the canonical theme schema.
 */

import type { DesignTokens } from '../../theme/theme.types';

/**
 * Default Light Mode Tokens
 * 
 * These are sensible defaults that match common design patterns.
 */
export const defaultLightTokens: DesignTokens = {
  colors: {
    // Primary brand colors
    primary: '#1976d2',
    primaryLight: '#42a5f5',
    primaryDark: '#1565c0',
    primaryContrast: '#ffffff',
    
    // Secondary brand colors
    secondary: '#dc004e',
    secondaryLight: '#f06292',
    secondaryDark: '#c51162',
    secondaryContrast: '#ffffff',
    
    // Accent color
    accent: '#ff9800',
    accentLight: '#ffb74d',
    accentDark: '#f57c00',
    
    // Background colors
    background: '#ffffff',
    backgroundSecondary: '#f5f5f5',
    backgroundTertiary: '#fafafa',
    
    // Surface colors
    surface: '#ffffff',
    surfaceElevated: '#ffffff',
    surfaceOverlay: 'rgba(0, 0, 0, 0.5)',
    
    // Text colors
    textPrimary: 'rgba(0, 0, 0, 0.87)',
    textSecondary: 'rgba(0, 0, 0, 0.6)',
    textTertiary: 'rgba(0, 0, 0, 0.38)',
    textDisabled: 'rgba(0, 0, 0, 0.38)',
    textInverse: '#ffffff',
    
    // Border colors
    border: 'rgba(0, 0, 0, 0.12)',
    borderLight: 'rgba(0, 0, 0, 0.06)',
    borderFocus: '#1976d2',
    
    // Semantic state colors
    success: '#4caf50',
    successLight: '#81c784',
    successDark: '#388e3c',
    
    warning: '#ff9800',
    warningLight: '#ffb74d',
    warningDark: '#f57c00',
    
    error: '#f44336',
    errorLight: '#e57373',
    errorDark: '#d32f2f',
    
    info: '#2196f3',
    infoLight: '#64b5f6',
    infoDark: '#1976d2',
  },
  typography: {
    fontFamily: {
      primary: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      secondary: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      monospace: '"Roboto Mono", "Courier New", monospace',
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
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
      loose: 2,
    },
    letterSpacing: {
      tight: '-0.05em',
      normal: '0',
      wide: '0.05em',
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
  },
  radius: {
    none: '0',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    full: '9999px',
  },
  shadows: {
    none: 'none',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  },
  motion: {
    duration: {
      instant: 0,
      fast: 150,
      normal: 250,
      slow: 350,
      slower: 500,
    },
    easing: {
      linear: 'linear',
      easeIn: 'cubic-bezier(0.4, 0.0, 1, 1)',
      easeOut: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    },
  },
  breakpoints: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
    '2xl': 2560,
  },
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    overlay: 1200,
    modal: 1400,
    popover: 1500,
    tooltip: 1600,
    toast: 1700,
  },
};

/**
 * Default Dark Mode Tokens
 * 
 * Dark mode variants of the default tokens.
 */
export const defaultDarkTokens: DesignTokens = {
  ...defaultLightTokens,
  colors: {
    // Primary brand colors
    primary: '#90caf9',
    primaryLight: '#64b5f6',
    primaryDark: '#42a5f5',
    primaryContrast: '#000000',
    
    // Secondary brand colors
    secondary: '#f48fb1',
    secondaryLight: '#f8bbd0',
    secondaryDark: '#f06292',
    secondaryContrast: '#000000',
    
    // Accent color
    accent: '#ffb74d',
    accentLight: '#ffcc80',
    accentDark: '#ffa726',
    
    // Background colors
    background: '#121212',
    backgroundSecondary: '#1e1e1e',
    backgroundTertiary: '#2a2a2a',
    
    // Surface colors
    surface: '#1e1e1e',
    surfaceElevated: '#2a2a2a',
    surfaceOverlay: 'rgba(0, 0, 0, 0.7)',
    
    // Text colors
    textPrimary: 'rgba(255, 255, 255, 0.87)',
    textSecondary: 'rgba(255, 255, 255, 0.6)',
    textTertiary: 'rgba(255, 255, 255, 0.38)',
    textDisabled: 'rgba(255, 255, 255, 0.38)',
    textInverse: 'rgba(0, 0, 0, 0.87)',
    
    // Border colors
    border: 'rgba(255, 255, 255, 0.12)',
    borderLight: 'rgba(255, 255, 255, 0.06)',
    borderFocus: '#90caf9',
    
    // Semantic state colors
    success: '#66bb6a',
    successLight: '#81c784',
    successDark: '#4caf50',
    
    warning: '#ffa726',
    warningLight: '#ffb74d',
    warningDark: '#ff9800',
    
    error: '#f44336',
    errorLight: '#e57373',
    errorDark: '#d32f2f',
    
    info: '#42a5f5',
    infoLight: '#64b5f6',
    infoDark: '#2196f3',
  },
};

/**
 * Get default tokens for a given mode
 */
export const getDefaultTokens = (mode: 'light' | 'dark' = 'light'): DesignTokens => {
  return mode === 'dark' ? defaultDarkTokens : defaultLightTokens;
};
