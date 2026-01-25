/**
 * Theme Utilities
 * 
 * Helper functions for working with themes and design tokens.
 * Handles merging base tokens with mode overrides, type conversions, etc.
 */

import type {
  Theme,
  ThemeMode,
  DesignTokens,
  AppliedTheme,
  ColorTokens,
  TypographyTokens,
  SpacingTokens,
  RadiusTokens,
  ShadowTokens,
  MotionTokens,
  BreakpointTokens,
  ZIndexTokens,
} from './theme.types';

/**
 * Deep merge utility
 * Recursively merges objects, with source overriding target
 */
function deepMerge<T extends Record<string, unknown>>(
  target: T,
  source: Partial<T>
): T {
  const result = { ...target };

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceValue = source[key];
      const targetValue = result[key];

      if (
        sourceValue &&
        typeof sourceValue === 'object' &&
        !Array.isArray(sourceValue) &&
        targetValue &&
        typeof targetValue === 'object' &&
        !Array.isArray(targetValue)
      ) {
        // Recursively merge objects
        result[key] = deepMerge(
          targetValue as Record<string, unknown>,
          sourceValue as Record<string, unknown>
        ) as T[Extract<keyof T, string>];
      } else if (sourceValue !== undefined) {
        // Override with source value
        result[key] = sourceValue as T[Extract<keyof T, string>];
      }
    }
  }

  return result;
}

/**
 * Merge base tokens with mode overrides
 * 
 * @param baseTokens - Base design tokens
 * @param modeTokens - Mode-specific token overrides
 * @returns Merged tokens
 * 
 * @example
 * ```typescript
 * const lightTokens = { colors: { background: '#fff' } };
 * const darkMode = { colors: { background: '#000' } };
 * const merged = mergeTokens(lightTokens, darkMode);
 * // Result: { colors: { background: '#000' } }
 * ```
 */
export function mergeTokens(
  baseTokens: DesignTokens,
  modeTokens: Partial<DesignTokens>
): DesignTokens {
  return deepMerge(
    baseTokens as unknown as Record<string, unknown>,
    modeTokens as unknown as Partial<Record<string, unknown>>
  ) as unknown as DesignTokens;
}

/**
 * Apply theme mode
 * 
 * Merges base theme tokens with mode-specific overrides
 * 
 * @param theme - Base theme
 * @param modeName - Mode to apply (e.g., 'dark', 'compact')
 * @returns Applied theme with merged tokens
 * 
 * @example
 * ```typescript
 * const appliedTheme = applyThemeMode(theme, 'dark');
 * ```
 */
export function applyThemeMode(
  theme: Theme,
  modeName?: string
): AppliedTheme {
  // No mode specified - use base tokens
  if (!modeName || !theme.modes || !theme.modes[modeName]) {
    return {
      theme,
      mode: undefined,
      tokens: theme.tokens,
    };
  }

  // Get mode
  const mode = theme.modes[modeName];
  if (!mode) {
    console.warn(`[applyThemeMode] Mode "${modeName}" not found in theme`);
    return {
      theme,
      mode: undefined,
      tokens: theme.tokens,
    };
  }

  // Merge base tokens with mode overrides
  const mergedTokens = mergeTokens(theme.tokens, mode.tokens);

  return {
    theme,
    mode: modeName,
    tokens: mergedTokens,
  };
}

/**
 * Get available modes for a theme
 * 
 * @param theme - Theme to check
 * @returns Array of mode names
 */
export function getAvailableModes(theme: Theme): string[] {
  if (!theme.modes) return [];
  return Object.keys(theme.modes).filter(
    key => theme.modes![key] !== undefined
  );
}

/**
 * Check if theme has a specific mode
 * 
 * @param theme - Theme to check
 * @param modeName - Mode name to look for
 */
export function hasMode(theme: Theme, modeName: string): boolean {
  return !!(theme.modes && theme.modes[modeName]);
}

/**
 * Create theme mode from token overrides
 * 
 * Helper to create a ThemeMode object
 */
export function createThemeMode(
  name: string,
  label: string,
  tokens: Partial<DesignTokens>
): ThemeMode {
  return {
    name,
    label,
    tokens,
  };
}

/**
 * Parse CSS color to ensure it's valid
 * 
 * @param color - Color string
 * @returns Validated color or default
 */
