/**
 * Theme Presets
 * 
 * Theme presets are now stored in the API/database as the single source of truth.
 * This file exports only the fallback theme for offline/error scenarios.
 * 
 * To use official presets:
 * 1. Fetch themes from API endpoint: GET /api/tenants/themes/
 * 2. Register them with ThemeRegistry.registerMany(themes)
 * 3. Access via ThemeRegistry.getById(id)
 * 
 * The fallback theme is always available via ThemeRegistry.getFallback()
 */

export { fallbackTheme } from '../fallback';
