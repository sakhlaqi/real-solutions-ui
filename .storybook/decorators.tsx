/**
 * Storybook Decorators for Template Marketplace
 * 
 * Provides theme switching, provider switching, and layout controls
 */

import React from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { themePresetRegistry, presetToMuiTheme } from '../src/core/theme';
import type { Decorator } from '@storybook/react';

/**
 * Theme Provider Decorator with Preset Switching
 */
export const withThemeProvider: Decorator = (Story, context) => {
  const presetId = context.globals.themePreset || 'marketing-page-mui';
  const mode = context.globals.themeMode || 'light';

  // Get theme preset
  const preset = themePresetRegistry.get(presetId);
  
  if (!preset) {
    console.warn(`Theme preset "${presetId}" not found, using default`);
    return <Story />;
  }

  // Apply mode override if different
  const themeWithMode = mode !== preset.mode 
    ? { ...preset, mode } 
    : preset;

  // Convert to MUI theme
  const muiTheme = createTheme(presetToMuiTheme(themeWithMode));

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Story />
    </MuiThemeProvider>
  );
};

/**
 * Viewport Decorator for Responsive Testing
 */
export const withViewport: Decorator = (Story, context) => {
  const viewport = context.globals.viewport || 'desktop';

  const viewportStyles: Record<string, React.CSSProperties> = {
    mobile: { maxWidth: '375px', margin: '0 auto' },
    tablet: { maxWidth: '768px', margin: '0 auto' },
    desktop: { maxWidth: '100%' },
    wide: { maxWidth: '1920px', margin: '0 auto' },
  };

  return (
    <div style={viewportStyles[viewport] || viewportStyles.desktop}>
      <Story />
    </div>
  );
};

/**
 * Container Decorator for Centered Content
 */
export const withContainer: Decorator = (Story) => {
  return (
    <div style={{ padding: '20px' }}>
      <Story />
    </div>
  );
};

/**
 * Full Page Decorator (no padding)
 */
export const withFullPage: Decorator = (Story) => {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Story />
    </div>
  );
};
