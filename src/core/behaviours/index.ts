/**
 * Core Behaviours Module
 * 
 * Exports all behaviour hooks and utilities for template system.
 */

// Layout rendering
export {
  useLayoutRenderer,
  useLayoutFromJson,
} from './useLayoutRenderer';
export type {
  LayoutSection,
  LayoutConfig,
  LayoutRendererResult,
} from './useLayoutRenderer';

// Tenant theme
export {
  useTenantTheme,
  useThemeMode,
} from './useTenantTheme';
export type {
  TenantThemeConfig,
} from './useTenantTheme';

// Template registry
export {
  useTemplateRegistry,
  useTemplateCategories,
} from './useTemplateRegistry';
export type {
  TemplateRegistryHook,
} from './useTemplateRegistry';

// Re-export existing behaviors (from behaviors directory)
export * from '../behaviors/gridActions';
export * from '../behaviors/navigation';
