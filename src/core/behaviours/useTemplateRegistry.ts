/**
 * useTemplateRegistry Hook
 * 
 * Provides convenient access to template and section registries.
 * Enables template discovery, search, and marketplace features.
 */

import { useMemo, useCallback } from 'react';
import {
  templateRegistry,
  getTemplate,
  getTemplatesByCategory,
  searchTemplates,
  listTemplates,
} from '../registry/templateRegistry';
import {
  sectionRegistry,
  getSection,
  getSectionsByCategory,
  searchSections,
  listSections,
} from '../registry/sectionRegistry';

export interface TemplateRegistryHook {
  // Template methods
  getTemplate: (id: string, version?: string) => React.ComponentType<any> | null;
  getTemplatesByCategory: (category: string) => any[];
  searchTemplates: (query: string) => any[];
  listTemplates: () => any[];
  
  // Section methods
  getSection: (id: string, version?: string) => React.ComponentType<any> | null;
  getSectionsByCategory: (category: string) => any[];
  searchSections: (query: string) => any[];
  listSections: () => any[];
  
  // Stats
  templateCount: number;
  sectionCount: number;
}

/**
 * useTemplateRegistry
 * 
 * Hook for accessing template and section registries in React components.
 * 
 * @example
 * ```tsx
 * function TemplateMarketplace() {
 *   const { searchTemplates, searchSections } = useTemplateRegistry();
 *   const [query, setQuery] = useState('');
 *   
 *   const templates = useMemo(() => searchTemplates(query), [query]);
 *   const sections = useMemo(() => searchSections(query), [query]);
 *   
 *   return (
 *     <div>
 *       <SearchBar value={query} onChange={setQuery} />
 *       <TemplateGrid templates={templates} />
 *       <SectionGrid sections={sections} />
 *     </div>
 *   );
 * }
 * ```
 */
export function useTemplateRegistry(): TemplateRegistryHook {
  const templateCount = useMemo(() => {
    return templateRegistry.getStats().total;
  }, []);

  const sectionCount = useMemo(() => {
    return sectionRegistry.getStats().total;
  }, []);

  return {
    // Template methods
    getTemplate: useCallback(getTemplate, []),
    getTemplatesByCategory: useCallback(getTemplatesByCategory, []),
    searchTemplates: useCallback(searchTemplates, []),
    listTemplates: useCallback(listTemplates, []),
    
    // Section methods
    getSection: useCallback(getSection, []),
    getSectionsByCategory: useCallback(getSectionsByCategory, []),
    searchSections: useCallback(searchSections, []),
    listSections: useCallback(listSections, []),
    
    // Stats
    templateCount,
    sectionCount,
  };
}

/**
 * useTemplateCategories
 * 
 * Gets unique categories from template and section registries.
 */
export function useTemplateCategories(): {
  templateCategories: string[];
  sectionCategories: string[];
} {
  const templateCategories = useMemo(() => {
    const templates = listTemplates();
    const categories = new Set(templates.map((t) => t.metadata.category));
    return Array.from(categories).sort();
  }, []);

  const sectionCategories = useMemo(() => {
    const sections = listSections();
    const categories = new Set(sections.map((s) => s.metadata.category));
    return Array.from(categories).sort();
  }, []);

  return { templateCategories, sectionCategories };
}
