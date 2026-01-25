/**
 * Theme System
 * 
 * Canonical Theme & Design Token System
 * 
 * This is the source of truth for theme structure across all apps.
 * 
 * Usage:
 * - API: Import types/schemas for validation and storage
 * - Presentation: Import types/utils for runtime theme application
 * - UI Library: Import types/utils for component styling
 */

// Types
export type {
  ThemeMeta,
  ColorTokens,
  TypographyTokens,
  SpacingTokens,
  RadiusTokens,
  ShadowTokens,
  MotionTokens,
  BreakpointTokens,
  ZIndexTokens,
  DesignTokens,
  ThemeMode,
  ThemeModes,
  Theme,
  ThemePreset,
  AppliedTheme,
  ThemeSelection,
} from './theme.types';

// Schemas
export {
  ThemeMetaSchema,
  ColorTokensSchema,
  TypographyTokensSchema,
  SpacingTokensSchema,
  RadiusTokensSchema,
  ShadowTokensSchema,
  MotionTokensSchema,
  BreakpointTokensSchema,
  ZIndexTokensSchema,
  DesignTokensSchema,
  ThemeModeSchema,
  ThemeModesSchema,
  ThemeSchema,
  ThemePresetSchema,
  AppliedThemeSchema,
  ThemeSelectionSchema,
  validateTheme,
  validateThemeSafe,
  validateDesignTokens,
  getValidationSummary,
} from './theme.schema';

// Utils
export {
  mergeTokens,
  applyThemeMode,
  getAvailableModes,
  hasMode,
  createThemeMode,
  parseColor,
  parseSize,
  pxToRem,
  remToPx,
  getContrastingColor,
  getColorTokens,
  getTypographyTokens,
  getSpacingTokens,
  getRadiusTokens,
  getShadowTokens,
  getMotionTokens,
  getBreakpointTokens,
  getZIndexTokens,
  cloneTheme,
  areThemesEqual,
  getThemeSummary,
  serializeTheme,
  deserializeTheme,
  createCSSVariables,
} from './theme.utils';

// Presets (fallback only - official presets stored in API/database)
export { fallbackTheme } from './presets';

// Registry (dynamic, populated from API)
export {
  ThemeRegistry,
  fallbackTheme as defaultFallbackTheme,
  type RegisteredTheme,
  type ThemeRegistryMeta,
} from './registry';
