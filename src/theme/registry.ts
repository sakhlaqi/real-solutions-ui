/**
 * Theme Registry
 * 
 * Dynamic registry for themes loaded from API.
 * Provides a fallback theme for offline/error scenarios.
 * 
 * Note: Official theme presets are now stored in the API/database,
 * not hardcoded in the UI library. This ensures single source of truth.
 */

import type { Theme, ThemePreset } from './theme.types';
import { fallbackTheme } from './fallback';

/**
 * Theme registry metadata
 */
interface ThemeRegistryMeta {
  id: string;
  name: string;
  version: string;
  supportedModes: string[];
}

/**
 * Registered theme with metadata
 */
interface RegisteredTheme {
  theme: Theme;
  meta: ThemeRegistryMeta;
}

/**
 * Get supported modes for a theme
 */
function getSupportedModes(theme: Theme): string[] {
  if (!theme.modes) return [];
  return Object.keys(theme.modes).filter(key => theme.modes![key] !== undefined);
}

/**
 * Create registry metadata from theme
 */
function createRegistryMeta(theme: Theme): ThemeRegistryMeta {
  return {
    id: theme.meta.id,
    name: theme.meta.name,
    version: theme.meta.version,
    supportedModes: getSupportedModes(theme),
  };
}

/**
 * Mutable registry storage (populated dynamically from API)
 */
let registeredThemes: RegisteredTheme[] = [];

/**
 * Theme Registry
 * 
 * Dynamic registry that stores themes loaded from API.
 * Always includes a fallback theme for offline scenarios.
 */
export class ThemeRegistry {
  /**
   * Register a theme (typically loaded from API)
   */
  static register(theme: Theme): void {
    // Don't duplicate
    const existingIndex = registeredThemes.findIndex(rt => rt.meta.id === theme.meta.id);
    const registered: RegisteredTheme = {
      theme,
      meta: createRegistryMeta(theme),
    };
    
    if (existingIndex >= 0) {
      registeredThemes[existingIndex] = registered;
    } else {
      registeredThemes.push(registered);
    }
  }

  /**
   * Register multiple themes at once
   */
  static registerMany(themes: Theme[]): void {
    themes.forEach(theme => this.register(theme));
  }

  /**
   * Clear all registered themes (except fallback)
   */
  static clear(): void {
    registeredThemes = [];
  }

  /**
   * Get all registered themes
   */
  static getAll(): ReadonlyArray<RegisteredTheme> {
    return registeredThemes;
  }

  /**
   * Get all theme metadata (without full theme objects)
   */
  static getAllMeta(): ReadonlyArray<ThemeRegistryMeta> {
    return registeredThemes.map(rt => rt.meta);
  }

  /**
   * Get theme by ID
   * Returns fallback theme if not found
   */
  static getById(id: string): Theme {
    if (id === 'fallback') return fallbackTheme;
    
    const registered = registeredThemes.find(rt => rt.meta.id === id);
    return registered ? registered.theme : fallbackTheme;
  }

  /**
   * Get theme metadata by ID
   */
  static getMetaById(id: string): ThemeRegistryMeta | null {
    const registered = registeredThemes.find(rt => rt.meta.id === id);
    return registered ? registered.meta : null;
  }

  /**
   * Check if theme exists in registry
   */
  static has(id: string): boolean {
    return id === 'fallback' || registeredThemes.some(rt => rt.meta.id === id);
  }

  /**
   * Get fallback theme
   * Always available even when API is offline
   */
  static getFallback(): Theme {
    return fallbackTheme;
  }

  /**
   * Find themes by tag
   */
  static findByTag(tag: string): Theme[] {
    return registeredThemes
      .filter(rt => rt.theme.meta.tags?.includes(tag))
      .map(rt => rt.theme);
  }

  /**
   * Find themes by category
   */
  static findByCategory(category: string): Theme[] {
    return registeredThemes
      .filter(rt => rt.theme.meta.category === category)
      .map(rt => rt.theme);
  }

  /**
   * Get themes that support a specific mode
   */
  static findByMode(mode: string): Theme[] {
    return registeredThemes
      .filter(rt => rt.meta.supportedModes.includes(mode))
      .map(rt => rt.theme);
  }

  /**
   * Get summary of all themes
   */
  static getSummary(): string {
    if (registeredThemes.length === 0) {
      return 'No themes registered (using fallback)';
    }
    return registeredThemes
      .map(rt => {
        const modes = rt.meta.supportedModes.length > 0
          ? ` (${rt.meta.supportedModes.length} modes)`
          : '';
        return `${rt.meta.name} v${rt.meta.version}${modes}`;
      })
      .join('\n');
  }

  /**
   * Validate theme ID
   */
  static isValidId(id: string): boolean {
    return this.has(id);
  }

  /**
   * Get count of registered themes
   */
  static count(): number {
    return registeredThemes.length;
  }
}

/**
 * Export fallback theme
 */
export { fallbackTheme };

/**
 * Export type
 */
export type { RegisteredTheme, ThemeRegistryMeta };
