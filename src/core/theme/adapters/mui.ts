/**
 * MUI Theme Provider Adapter
 * 
 * Converts ThemePreset to MUI theme configuration
 */

import type { ThemePreset } from '../types';

/**
 * Convert ThemePreset to MUI Theme Options
 * 
 * @example
 * ```tsx
 * import { createTheme, ThemeProvider } from '@mui/material/styles';
 * import { marketingPagePreset } from '@/core/theme/presets';
 * import { presetToMuiTheme } from '@/core/theme/adapters/mui';
 * 
 * const muiTheme = createTheme(presetToMuiTheme(marketingPagePreset));
 * 
 * function App() {
 *   return (
 *     <ThemeProvider theme={muiTheme}>
 *       <YourApp />
 *     </ThemeProvider>
 *   );
 * }
 * ```
 */
export function presetToMuiTheme(preset: ThemePreset): any {
  return {
    palette: {
      mode: preset.mode,
      primary: {
        main: preset.colors.primary,
        light: preset.colors.primaryLight,
        dark: preset.colors.primaryDark,
        contrastText: preset.colors.primaryContrast,
      },
      secondary: {
        main: preset.colors.secondary,
        light: preset.colors.secondaryLight,
        dark: preset.colors.secondaryDark,
        contrastText: preset.colors.secondaryContrast,
      },
      success: {
        main: preset.colors.success || '#4caf50',
      },
      warning: {
        main: preset.colors.warning || '#ff9800',
      },
      error: {
        main: preset.colors.error || '#f44336',
      },
      info: {
        main: preset.colors.info || '#2196f3',
      },
      background: {
        default: preset.colors.background || '#ffffff',
        paper: preset.colors.paper || '#ffffff',
      },
      text: {
        primary: preset.colors.textPrimary || '#212121',
        secondary: preset.colors.textSecondary || '#757575',
        disabled: preset.colors.textDisabled || '#9e9e9e',
      },
      divider: preset.colors.divider || '#e0e0e0',
    },

    typography: {
      fontFamily: preset.typography.fontFamily,
      fontSize: preset.typography.fontSize,
      fontWeightRegular: preset.typography.fontWeight,

      h1: {
        fontSize: preset.typography.h1?.fontSize,
        fontWeight: preset.typography.h1?.fontWeight,
        lineHeight: preset.typography.h1?.lineHeight,
        letterSpacing: preset.typography.h1?.letterSpacing,
      },
      h2: {
        fontSize: preset.typography.h2?.fontSize,
        fontWeight: preset.typography.h2?.fontWeight,
        lineHeight: preset.typography.h2?.lineHeight,
        letterSpacing: preset.typography.h2?.letterSpacing,
      },
      h3: {
        fontSize: preset.typography.h3?.fontSize,
        fontWeight: preset.typography.h3?.fontWeight,
        lineHeight: preset.typography.h3?.lineHeight,
      },
      h4: {
        fontSize: preset.typography.h4?.fontSize,
        fontWeight: preset.typography.h4?.fontWeight,
        lineHeight: preset.typography.h4?.lineHeight,
      },
      h5: {
        fontSize: preset.typography.h5?.fontSize,
        fontWeight: preset.typography.h5?.fontWeight,
        lineHeight: preset.typography.h5?.lineHeight,
      },
      h6: {
        fontSize: preset.typography.h6?.fontSize,
        fontWeight: preset.typography.h6?.fontWeight,
        lineHeight: preset.typography.h6?.lineHeight,
      },
      body1: {
        fontSize: preset.typography.body?.fontSize,
        fontWeight: preset.typography.body?.fontWeight,
        lineHeight: preset.typography.body?.lineHeight,
      },
      body2: {
        fontSize: preset.typography.bodySmall?.fontSize,
        fontWeight: preset.typography.bodySmall?.fontWeight,
        lineHeight: preset.typography.bodySmall?.lineHeight,
      },
      caption: {
        fontSize: preset.typography.caption?.fontSize,
        fontWeight: preset.typography.caption?.fontWeight,
        lineHeight: preset.typography.caption?.lineHeight,
      },
      button: preset.typography.button ? {
        fontSize: preset.typography.button.fontSize,
        fontWeight: preset.typography.button.fontWeight,
        lineHeight: preset.typography.button.lineHeight,
        letterSpacing: preset.typography.button.letterSpacing,
        textTransform: preset.typography.button.textTransform,
      } : undefined,
    },

    spacing: preset.spacing.unit,

    shape: {
      borderRadius: preset.radius.md,
    },

    breakpoints: {
      values: {
        xs: preset.breakpoints.xs,
        sm: preset.breakpoints.sm,
        md: preset.breakpoints.md,
        lg: preset.breakpoints.lg,
        xl: preset.breakpoints.xl,
      },
    },

    shadows: [
      preset.shadows.none,
      preset.shadows.sm,
      preset.shadows.sm,
      preset.shadows.md,
      preset.shadows.md,
      preset.shadows.md,
      preset.shadows.lg,
      preset.shadows.lg,
      preset.shadows.lg,
      preset.shadows.xl,
      preset.shadows.xl,
      preset.shadows.xl,
      preset.shadows['2xl'],
      preset.shadows['2xl'],
      preset.shadows['2xl'],
      preset.shadows['2xl'],
      preset.shadows['2xl'],
      preset.shadows['2xl'],
      preset.shadows['2xl'],
      preset.shadows['2xl'],
      preset.shadows['2xl'],
      preset.shadows['2xl'],
      preset.shadows['2xl'],
      preset.shadows['2xl'],
      preset.shadows['2xl'],
    ],
  };
}
