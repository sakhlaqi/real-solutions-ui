/**
 * Marketing Page Template - Theme Configuration
 * 
 * References the marketing-page-mui theme preset
 */

import type { ThemeConfig } from '../../types/theme';

// Basic config for backwards compatibility
export const marketingPageTheme: ThemeConfig = {
  mode: 'light',
  primaryColor: '#1976d2',
  secondaryColor: '#9c27b0',
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  borderRadius: 4,
  spacing: 8,
};

// Full preset ID for rich theming
export const marketingPageThemePresetId = 'marketing-page-mui';
