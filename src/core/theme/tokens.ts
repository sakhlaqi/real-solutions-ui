/**
 * Design Tokens - Internal Theme Source of Truth
 * 
 * These tokens are derived from CSS custom properties and serve as the
 * canonical source for design decisions. Both internal components and
 * MUI theme configuration should reference these tokens.
 */

import { DesignTokens, ThemeMode } from '../types';

/**
 * Extract design tokens from CSS custom properties
 */
export const getDesignTokens = (mode: ThemeMode): DesignTokens => {
  const isDark = mode === 'dark';

  return {
    colors: {
      primary: {
        main: isDark ? '#90caf9' : '#1976d2',
        light: isDark ? '#e3f2fd' : '#42a5f5',
        dark: isDark ? '#42a5f5' : '#1565c0',
        contrastText: '#fff',
      },
      secondary: {
        main: isDark ? '#f48fb1' : '#dc004e',
        light: isDark ? '#fce4ec' : '#f06292',
        dark: isDark ? '#f06292' : '#c51162',
        contrastText: '#fff',
      },
      error: {
        main: '#f44336',
        light: '#e57373',
        dark: '#d32f2f',
      },
      warning: {
        main: '#ff9800',
        light: '#ffb74d',
        dark: '#f57c00',
      },
      info: {
        main: '#2196f3',
        light: '#64b5f6',
        dark: '#1976d2',
      },
      success: {
        main: '#4caf50',
        light: '#81c784',
        dark: '#388e3c',
      },
      grey: {
        50: '#fafafa',
        100: '#f5f5f5',
        200: '#eeeeee',
        300: '#e0e0e0',
        400: '#bdbdbd',
        500: '#9e9e9e',
        600: '#757575',
        700: '#616161',
        800: '#424242',
        900: '#212121',
      },
      background: {
        default: isDark ? '#121212' : '#ffffff',
        paper: isDark ? '#1e1e1e' : '#ffffff',
      },
      text: {
        primary: isDark ? 'rgba(255, 255, 255, 0.87)' : 'rgba(0, 0, 0, 0.87)',
        secondary: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
        disabled: isDark ? 'rgba(255, 255, 255, 0.38)' : 'rgba(0, 0, 0, 0.38)',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
      h1: { fontSize: '2.5rem', fontWeight: 700, lineHeight: 1.2 },
      h2: { fontSize: '2rem', fontWeight: 700, lineHeight: 1.3 },
      h3: { fontSize: '1.75rem', fontWeight: 600, lineHeight: 1.4 },
      h4: { fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.5 },
      h5: { fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.5 },
      h6: { fontSize: '1rem', fontWeight: 600, lineHeight: 1.6 },
      body1: { fontSize: '1rem', fontWeight: 400, lineHeight: 1.5 },
      body2: { fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.43 },
      button: { fontSize: '0.875rem', fontWeight: 500, textTransform: 'uppercase' },
      caption: { fontSize: '0.75rem', fontWeight: 400, lineHeight: 1.66 },
      overline: { fontSize: '0.75rem', fontWeight: 400, textTransform: 'uppercase' },
    },
    spacing: (factor: number) => `${8 * factor}px`,
    borderRadius: {
      small: '4px',
      medium: '8px',
      large: '12px',
    },
    shadows: [
      'none',
      '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
      '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
      '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
      '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
      '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
      '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
      '0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)',
      '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
      '0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)',
      '0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)',
      '0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)',
      '0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)',
      '0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)',
      '0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)',
      '0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)',
      '0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)',
      '0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)',
      '0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)',
      '0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)',
      '0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)',
      '0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)',
      '0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)',
      '0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)',
      '0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)',
    ],
    transitions: {
      duration: {
        shortest: 150,
        shorter: 200,
        short: 250,
        standard: 300,
        complex: 375,
        enteringScreen: 225,
        leavingScreen: 195,
      },
      easing: {
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
      },
    },
  };
};

/**
 * Apply design tokens to CSS custom properties
 */
export const applyCSSTokens = (tokens: DesignTokens): void => {
  const root = document.documentElement;

  // Colors
  root.style.setProperty('--color-primary-main', tokens.colors.primary.main);
  root.style.setProperty('--color-primary-light', tokens.colors.primary.light);
  root.style.setProperty('--color-primary-dark', tokens.colors.primary.dark);
  root.style.setProperty('--color-secondary-main', tokens.colors.secondary.main);
  root.style.setProperty('--color-secondary-light', tokens.colors.secondary.light);
  root.style.setProperty('--color-secondary-dark', tokens.colors.secondary.dark);
  
  root.style.setProperty('--color-error', tokens.colors.error.main);
  root.style.setProperty('--color-warning', tokens.colors.warning.main);
  root.style.setProperty('--color-info', tokens.colors.info.main);
  root.style.setProperty('--color-success', tokens.colors.success.main);
  
  root.style.setProperty('--color-background', tokens.colors.background.default);
  root.style.setProperty('--color-surface', tokens.colors.background.paper);
  root.style.setProperty('--color-text-primary', tokens.colors.text.primary);
  root.style.setProperty('--color-text-secondary', tokens.colors.text.secondary);

  // Typography
  root.style.setProperty('--font-family', tokens.typography.fontFamily);
  root.style.setProperty('--font-size-base', `${tokens.typography.fontSize}px`);

  // Spacing
  root.style.setProperty('--spacing-unit', '8px');

  // Border radius
  root.style.setProperty('--radius-small', tokens.borderRadius.small);
  root.style.setProperty('--radius-medium', tokens.borderRadius.medium);
  root.style.setProperty('--radius-large', tokens.borderRadius.large);
};
