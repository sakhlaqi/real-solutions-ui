/**
 * Token to MUI Theme Mapper
 * 
 * Maps canonical design tokens to Material-UI theme configuration.
 * This ensures MUI components consume the same tokens as internal components.
 */

import { createTheme, Theme, ThemeOptions } from '@mui/material/styles';
import type { DesignTokens } from '../../theme/theme.types';

/**
 * Convert design tokens to MUI theme configuration
 * 
 * @param tokens - Design tokens from canonical theme
 * @returns Material-UI theme
 */
export const createMUIThemeFromTokens = (tokens: DesignTokens): Theme => {
  const themeOptions: ThemeOptions = {
    // Determine mode from token values
    palette: {
      mode: tokens.colors.background === '#ffffff' ? 'light' : 'dark',
      primary: {
        main: tokens.colors.primary,
        light: tokens.colors.primaryLight || tokens.colors.primary,
        dark: tokens.colors.primaryDark || tokens.colors.primary,
        contrastText: tokens.colors.primaryContrast || tokens.colors.textInverse || '#fff',
      },
      secondary: {
        main: tokens.colors.secondary,
        light: tokens.colors.secondaryLight || tokens.colors.secondary,
        dark: tokens.colors.secondaryDark || tokens.colors.secondary,
        contrastText: tokens.colors.secondaryContrast || tokens.colors.textInverse || '#fff',
      },
      error: {
        main: tokens.colors.error,
        light: tokens.colors.errorLight || tokens.colors.error,
        dark: tokens.colors.errorDark || tokens.colors.error,
        contrastText: '#fff',
      },
      warning: {
        main: tokens.colors.warning,
        light: tokens.colors.warningLight || tokens.colors.warning,
        dark: tokens.colors.warningDark || tokens.colors.warning,
        contrastText: '#fff',
      },
      info: {
        main: tokens.colors.info,
        light: tokens.colors.infoLight || tokens.colors.info,
        dark: tokens.colors.infoDark || tokens.colors.info,
        contrastText: '#fff',
      },
      success: {
        main: tokens.colors.success,
        light: tokens.colors.successLight || tokens.colors.success,
        dark: tokens.colors.successDark || tokens.colors.success,
        contrastText: '#fff',
      },
      background: {
        default: tokens.colors.background,
        paper: tokens.colors.surface,
      },
      text: {
        primary: tokens.colors.textPrimary,
        secondary: tokens.colors.textSecondary,
        disabled: tokens.colors.textDisabled || tokens.colors.textSecondary,
      },
      divider: tokens.colors.border,
      action: {
        hover: 'rgba(0, 0, 0, 0.04)',
        selected: 'rgba(0, 0, 0, 0.08)',
        disabled: tokens.colors.textDisabled || 'rgba(0, 0, 0, 0.26)',
        disabledBackground: 'rgba(0, 0, 0, 0.12)',
        focus: tokens.colors.borderFocus || 'rgba(0, 0, 0, 0.12)',
        active: 'rgba(0, 0, 0, 0.16)',
      },
    },
    typography: {
      fontFamily: tokens.typography.fontFamily.primary,
      fontSize: parseFloat(tokens.typography.fontSize.base) * 16, // Convert rem to px
      fontWeightLight: tokens.typography.fontWeight.light,
      fontWeightRegular: tokens.typography.fontWeight.normal,
      fontWeightMedium: tokens.typography.fontWeight.medium,
      fontWeightBold: tokens.typography.fontWeight.bold,
      h1: {
        fontSize: tokens.typography.fontSize['5xl'] || tokens.typography.fontSize['4xl'],
        fontWeight: tokens.typography.fontWeight.bold,
        lineHeight: tokens.typography.lineHeight.tight,
        fontFamily: tokens.typography.fontFamily.secondary || tokens.typography.fontFamily.primary,
      },
      h2: {
        fontSize: tokens.typography.fontSize['4xl'],
        fontWeight: tokens.typography.fontWeight.bold,
        lineHeight: tokens.typography.lineHeight.tight,
        fontFamily: tokens.typography.fontFamily.secondary || tokens.typography.fontFamily.primary,
      },
      h3: {
        fontSize: tokens.typography.fontSize['3xl'],
        fontWeight: tokens.typography.fontWeight.semibold,
        lineHeight: tokens.typography.lineHeight.tight,
        fontFamily: tokens.typography.fontFamily.secondary || tokens.typography.fontFamily.primary,
      },
      h4: {
        fontSize: tokens.typography.fontSize['2xl'],
        fontWeight: tokens.typography.fontWeight.semibold,
        lineHeight: tokens.typography.lineHeight.normal,
        fontFamily: tokens.typography.fontFamily.secondary || tokens.typography.fontFamily.primary,
      },
      h5: {
        fontSize: tokens.typography.fontSize.xl,
        fontWeight: tokens.typography.fontWeight.medium,
        lineHeight: tokens.typography.lineHeight.normal,
        fontFamily: tokens.typography.fontFamily.secondary || tokens.typography.fontFamily.primary,
      },
      h6: {
        fontSize: tokens.typography.fontSize.lg,
        fontWeight: tokens.typography.fontWeight.medium,
        lineHeight: tokens.typography.lineHeight.normal,
        fontFamily: tokens.typography.fontFamily.secondary || tokens.typography.fontFamily.primary,
      },
      subtitle1: {
        fontSize: tokens.typography.fontSize.base,
        fontWeight: tokens.typography.fontWeight.medium,
        lineHeight: tokens.typography.lineHeight.normal,
      },
      subtitle2: {
        fontSize: tokens.typography.fontSize.sm,
        fontWeight: tokens.typography.fontWeight.medium,
        lineHeight: tokens.typography.lineHeight.normal,
      },
      body1: {
        fontSize: tokens.typography.fontSize.base,
        fontWeight: tokens.typography.fontWeight.normal,
        lineHeight: tokens.typography.lineHeight.normal,
      },
      body2: {
        fontSize: tokens.typography.fontSize.sm,
        fontWeight: tokens.typography.fontWeight.normal,
        lineHeight: tokens.typography.lineHeight.normal,
      },
      button: {
        fontSize: tokens.typography.fontSize.base,
        fontWeight: tokens.typography.fontWeight.medium,
        textTransform: 'none', // Remove uppercase transformation
        letterSpacing: tokens.typography.letterSpacing?.normal || '0',
      },
      caption: {
        fontSize: tokens.typography.fontSize.xs,
        fontWeight: tokens.typography.fontWeight.normal,
        lineHeight: tokens.typography.lineHeight.normal,
      },
      overline: {
        fontSize: tokens.typography.fontSize.xs,
        fontWeight: tokens.typography.fontWeight.medium,
        textTransform: 'uppercase',
        letterSpacing: tokens.typography.letterSpacing?.wide || '0.05em',
      },
    },
    spacing: (factor: number) => {
      // MUI uses 8px base spacing by default
      // Convert our spacing tokens to work with MUI's system
      const baseSpacing = parseFloat(tokens.spacing.md) * 16; // Convert rem to px
      return `${factor * baseSpacing}px`;
    },
    shape: {
      borderRadius: parseFloat(tokens.radius.md) * 16, // Convert rem to px
    },
    shadows: [
      'none',
      tokens.shadows.sm,
      tokens.shadows.sm,
      tokens.shadows.sm,
      tokens.shadows.md,
      tokens.shadows.md,
      tokens.shadows.md,
      tokens.shadows.lg,
      tokens.shadows.lg,
      tokens.shadows.lg,
      tokens.shadows.xl,
      tokens.shadows.xl,
      tokens.shadows.xl,
      tokens.shadows['2xl'] || tokens.shadows.xl,
      tokens.shadows['2xl'] || tokens.shadows.xl,
      tokens.shadows['2xl'] || tokens.shadows.xl,
      tokens.shadows['2xl'] || tokens.shadows.xl,
      tokens.shadows['2xl'] || tokens.shadows.xl,
      tokens.shadows['2xl'] || tokens.shadows.xl,
      tokens.shadows['2xl'] || tokens.shadows.xl,
      tokens.shadows['2xl'] || tokens.shadows.xl,
      tokens.shadows['2xl'] || tokens.shadows.xl,
      tokens.shadows['2xl'] || tokens.shadows.xl,
      tokens.shadows['2xl'] || tokens.shadows.xl,
      tokens.shadows['2xl'] || tokens.shadows.xl,
    ],
    transitions: {
      duration: {
        shortest: tokens.motion.duration.instant,
        shorter: tokens.motion.duration.fast,
        short: tokens.motion.duration.normal,
        standard: tokens.motion.duration.normal,
        complex: tokens.motion.duration.slow,
        enteringScreen: tokens.motion.duration.normal,
        leavingScreen: tokens.motion.duration.fast,
      },
      easing: {
        easeInOut: tokens.motion.easing.easeInOut,
        easeOut: tokens.motion.easing.easeOut,
        easeIn: tokens.motion.easing.easeIn,
        sharp: tokens.motion.easing.easeInOut,
      },
    },
    breakpoints: {
      values: {
        xs: tokens.breakpoints.xs,
        sm: tokens.breakpoints.sm,
        md: tokens.breakpoints.md,
        lg: tokens.breakpoints.lg,
        xl: tokens.breakpoints.xl,
      },
    },
    zIndex: {
      mobileStepper: 1000,
      fab: 1050,
      speedDial: 1050,
      appBar: tokens.zIndex.sticky,
      drawer: tokens.zIndex.dropdown,
      modal: tokens.zIndex.modal,
      snackbar: tokens.zIndex.toast,
      tooltip: tokens.zIndex.tooltip,
    },
  };

  return createTheme(themeOptions);
};
