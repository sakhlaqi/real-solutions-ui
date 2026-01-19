/**
 * Theme Types and Interfaces
 */

export type UIProvider = 'internal' | 'mui';

export type ThemeMode = 'light' | 'dark';

export interface ThemeConfig {
  mode: ThemeMode;
  primaryColor?: string;
  secondaryColor?: string;
  fontFamily?: string;
  borderRadius?: number;
  spacing?: number;
}

export interface DesignTokens {
  colors: {
    primary: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    secondary: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    error: {
      main: string;
      light: string;
      dark: string;
    };
    warning: {
      main: string;
      light: string;
      dark: string;
    };
    info: {
      main: string;
      light: string;
      dark: string;
    };
    success: {
      main: string;
      light: string;
      dark: string;
    };
    grey: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    background: {
      default: string;
      paper: string;
    };
    text: {
      primary: string;
      secondary: string;
      disabled: string;
    };
  };
  typography: {
    fontFamily: string;
    fontSize: number;
    fontWeightLight: number;
    fontWeightRegular: number;
    fontWeightMedium: number;
    fontWeightBold: number;
    h1: { fontSize: string; fontWeight: number; lineHeight: number };
    h2: { fontSize: string; fontWeight: number; lineHeight: number };
    h3: { fontSize: string; fontWeight: number; lineHeight: number };
    h4: { fontSize: string; fontWeight: number; lineHeight: number };
    h5: { fontSize: string; fontWeight: number; lineHeight: number };
    h6: { fontSize: string; fontWeight: number; lineHeight: number };
    body1: { fontSize: string; fontWeight: number; lineHeight: number };
    body2: { fontSize: string; fontWeight: number; lineHeight: number };
    button: { fontSize: string; fontWeight: number; textTransform: string };
    caption: { fontSize: string; fontWeight: number; lineHeight: number };
    overline: { fontSize: string; fontWeight: number; textTransform: string };
  };
  spacing: (factor: number) => string;
  borderRadius: {
    small: string;
    medium: string;
    large: string;
  };
  shadows: string[];
  transitions: {
    duration: {
      shortest: number;
      shorter: number;
      short: number;
      standard: number;
      complex: number;
      enteringScreen: number;
      leavingScreen: number;
    };
    easing: {
      easeInOut: string;
      easeOut: string;
      easeIn: string;
      sharp: string;
    };
  };
}