export function parseColor(color: string, fallback = '#000000'): string {
  // Basic validation (hex, rgb, rgba, hsl, hsla)
  const colorRegex = /^(#[0-9A-Fa-f]{3,8}|rgb\(|rgba\(|hsl\(|hsla\()/;
  return colorRegex.test(color) ? color : fallback;
}

/**
 * Parse CSS size value
 * 
 * @param size - Size string (e.g., '16px', '1rem')
 * @returns Numeric value in pixels
 */
export function parseSize(size: string, baseFontSize = 16): number {
  if (!size) return 0;

  const value = parseFloat(size);
  
  if (size.includes('rem')) {
    return value * baseFontSize;
  }
  
  if (size.includes('em')) {
    return value * baseFontSize;
  }
  
  // Assume px
  return value;
}

/**
 * Convert pixel value to rem
 * 
 * @param px - Pixel value
 * @param baseFontSize - Base font size (default: 16)
 */
export function pxToRem(px: number, baseFontSize = 16): string {
  return `${px / baseFontSize}rem`;
}

/**
 * Convert rem to pixels
 * 
 * @param rem - Rem value
 * @param baseFontSize - Base font size (default: 16)
 */
export function remToPx(rem: number, baseFontSize = 16): number {
  return rem * baseFontSize;
}

/**
 * Get contrasting text color
 * 
 * Determines whether to use light or dark text based on background
 * 
 * @param backgroundColor - Background color (hex)
 * @param lightColor - Color to use for dark backgrounds
 * @param darkColor - Color to use for light backgrounds
 */
export function getContrastingColor(
  backgroundColor: string,
  lightColor = '#ffffff',
  darkColor = '#000000'
): string {
  // Simple luminance calculation
  // Convert hex to RGB
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Use light text for dark backgrounds, dark text for light backgrounds
  return luminance > 0.5 ? darkColor : lightColor;
}

/**
 * Extract specific token category
 */
export function getColorTokens(tokens: DesignTokens): ColorTokens {
  return tokens.colors;
}

export function getTypographyTokens(tokens: DesignTokens): TypographyTokens {
  return tokens.typography;
}

export function getSpacingTokens(tokens: DesignTokens): SpacingTokens {
  return tokens.spacing;
}

export function getRadiusTokens(tokens: DesignTokens): RadiusTokens {
  return tokens.radius;
}

export function getShadowTokens(tokens: DesignTokens): ShadowTokens {
  return tokens.shadows;
}

export function getMotionTokens(tokens: DesignTokens): MotionTokens {
  return tokens.motion;
}

export function getBreakpointTokens(tokens: DesignTokens): BreakpointTokens {
  return tokens.breakpoints;
}

export function getZIndexTokens(tokens: DesignTokens): ZIndexTokens {
  return tokens.zIndex;
}

/**
 * Clone theme (deep copy)
 * 
 * Creates a new theme object with all properties copied
 */
export function cloneTheme(theme: Theme): Theme {
  return JSON.parse(JSON.stringify(theme));
}

/**
 * Compare two themes for equality
 * 
 * @param theme1 - First theme
 * @param theme2 - Second theme
 * @returns True if themes are identical
 */
export function areThemesEqual(theme1: Theme, theme2: Theme): boolean {
  return JSON.stringify(theme1) === JSON.stringify(theme2);
}

/**
 * Get theme summary
 * 
 * Returns human-readable summary of theme
 */
export function getThemeSummary(theme: Theme): string {
  const modes = getAvailableModes(theme);
  const modeText = modes.length > 0 ? ` (${modes.length} modes)` : '';
  return `${theme.meta.name} v${theme.meta.version}${modeText}`;
}

/**
 * Serialize theme to JSON
 * 
 * Ensures theme is valid JSON (no functions, undefined values, etc.)
 */
export function serializeTheme(theme: Theme): string {
  return JSON.stringify(theme, null, 2);
}

/**
 * Deserialize theme from JSON
 * 
 * @param json - JSON string
 * @throws {Error} if JSON is invalid
 */
export function deserializeTheme(json: string): Theme {
  try {
    return JSON.parse(json) as Theme;
  } catch (error) {
    throw new Error(`Failed to parse theme JSON: ${error}`);
  }
}

/**
 * Create CSS variables from design tokens
 * 
 * Converts design tokens to CSS custom properties
 * 
 * @param tokens - Design tokens
 * @param prefix - Prefix for CSS variables (default: '--')
 * @returns CSS variables object
 * 
 * @example
 * ```typescript
 * const cssVars = createCSSVariables(tokens);
 * // Result: { '--color-primary': '#0066cc', ... }
 * ```
 */
export function createCSSVariables(
  tokens: DesignTokens,
  prefix = '--'
): Record<string, string | number> {
  const vars: Record<string, string | number> = {};

  // Colors
  Object.entries(tokens.colors).forEach(([key, value]) => {
    if (value) vars[`${prefix}color-${camelToKebab(key)}`] = value;
  });

  // Typography
  Object.entries(tokens.typography.fontSize).forEach(([key, value]) => {
    vars[`${prefix}font-size-${key}`] = value;
  });
  
  vars[`${prefix}font-family-primary`] = tokens.typography.fontFamily.primary;
  if (tokens.typography.fontFamily.secondary) {
    vars[`${prefix}font-family-secondary`] = tokens.typography.fontFamily.secondary;
  }

  // Spacing
  Object.entries(tokens.spacing).forEach(([key, value]) => {
    vars[`${prefix}spacing-${key}`] = value;
  });

  // Radius
  Object.entries(tokens.radius).forEach(([key, value]) => {
    vars[`${prefix}radius-${key}`] = value;
  });

  // Shadows
  Object.entries(tokens.shadows).forEach(([key, value]) => {
    vars[`${prefix}shadow-${key}`] = value;
  });

  return vars;
}

/**
 * Convert camelCase to kebab-case
 */
function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}
