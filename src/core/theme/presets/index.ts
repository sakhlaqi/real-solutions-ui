/**
 * Theme Presets - Index
 * 
 * All theme presets and registration
 */

export * from './marketing-page';
export * from './landing-page';
export * from './blog';
export * from './auth';

import { marketingPagePreset } from './marketing-page';
import { landingPagePreset } from './landing-page';
import { blogPreset } from './blog';
import { authPreset } from './auth';
import { themePresetRegistry } from '../registry';

/**
 * Register all theme presets
 */
export function registerAllThemePresets(): void {
  themePresetRegistry.register(marketingPagePreset);
  themePresetRegistry.register(landingPagePreset);
  themePresetRegistry.register(blogPreset);
  themePresetRegistry.register(authPreset);

  console.log('✅ Theme presets registered:', themePresetRegistry.getAll().length);
}

// Auto-register on import
registerAllThemePresets();
