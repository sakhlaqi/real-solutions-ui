/**
 * MUI Theme Adapter
 * 
 * Maps internal design tokens to Material-UI theme configuration.
 * This ensures consistent styling across both internal and MUI components.
 */

import { createTheme, Theme, ThemeOptions } from '@mui/material/styles';
import { ThemeMode } from '../types';
import { getDesignTokens } from './tokens';

/**
 * Convert internal design tokens to MUI theme configuration
 */
export const createMUITheme = (mode: ThemeMode): Theme => {
  const tokens = getDesignTokens(mode);

  const themeOptions: ThemeOptions = {
    palette: {
      mode,
      primary: {
        main: tokens.colors.primary.main,
        light: tokens.colors.primary.light,
        dark: tokens.colors.primary.dark,
        contrastText: tokens.colors.primary.contrastText,
      },
      secondary: {
        main: tokens.colors.secondary.main,
        light: tokens.colors.secondary.light,
        dark: tokens.colors.secondary.dark,
        contrastText: tokens.colors.secondary.contrastText,
      },
      error: {
        main: tokens.colors.error.main,
        light: tokens.colors.error.light,
        dark: tokens.colors.error.dark,
      },
      warning: {
        main: tokens.colors.warning.main,
        light: tokens.colors.warning.light,
        dark: tokens.colors.warning.dark,
      },
      info: {
        main: tokens.colors.info.main,
        light: tokens.colors.info.light,
        dark: tokens.colors.info.dark,
      },
      success: {
        main: tokens.colors.success.main,
        light: tokens.colors.success.light,
        dark: tokens.colors.success.dark,
      },
      grey: tokens.colors.grey,
      background: {
        default: tokens.colors.background.default,
        paper: tokens.colors.background.paper,
      },
      text: {
        primary: tokens.colors.text.primary,
        secondary: tokens.colors.text.secondary,
        disabled: tokens.colors.text.disabled,
      },
    },
    typography: {
      fontFamily: tokens.typography.fontFamily,
      fontSize: tokens.typography.fontSize,
      fontWeightLight: tokens.typography.fontWeightLight,
      fontWeightRegular: tokens.typography.fontWeightRegular,
      fontWeightMedium: tokens.typography.fontWeightMedium,
      fontWeightBold: tokens.typography.fontWeightBold,
      h1: {
        fontSize: tokens.typography.h1.fontSize,
        fontWeight: tokens.typography.h1.fontWeight,
        lineHeight: tokens.typography.h1.lineHeight,
      },
      h2: {
        fontSize: tokens.typography.h2.fontSize,
        fontWeight: tokens.typography.h2.fontWeight,
        lineHeight: tokens.typography.h2.lineHeight,
      },
      h3: {
        fontSize: tokens.typography.h3.fontSize,
        fontWeight: tokens.typography.h3.fontWeight,
        lineHeight: tokens.typography.h3.lineHeight,
      },
      h4: {
        fontSize: tokens.typography.h4.fontSize,
        fontWeight: tokens.typography.h4.fontWeight,
        lineHeight: tokens.typography.h4.lineHeight,
      },
      h5: {
        fontSize: tokens.typography.h5.fontSize,
        fontWeight: tokens.typography.h5.fontWeight,
        lineHeight: tokens.typography.h5.lineHeight,
      },
      h6: {
        fontSize: tokens.typography.h6.fontSize,
        fontWeight: tokens.typography.h6.fontWeight,
        lineHeight: tokens.typography.h6.lineHeight,
      },
      body1: {
        fontSize: tokens.typography.body1.fontSize,
        fontWeight: tokens.typography.body1.fontWeight,
        lineHeight: tokens.typography.body1.lineHeight,
      },
      body2: {
        fontSize: tokens.typography.body2.fontSize,
        fontWeight: tokens.typography.body2.fontWeight,
        lineHeight: tokens.typography.body2.lineHeight,
      },
      button: {
        fontSize: tokens.typography.button.fontSize,
        fontWeight: tokens.typography.button.fontWeight,
        textTransform: tokens.typography.button.textTransform as any,
      },
      caption: {
        fontSize: tokens.typography.caption.fontSize,
        fontWeight: tokens.typography.caption.fontWeight,
        lineHeight: tokens.typography.caption.lineHeight,
      },
      overline: {
        fontSize: tokens.typography.overline.fontSize,
        fontWeight: tokens.typography.overline.fontWeight,
        textTransform: tokens.typography.overline.textTransform as any,
      },
    },
    spacing: 8,
    shape: {
      borderRadius: 8,
    },
    shadows: tokens.shadows as any,
    transitions: {
      duration: tokens.transitions.duration,
      easing: tokens.transitions.easing,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: tokens.borderRadius.medium,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: tokens.borderRadius.medium,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: tokens.borderRadius.medium,
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: 'outlined',
        },
      },
    },
  };

  return createTheme(themeOptions);
};
