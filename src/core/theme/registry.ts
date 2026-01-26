/**
 * Theme Preset Registry
 * 
 * Central registry for theme presets with override support
 */

import type { ThemePreset, ThemeOverride, ResolvedTheme } from './types';

class ThemePresetRegistry {
  private presets = new Map<string, ThemePreset>();

  /**
   * Register a theme preset
   */
  register(preset: ThemePreset): void {
    this.presets.set(preset.id, preset);
  }

  /**
   * Get a theme preset by ID
   */
  get(id: string): ThemePreset | undefined {
    return this.presets.get(id);
  }

  /**
   * Get all registered presets
   */
  getAll(): ThemePreset[] {
    return Array.from(this.presets.values());
  }

  /**
   * Check if preset exists
   */
  has(id: string): boolean {
    return this.presets.has(id);
  }

  /**
   * Apply overrides to a preset (deep merge)
   */
  applyOverrides(presetId: string, overrides: ThemeOverride): ResolvedTheme | null {
    const preset = this.get(presetId);
    if (!preset) return null;

    return {
      ...preset,
      ...overrides,
      colors: {
        ...preset.colors,
        ...overrides.colors,
      },
      typography: {
        ...preset.typography,
        ...overrides.typography,
      },
      spacing: {
        ...preset.spacing,
        ...overrides.spacing,
      },
      radius: {
        ...preset.radius,
        ...overrides.radius,
      },
      shadows: {
        ...preset.shadows,
        ...overrides.shadows,
      },
      breakpoints: {
        ...preset.breakpoints,
        ...overrides.breakpoints,
      },
      overrides,
    };
  }

  /**
   * Create a preset variant with overrides
   */
  createVariant(baseId: string, variantId: string, overrides: ThemeOverride): boolean {
    const resolved = this.applyOverrides(baseId, overrides);
    if (!resolved) return false;

    const variant: ThemePreset = {
      ...resolved,
      id: variantId,
      name: overrides.name || `${resolved.name} (Variant)`,
      description: overrides.description || resolved.description,
      version: '1.0.0',
    };

    this.register(variant);
    return true;
  }

  /**
   * List presets by mode
   */
  getByMode(mode: 'light' | 'dark'): ThemePreset[] {
    return this.getAll().filter(p => p.mode === mode);
  }

  /**
   * List presets compatible with provider
   */
  getByProvider(provider: 'mui' | 'internal'): ThemePreset[] {
    return this.getAll().filter(p => p.providers?.[provider]);
  }
}

// Singleton instance
export const themePresetRegistry = new ThemePresetRegistry();
