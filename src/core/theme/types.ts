/**
 * Extended Theme Types for Rich Theme Presets
 * 
 * Supports comprehensive theming while maintaining backwards compatibility
 * with the basic ThemeConfig interface.
 */

export type UIProvider = 'internal' | 'mui';
export type ThemeMode = 'light' | 'dark';

/**
 * Basic Theme Config (backwards compatible)
 */
export interface ThemeConfig {
  mode: ThemeMode;
  primaryColor?: string;
  secondaryColor?: string;
  fontFamily?: string;
  borderRadius?: number;
  spacing?: number;
}

/**
 * Color Palette
 */
export interface ColorPalette {
  // Primary colors
  primary: string;
  primaryLight?: string;
  primaryDark?: string;
  primaryContrast?: string;

  // Secondary colors
  secondary: string;
  secondaryLight?: string;
  secondaryDark?: string;
  secondaryContrast?: string;

  // Background
  background?: string;
  surface?: string;
  paper?: string;

  // Text colors
  textPrimary?: string;
  textSecondary?: string;
  textDisabled?: string;

  // Status colors
  success?: string;
  warning?: string;
  error?: string;
  info?: string;

  // UI elements
  border?: string;
  divider?: string;
  overlay?: string;
}

/**
 * Typography Scale
 */
export interface TypographyConfig {
  fontFamily: string;
  fontSize: number; // base size in px
  fontWeight: number; // base weight

  // Heading styles
  h1?: TypographyStyle;
  h2?: TypographyStyle;
  h3?: TypographyStyle;
  h4?: TypographyStyle;
  h5?: TypographyStyle;
  h6?: TypographyStyle;

  // Body styles
  body?: TypographyStyle;
  bodyLarge?: TypographyStyle;
  bodySmall?: TypographyStyle;

  // UI text
  button?: TypographyStyle;
  caption?: TypographyStyle;
  overline?: TypographyStyle;
}

export interface TypographyStyle {
  fontSize: string;
  fontWeight: number;
  lineHeight: number;
  letterSpacing?: string;
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
}

/**
 * Spacing Scale
 */
export interface SpacingScale {
  unit: number; // base unit (typically 8)
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
  '3xl': number;
}

/**
 * Border Radius Scale
 */
export interface RadiusScale {
  none: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  full: number;
}

/**
 * Shadow Scale
 */
export interface ShadowScale {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

/**
 * Breakpoints for responsive design
 */
export interface Breakpoints {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl'?: number;
}

/**
 * Rich Theme Preset
 * 
 * Extended theme configuration with full design tokens
 */
export interface ThemePreset {
  // Metadata
  id: string;
  name: string;
  description?: string;
  version: string;
  
  // Mode
  mode: ThemeMode;

  // Design tokens
  colors: ColorPalette;
  typography: TypographyConfig;
  spacing: SpacingScale;
  radius: RadiusScale;
  shadows: ShadowScale;
  breakpoints: Breakpoints;

  // Provider compatibility
  providers?: {
    mui?: boolean;
    internal?: boolean;
  };
}

/**
 * Theme Override (JSON Diff)
 * 
 * Allows partial overrides of theme values
 */
export type ThemeOverride = Partial<Omit<ThemePreset, 'id' | 'version'>> & {
  colors?: Partial<ColorPalette>;
  typography?: Partial<TypographyConfig>;
  spacing?: Partial<SpacingScale>;
  radius?: Partial<RadiusScale>;
  shadows?: Partial<ShadowScale>;
  breakpoints?: Partial<Breakpoints>;
};

/**
 * Resolved Theme
 * 
 * Final theme after applying overrides
 */
export interface ResolvedTheme extends ThemePreset {
  // Track what was overridden
  overrides?: ThemeOverride;
}
