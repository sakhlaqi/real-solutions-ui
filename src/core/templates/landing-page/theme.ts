/**
 * Landing Page Template - Theme Configuration
 * 
 * Bold, conversion-focused theme
 */

import type { ThemeConfig } from '../../types/theme';

export const landingPageTheme: ThemeConfig = {
  mode: 'light',
  primaryColor: '#6366f1',
  secondaryColor: '#ec4899',
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  borderRadius: 6,
  spacing: 8,
};

// Full preset ID for rich theming
export const landingPageThemePresetId = 'landing-page-mui';
