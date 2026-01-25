/**
 * Theme & Design Token Validation Schemas
 * 
 * Zod schemas for runtime validation of theme structures.
 * Ensures themes are valid JSON and conform to the expected structure.
 * 
 * **Usage:**
 * - API: Validate themes before storing in database
 * - Presentation: Validate themes received from API
 * - UI Library: Validate custom themes
 */

import { z } from 'zod';

/**
 * Theme Meta Schema
 */
export const ThemeMetaSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
  version: z.string().regex(/^\d+\.\d+\.\d+$/), // semver
  author: z.string().optional(),
  category: z.enum(['official', 'preset', 'custom', 'enterprise']).optional(),
  tags: z.array(z.string()).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

/**
 * Color value schema (hex, rgb, rgba, hsl, hsla)
 */
const ColorValueSchema = z.string().regex(
  /^(#[0-9A-Fa-f]{3,8}|rgb\(|rgba\(|hsl\(|hsla\()/,
  'Invalid color format'
);

/**
 * Color Tokens Schema
 */
export const ColorTokensSchema = z.object({
  // Primary
  primary: ColorValueSchema,
  primaryLight: ColorValueSchema.optional(),
  primaryDark: ColorValueSchema.optional(),
  primaryContrast: ColorValueSchema.optional(),
  
  // Secondary
  secondary: ColorValueSchema,
  secondaryLight: ColorValueSchema.optional(),
  secondaryDark: ColorValueSchema.optional(),
  secondaryContrast: ColorValueSchema.optional(),
  
  // Accent
  accent: ColorValueSchema.optional(),
  accentLight: ColorValueSchema.optional(),
  accentDark: ColorValueSchema.optional(),
  
  // Background
  background: ColorValueSchema,
  backgroundSecondary: ColorValueSchema.optional(),
  backgroundTertiary: ColorValueSchema.optional(),
  
  // Surface
  surface: ColorValueSchema,
  surfaceElevated: ColorValueSchema.optional(),
  surfaceOverlay: ColorValueSchema.optional(),
  
  // Text
  textPrimary: ColorValueSchema,
  textSecondary: ColorValueSchema,
  textTertiary: ColorValueSchema.optional(),
  textDisabled: ColorValueSchema.optional(),
  textInverse: ColorValueSchema.optional(),
  
  // Border
  border: ColorValueSchema,
  borderLight: ColorValueSchema.optional(),
  borderFocus: ColorValueSchema.optional(),
  
  // Semantic states
  success: ColorValueSchema,
  successLight: ColorValueSchema.optional(),
  successDark: ColorValueSchema.optional(),
  
  warning: ColorValueSchema,
  warningLight: ColorValueSchema.optional(),
  warningDark: ColorValueSchema.optional(),
  
  error: ColorValueSchema,
  errorLight: ColorValueSchema.optional(),
  errorDark: ColorValueSchema.optional(),
  
  info: ColorValueSchema,
  infoLight: ColorValueSchema.optional(),
  infoDark: ColorValueSchema.optional(),
});

/**
 * CSS size value schema (px, rem, em, %)
 */
const SizeValueSchema = z.string().regex(
  /^-?\d+(\.\d+)?(px|rem|em|%)?$/,
  'Invalid size format'
);

/**
 * Typography Tokens Schema
 */
export const TypographyTokensSchema = z.object({
  fontFamily: z.object({
    primary: z.string(),
    secondary: z.string().optional(),
    monospace: z.string().optional(),
  }),
  fontSize: z.object({
    xs: SizeValueSchema,
    sm: SizeValueSchema,
    base: SizeValueSchema,
    lg: SizeValueSchema,
    xl: SizeValueSchema,
    '2xl': SizeValueSchema,
    '3xl': SizeValueSchema,
    '4xl': SizeValueSchema,
    '5xl': SizeValueSchema.optional(),
  }),
  fontWeight: z.object({
    light: z.number().int().min(100).max(900),
    normal: z.number().int().min(100).max(900),
    medium: z.number().int().min(100).max(900),
    semibold: z.number().int().min(100).max(900),
    bold: z.number().int().min(100).max(900),
  }),
  lineHeight: z.object({
    tight: z.number().positive(),
    normal: z.number().positive(),
    relaxed: z.number().positive(),
    loose: z.number().positive(),
  }),
  letterSpacing: z.object({
    tight: SizeValueSchema,
    normal: SizeValueSchema,
    wide: SizeValueSchema,
  }).optional(),
});

/**
 * Spacing Tokens Schema
 */
export const SpacingTokensSchema = z.object({
  xs: SizeValueSchema,
  sm: SizeValueSchema,
  md: SizeValueSchema,
  lg: SizeValueSchema,
  xl: SizeValueSchema,
  '2xl': SizeValueSchema,
  '3xl': SizeValueSchema,
  '4xl': SizeValueSchema.optional(),
  '5xl': SizeValueSchema.optional(),
});

/**
 * Radius Tokens Schema
 */
export const RadiusTokensSchema = z.object({
  none: SizeValueSchema,
  sm: SizeValueSchema,
  md: SizeValueSchema,
  lg: SizeValueSchema,
  xl: SizeValueSchema,
  '2xl': SizeValueSchema.optional(),
  full: SizeValueSchema,
});

/**
 * Shadow Tokens Schema
 */
export const ShadowTokensSchema = z.object({
  none: z.string(),
  sm: z.string(),
  md: z.string(),
  lg: z.string(),
  xl: z.string(),
  '2xl': z.string().optional(),
  inner: z.string().optional(),
});

/**
 * Motion Tokens Schema
 */
export const MotionTokensSchema = z.object({
  duration: z.object({
    instant: z.number().int().min(0),
    fast: z.number().int().min(0),
    normal: z.number().int().min(0),
    slow: z.number().int().min(0),
    slower: z.number().int().min(0),
  }),
  easing: z.object({
    linear: z.string(),
    easeIn: z.string(),
    easeOut: z.string(),
    easeInOut: z.string(),
    spring: z.string().optional(),
  }),
});

/**
 * Breakpoint Tokens Schema
 */
export const BreakpointTokensSchema = z.object({
  xs: z.number().int().min(0),
  sm: z.number().int().min(0),
  md: z.number().int().min(0),
  lg: z.number().int().min(0),
  xl: z.number().int().min(0),
  '2xl': z.number().int().min(0).optional(),
});

/**
 * Z-Index Tokens Schema
 */
export const ZIndexTokensSchema = z.object({
  base: z.number().int(),
  dropdown: z.number().int(),
  sticky: z.number().int(),
  overlay: z.number().int(),
  modal: z.number().int(),
  popover: z.number().int(),
  tooltip: z.number().int(),
  toast: z.number().int(),
});

/**
 * Design Tokens Schema
 */
export const DesignTokensSchema = z.object({
  colors: ColorTokensSchema,
  typography: TypographyTokensSchema,
  spacing: SpacingTokensSchema,
  radius: RadiusTokensSchema,
  shadows: ShadowTokensSchema,
  motion: MotionTokensSchema,
  breakpoints: BreakpointTokensSchema,
  zIndex: ZIndexTokensSchema,
});

/**
 * Theme Mode Schema
 */
export const ThemeModeSchema = z.object({
  name: z.string(),
  label: z.string(),
  tokens: DesignTokensSchema.partial(),
});

/**
 * Theme Modes Schema
 */
export const ThemeModesSchema = z.object({
  dark: ThemeModeSchema.optional(),
  compact: ThemeModeSchema.optional(),
  highContrast: ThemeModeSchema.optional(),
}).catchall(ThemeModeSchema.optional());

/**
 * Complete Theme Schema
 */
export const ThemeSchema = z.object({
  meta: ThemeMetaSchema,
  tokens: DesignTokensSchema,
  modes: ThemeModesSchema.optional(),
});

/**
 * Theme Preset Schema
 */
export const ThemePresetSchema = ThemeSchema.extend({
  isBuiltIn: z.boolean().optional(),
  isActive: z.boolean().optional(),
});

/**
 * Applied Theme Schema
 */
export const AppliedThemeSchema = z.object({
  theme: ThemeSchema,
  mode: z.string().optional(),
  tokens: DesignTokensSchema,
});

/**
 * Theme Selection Schema
 */
export const ThemeSelectionSchema = z.object({
  themeId: z.string(),
  mode: z.string().optional(),
  customTokens: DesignTokensSchema.partial().optional(),
});

/**
 * Validation Helpers
 */

/**
 * Validate theme structure
 * @throws {ZodError} if theme is invalid
 */
export function validateTheme(theme: unknown): asserts theme is z.infer<typeof ThemeSchema> {
  ThemeSchema.parse(theme);
}

/**
 * Validate theme safely (returns result)
 */
export function validateThemeSafe(theme: unknown) {
  return ThemeSchema.safeParse(theme);
}

/**
 * Validate design tokens
 * @throws {ZodError} if tokens are invalid
 */
export function validateDesignTokens(tokens: unknown): asserts tokens is z.infer<typeof DesignTokensSchema> {
  DesignTokensSchema.parse(tokens);
}

/**
 * Validate design tokens safely
 */
export function validateDesignTokensSafe(tokens: unknown) {
  return DesignTokensSchema.safeParse(tokens);
}

/**
 * Get validation summary
 * Returns human-readable error messages
 */
export function getValidationSummary(error: z.ZodError): string[] {
  return error.issues.map(err => {
    const path = err.path.join('.');
    return `${path}: ${err.message}`;
  });
}

/**
 * Type exports for use in other files
 */
export type ThemeMeta = z.infer<typeof ThemeMetaSchema>;
export type ColorTokens = z.infer<typeof ColorTokensSchema>;
export type TypographyTokens = z.infer<typeof TypographyTokensSchema>;
export type SpacingTokens = z.infer<typeof SpacingTokensSchema>;
export type RadiusTokens = z.infer<typeof RadiusTokensSchema>;
export type ShadowTokens = z.infer<typeof ShadowTokensSchema>;
export type MotionTokens = z.infer<typeof MotionTokensSchema>;
export type BreakpointTokens = z.infer<typeof BreakpointTokensSchema>;
export type ZIndexTokens = z.infer<typeof ZIndexTokensSchema>;
export type DesignTokens = z.infer<typeof DesignTokensSchema>;
export type ThemeMode = z.infer<typeof ThemeModeSchema>;
export type ThemeModes = z.infer<typeof ThemeModesSchema>;
export type Theme = z.infer<typeof ThemeSchema>;
export type ThemePreset = z.infer<typeof ThemePresetSchema>;
export type AppliedTheme = z.infer<typeof AppliedThemeSchema>;
export type ThemeSelection = z.infer<typeof ThemeSelectionSchema>;
