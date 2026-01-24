import React from 'react';

/**
 * UI Provider Type
 */
export type UIProvider = 'mui' | 'internal';

/**
 * Adapter Resolver
 * 
 * Dynamically resolves the correct adapter based on the active UI provider.
 * Ensures provider-specific implementations remain isolated.
 */

/**
 * Component Adapter Map
 * Maps component types to their adapter implementations per provider
 */
interface ComponentAdapterMap {
  [provider: string]: {
    [componentType: string]: React.ComponentType<any>;
  };
}

/**
 * Template Adapter Map
 * Maps template types to their adapter implementations per provider
 */
interface TemplateAdapterMap {
  [provider: string]: {
    [templateType: string]: React.ComponentType<any>;
  };
}

/**
 * Lazy-loaded adapter maps
 * Using dynamic imports to avoid circular dependencies and reduce bundle size
 */
let componentAdaptersCache: ComponentAdapterMap | null = null;
let templateAdaptersCache: TemplateAdapterMap | null = null;

/**
 * Load Component Adapters
 */
async function loadComponentAdapters(): Promise<ComponentAdapterMap> {
  if (componentAdaptersCache) {
    return componentAdaptersCache;
  }

  const [muiComposites, internalComposites] = await Promise.all([
    import('../mui/composites'),
    import('../internal/composites'),
  ]);

  componentAdaptersCache = {
    mui: {
      SearchGridComposite: muiComposites.SearchGridCompositeAdapter,
      HeaderComposite: muiComposites.HeaderCompositeAdapter,
      SidebarComposite: muiComposites.SidebarCompositeAdapter,
    },
    internal: {
      SearchGridComposite: internalComposites.SearchGridCompositeAdapter,
      HeaderComposite: internalComposites.HeaderCompositeAdapter,
      SidebarComposite: internalComposites.SidebarCompositeAdapter,
    },
  };

  return componentAdaptersCache;
}

/**
 * Load Template Adapters
 */
async function loadTemplateAdapters(): Promise<TemplateAdapterMap> {
  if (templateAdaptersCache) {
    return templateAdaptersCache;
  }

  const [muiTemplates, internalTemplates] = await Promise.all([
    import('../mui/templates'),
    import('../internal/templates'),
  ]);

  templateAdaptersCache = {
    mui: {
      DashboardLayout: muiTemplates.DashboardLayoutAdapter,
      TwoColumnLayout: muiTemplates.TwoColumnLayoutAdapter,
      TabsLayout: muiTemplates.TabsLayoutAdapter,
    },
    internal: {
      DashboardLayout: internalTemplates.DashboardLayoutAdapter,
      TwoColumnLayout: internalTemplates.TwoColumnLayoutAdapter,
      TabsLayout: internalTemplates.TabsLayoutAdapter,
    },
  };

  return templateAdaptersCache;
}

/**
 * Resolve Component Adapter
 * 
 * @param componentType - Component type (e.g., 'SearchGridComposite')
 * @param provider - UI provider ('mui' | 'internal')
 * @returns Component adapter or null if not found
 */
export async function resolveComponentAdapter(
  componentType: string,
  provider: UIProvider = 'mui'
): Promise<React.ComponentType<any> | null> {
  const adapters = await loadComponentAdapters();
  return adapters[provider]?.[componentType] || null;
}

/**
 * Resolve Template Adapter
 * 
 * @param templateType - Template type (e.g., 'DashboardLayout')
 * @param provider - UI provider ('mui' | 'internal')
 * @returns Template adapter or null if not found
 */
export async function resolveTemplateAdapter(
  templateType: string,
  provider: UIProvider = 'mui'
): Promise<React.ComponentType<any> | null> {
  const adapters = await loadTemplateAdapters();
  return adapters[provider]?.[templateType] || null;
}

/**
 * Check if Component Adapter Exists
 * 
 * @param componentType - Component type
 * @param provider - UI provider
 * @returns True if adapter exists
 */
export async function hasComponentAdapter(
  componentType: string,
  provider: UIProvider = 'mui'
): Promise<boolean> {
  const adapters = await loadComponentAdapters();
  return Boolean(adapters[provider]?.[componentType]);
}

/**
 * Check if Template Adapter Exists
 * 
 * @param templateType - Template type
 * @param provider - UI provider
 * @returns True if adapter exists
 */
export async function hasTemplateAdapter(
  templateType: string,
  provider: UIProvider = 'mui'
): Promise<boolean> {
  const adapters = await loadTemplateAdapters();
  return Boolean(adapters[provider]?.[templateType]);
}

/**
 * Get All Component Adapter Types
 * 
 * @param provider - UI provider
 * @returns Array of available component types
 */
export async function getComponentAdapterTypes(
  provider: UIProvider = 'mui'
): Promise<string[]> {
  const adapters = await loadComponentAdapters();
  return Object.keys(adapters[provider] || {});
}

/**
 * Get All Template Adapter Types
 * 
 * @param provider - UI provider
 * @returns Array of available template types
 */
export async function getTemplateAdapterTypes(
  provider: UIProvider = 'mui'
): Promise<string[]> {
  const adapters = await loadTemplateAdapters();
  return Object.keys(adapters[provider] || {});
}

/**
 * Clear Adapter Cache
 * 
 * Useful for testing or hot module replacement
 */
export function clearAdapterCache(): void {
  componentAdaptersCache = null;
  templateAdaptersCache = null;
}
