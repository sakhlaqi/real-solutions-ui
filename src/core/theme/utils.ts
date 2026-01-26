/**
 * Theme Utilities
 * 
 * JSON diff-based overrides and helper functions
 */

import type { ThemePreset, ThemeOverride, ResolvedTheme, ColorPalette } from './types';

/**
 * Deep merge two objects
 */
function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T {
  const output = { ...target };

  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      output[key] = deepMerge(
        output[key] || {},
        source[key] as any
      );
    } else if (source[key] !== undefined) {
      output[key] = source[key] as any;
    }
  }

  return output;
}

/**
 * Apply theme overrides using JSON diff
 * 
 * @example
 * ```ts
 * const customTheme = applyThemeOverrides(baseTheme, {
 *   colors: {
 *     primary: '#ff0000', // Only override primary color
 *   },
 *   typography: {
 *     h1: {
 *       fontSize: '4rem', // Only override h1 size
 *     },
 *   },
 * });
 * ```
 */
export function applyThemeOverrides(
  preset: ThemePreset,
  overrides: ThemeOverride
): ResolvedTheme {
  const resolved = deepMerge(preset, overrides) as ResolvedTheme;
  resolved.overrides = overrides;
  return resolved;
}

/**
 * Convert basic ThemeConfig to minimal overrides
 */
export function basicConfigToOverride(config: {
  mode?: 'light' | 'dark';
  primaryColor?: string;
  secondaryColor?: string;
  fontFamily?: string;
  borderRadius?: number;
  spacing?: number;
}): ThemeOverride {
  const overrides: ThemeOverride = {};

  if (config.mode) {
    overrides.mode = config.mode;
  }

  if (config.primaryColor || config.secondaryColor) {
    overrides.colors = {} as Partial<ColorPalette>;
    if (config.primaryColor) {
      (overrides.colors as any).primary = config.primaryColor;
    }
    if (config.secondaryColor) {
      (overrides.colors as any).secondary = config.secondaryColor;
    }
  }

  if (config.fontFamily) {
    overrides.typography = {
      fontFamily: config.fontFamily,
      fontSize: 16,
      fontWeight: 400,
    };
  }

  if (config.borderRadius !== undefined) {
    overrides.radius = {
      none: 0,
      sm: config.borderRadius,
      md: config.borderRadius * 2,
      lg: config.borderRadius * 3,
      xl: config.borderRadius * 4,
      full: 9999,
    };
  }

  if (config.spacing !== undefined) {
    overrides.spacing = {
      unit: config.spacing,
      xs: config.spacing * 0.5,
      sm: config.spacing,
      md: config.spacing * 2,
      lg: config.spacing * 3,
      xl: config.spacing * 4,
      '2xl': config.spacing * 6,
      '3xl': config.spacing * 8,
    };
  }

  return overrides;
}

/**
 * Extract JSON diff between two themes
 */
export function extractThemeDiff(
  base: ThemePreset,
  modified: ThemePreset
): ThemeOverride {
  const diff: ThemeOverride = {};

  // Compare colors
  if (JSON.stringify(base.colors) !== JSON.stringify(modified.colors)) {
    diff.colors = {} as Partial<ColorPalette>;
    for (const key in modified.colors) {
      if (base.colors[key as keyof typeof base.colors] !== modified.colors[key as keyof typeof modified.colors]) {
        (diff.colors as any)[key] = (modified.colors as any)[key];
      }
    }
  }

  // Compare typography
  if (JSON.stringify(base.typography) !== JSON.stringify(modified.typography)) {
    diff.typography = {} as any;
    for (const key in modified.typography) {
      if (JSON.stringify(base.typography[key as keyof typeof base.typography]) !== 
          JSON.stringify(modified.typography[key as keyof typeof modified.typography])) {
        diff.typography![key as keyof typeof diff.typography] = 
          modified.typography[key as keyof typeof modified.typography] as any;
      }
    }
  }

  // Compare other sections similarly
  if (JSON.stringify(base.spacing) !== JSON.stringify(modified.spacing)) {
    diff.spacing = modified.spacing;
  }
  if (JSON.stringify(base.radius) !== JSON.stringify(modified.radius)) {
    diff.radius = modified.radius;
  }
  if (JSON.stringify(base.shadows) !== JSON.stringify(modified.shadows)) {
    diff.shadows = modified.shadows;
  }
  if (JSON.stringify(base.breakpoints) !== JSON.stringify(modified.breakpoints)) {
    diff.breakpoints = modified.breakpoints;
  }

  return diff;
}

/**
 * Generate CSS custom properties from theme
 */
export function themeToCSSVariables(theme: ThemePreset): Record<string, string> {
  const vars: Record<string, string> = {};

  // Colors
  Object.entries(theme.colors).forEach(([key, value]) => {
    if (value) {
      vars[`--color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`] = value;
    }
  });

  // Spacing
  Object.entries(theme.spacing).forEach(([key, value]) => {
    vars[`--spacing-${key}`] = `${value}px`;
  });

  // Radius
  Object.entries(theme.radius).forEach(([key, value]) => {
    vars[`--radius-${key}`] = `${value}px`;
  });

  // Typography
  vars['--font-family'] = theme.typography.fontFamily;
  vars['--font-size-base'] = `${theme.typography.fontSize}px`;

  return vars;
}
