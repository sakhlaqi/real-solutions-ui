/**
 * useLayoutRenderer Hook
 * 
 * Renders layouts from JSON configuration using registered templates and sections.
 * Powers the JSON-driven page composition system.
 */

import { useMemo } from 'react';
import { getTemplate } from '../registry/templateRegistry';
import { getSection } from '../registry/sectionRegistry';

export interface LayoutSection {
  id: string;
  type: string;
  props?: Record<string, any>;
  version?: string;
}

export interface LayoutConfig {
  template?: {
    type: string;
    version?: string;
    props?: Record<string, any>;
  };
  sections: LayoutSection[];
  metadata?: {
    title?: string;
    description?: string;
    [key: string]: any;
  };
}

export interface LayoutRendererResult {
  Template: React.ComponentType<any> | null;
  sections: Array<{
    id: string;
    Component: React.ComponentType<any> | null;
    props: Record<string, any>;
  }>;
  metadata: Record<string, any>;
  errors: Array<{
    type: 'template' | 'section';
    id: string;
    message: string;
  }>;
}

/**
 * useLayoutRenderer
 * 
 * Resolves layout JSON into React components from registries.
 * 
 * @example
 * ```tsx
 * const layout = {
 *   template: { type: 'landing-basic' },
 *   sections: [
 *     { id: 'hero', type: 'hero-simple', props: { heading: 'Welcome' } },
 *     { id: 'features', type: 'features-grid', props: { items: [...] } },
 *   ],
 * };
 * 
 * const { Template, sections, errors } = useLayoutRenderer(layout);
 * 
 * return (
 *   <Template>
 *     {sections.map(({ id, Component, props }) => (
 *       <Component key={id} {...props} />
 *     ))}
 *   </Template>
 * );
 * ```
 */
export function useLayoutRenderer(config: LayoutConfig | null): LayoutRendererResult {
  return useMemo(() => {
    const result: LayoutRendererResult = {
      Template: null,
      sections: [],
      metadata: config?.metadata ?? {},
      errors: [],
    };

    if (!config) {
      result.errors.push({
        type: 'template',
        id: 'config',
        message: 'No layout configuration provided',
      });
      return result;
    }

    // Resolve template
    if (config.template) {
      const { type, version } = config.template;
      const Template = getTemplate(type, version);
      
      if (!Template) {
        result.errors.push({
          type: 'template',
          id: type,
          message: `Template "${type}" not found in registry`,
        });
      } else {
        result.Template = Template;
      }
    }

    // Resolve sections
    result.sections = config.sections.map((section) => {
      const Component = getSection(section.type, section.version);
      
      if (!Component) {
        result.errors.push({
          type: 'section',
          id: section.type,
          message: `Section "${section.type}" not found in registry`,
        });
      }

      return {
        id: section.id,
        Component,
        props: section.props ?? {},
      };
    });

    return result;
  }, [config]);
}

/**
 * useLayoutFromJson
 * 
 * Alias for useLayoutRenderer with JSON parsing support.
 */
export function useLayoutFromJson(json: string | LayoutConfig | null): LayoutRendererResult {
  const config = useMemo(() => {
    if (!json) return null;
    if (typeof json === 'string') {
      try {
        return JSON.parse(json) as LayoutConfig;
      } catch (error) {
        console.error('Failed to parse layout JSON:', error);
        return null;
      }
    }
    return json;
  }, [json]);

  return useLayoutRenderer(config);
}
