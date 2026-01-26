/**
 * Blog Template - Theme Configuration
 * 
 * Clean, readable theme optimized for content
 */

import type { ThemeConfig } from '../../types/theme';

export const blogTemplateTheme: ThemeConfig = {
  mode: 'light',
  primaryColor: '#2e7d32', // Green
  secondaryColor: '#ff6f00', // Orange
  fontFamily: '"Georgia", "Cambria", "Times New Roman", serif',
  borderRadius: 2,
  spacing: 8,
};

// Full preset ID for rich theming
export const blogTemplateThemePresetId = 'blog-mui';
