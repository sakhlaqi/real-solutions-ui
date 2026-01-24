import React, { ReactNode } from 'react';
import { getComponent, hasComponent } from '../registry/ComponentRegistry';
import { executeBehavior, hasBehavior } from '../registry/BehaviorRegistry';
import { resolveComponentAdapter, hasComponentAdapter } from '../adapters';
import type { JsonNode } from '../schema';
import type { RenderContext, RenderError, RenderOptions } from './types';
import { createChildContext, isMaxDepthExceeded } from './RenderContext';

/**
 * Render Node
 * 
 * Recursively renders a JSON node into React components
 */

/**
 * Default Fallback Component
 * Displayed when a component is not found in the registry
 */
export function DefaultFallback({ type, props, error }: { type: string; props?: any; error?: RenderError }) {
  return (
    <div
      style={{
        padding: '16px',
        border: '2px dashed #ff6b6b',
        borderRadius: '8px',
        backgroundColor: '#fff5f5',
        color: '#c92a2a',
        fontFamily: 'monospace',
      }}
    >
      <strong>⚠️ Component Not Found</strong>
      <div style={{ marginTop: '8px', fontSize: '14px' }}>
        <div>Type: <code>{type}</code></div>
        {error && <div>Error: {error.message}</div>}
        {props && (
          <details style={{ marginTop: '8px' }}>
            <summary>Props</summary>
            <pre style={{ marginTop: '4px', fontSize: '12px' }}>
              {JSON.stringify(props, null, 2)}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}

/**
 * Process event handlers from JSON config
 */
function processEventHandlers(
  on: Record<string, any> | undefined,
  debug: boolean
): Record<string, any> {
  const processedProps: Record<string, any> = {};

  if (!on) {
    return processedProps;
  }

  Object.entries(on).forEach(([event, behaviorConfig]) => {
    const eventHandler = `on${event.charAt(0).toUpperCase()}${event.slice(1)}`;

    if (typeof behaviorConfig === 'string') {
      // Simple behavior key
      if (hasBehavior(behaviorConfig)) {
        processedProps[eventHandler] = (...args: any[]) => {
          try {
            executeBehavior(behaviorConfig, ...args);
          } catch (err) {
            if (debug) {
              console.error(`[Renderer] Error executing behavior "${behaviorConfig}":`, err);
            }
          }
        };
      } else if (debug) {
        console.warn(`[Renderer] Behavior not found: "${behaviorConfig}"`);
      }
    } else if (behaviorConfig && typeof behaviorConfig === 'object') {
      // Behavior with parameters
      const { behavior, params } = behaviorConfig;

      if (hasBehavior(behavior)) {
        processedProps[eventHandler] = (...args: any[]) => {
          try {
            executeBehavior(behavior, ...(params || []), ...args);
          } catch (err) {
            if (debug) {
              console.error(`[Renderer] Error executing behavior "${behavior}":`, err);
            }
          }
        };
      } else if (debug) {
        console.warn(`[Renderer] Behavior not found: "${behavior}"`);
      }
    }
  });

  return processedProps;
}

/**
 * Render a single JSON node to React (sync version for non-composites)
 * 
 * @param node - JSON node configuration
 * @param context - Render context
 * @param options - Render options
 * @returns React element
 */
export function renderNode(
  node: JsonNode,
  context: RenderContext = { depth: 0, provider: 'mui' },
  options: RenderOptions = {}
): ReactNode {
  const { debug = false, fallbackComponent: FallbackComponent = DefaultFallback } = options;

  // Check max depth
  if (isMaxDepthExceeded(context)) {
    const error: RenderError = {
      type: 'MAX_DEPTH_EXCEEDED',
      message: `Maximum render depth of ${context.maxDepth} exceeded`,
      depth: context.depth,
    };

    if (debug) {
      console.error('[Renderer] Max depth exceeded:', error);
    }

    if (options.onError) {
      options.onError(error);
    }

    return (
      <div style={{ color: 'red', padding: '8px', border: '1px solid red' }}>
        Max depth exceeded at depth {context.depth}
      </div>
    );
  }

  // Validate node structure
  if (!node || typeof node !== 'object') {
    const error: RenderError = {
      type: 'RENDER_ERROR',
      message: 'Invalid node: must be an object',
      depth: context.depth,
    };

    if (debug) {
      console.error('[Renderer] Invalid node:', node);
    }

    if (options.onError) {
      options.onError(error);
    }

    return null;
  }

  const { type, props = {}, children, on, key } = node;

  if (debug) {
    console.log(`[Renderer] Rendering node at depth ${context.depth}:`, { type, props });
  }

  // Check if component has an adapter
  const provider = context.provider || 'mui';
  const compositeTypes = ['SearchGridComposite', 'HeaderComposite', 'SidebarComposite'];
  const isComposite = compositeTypes.includes(type);

  if (isComposite) {
    // Use React Suspense for async adapter resolution
    const AdapterWrapper = React.lazy(async () => {
      const Adapter = await resolveComponentAdapter(type, provider as any);
      if (!Adapter) {
        throw new Error(`Adapter for "${type}" not found for provider "${provider}"`);
      }
      return { default: Adapter };
    });

    // Process event handlers
    const processedProps = processEventHandlers(on, debug);

    // Render children
    const childContext = createChildContext(context, type);
    const renderedChildren = children
      ? children.map((child) => renderNode(child, childContext, options))
      : undefined;

    return (
      <React.Suspense fallback={<div>Loading {type}...</div>}>
        <AdapterWrapper {...props} {...processedProps} key={key}>
          {renderedChildren}
        </AdapterWrapper>
      </React.Suspense>
    );
  }

  // Check if component exists in registry
  if (!hasComponent(type)) {
    const error: RenderError = {
      type: 'COMPONENT_NOT_FOUND',
      message: `Component "${type}" not found in ComponentRegistry`,
      key: type,
      depth: context.depth,
    };

    if (debug) {
      console.warn('[Renderer] Component not found:', type);
    }

    if (options.onError) {
      options.onError(error);
    }

    return <FallbackComponent type={type} props={props} error={error} key={key} />;
  }

  // Get component from registry
  let Component: React.ComponentType<any>;
  try {
    Component = getComponent(type);
  } catch (err) {
    const error: RenderError = {
      type: 'COMPONENT_NOT_FOUND',
      message: err instanceof Error ? err.message : 'Failed to get component',
      key: type,
      depth: context.depth,
      originalError: err instanceof Error ? err : undefined,
    };

    if (debug) {
      console.error('[Renderer] Error getting component:', err);
    }

    if (options.onError) {
      options.onError(error);
    }

    return <FallbackComponent type={type} props={props} error={error} key={key} />;
  }

  // Process event handlers using helper function
  const processedProps = { ...props, ...processEventHandlers(on, debug) };

  // Process children
  let renderedChildren: ReactNode = null;

  if (children) {
    const childContext = createChildContext(context, type);

    if (Array.isArray(children)) {
      // Array of child nodes
      renderedChildren = children.map((child, index) =>
        renderNode(child, childContext, options)
      );
    } else if (typeof children === 'object') {
      // Slots object - map slot names to rendered content
      const slots: Record<string, ReactNode> = {};
      Object.entries(children).forEach(([slotName, slotContent]) => {
        if (Array.isArray(slotContent)) {
          slots[slotName] = slotContent.map((child, index) =>
            renderNode(child, childContext, options)
          );
        } else {
          slots[slotName] = renderNode(slotContent, childContext, options);
        }
      });
      processedProps.slots = slots;
    }
  }

  // Render component
  try {
    return (
      <Component {...processedProps} key={key}>
        {renderedChildren}
      </Component>
    );
  } catch (err) {
    const error: RenderError = {
      type: 'RENDER_ERROR',
      message: err instanceof Error ? err.message : 'Component render error',
      key: type,
      depth: context.depth,
      originalError: err instanceof Error ? err : undefined,
    };

    if (debug) {
      console.error(`[Renderer] Error rendering component "${type}":`, err);
    }

    if (options.onError) {
      options.onError(error);
    }

    return <FallbackComponent type={type} props={props} error={error} key={key} />;
  }
}

/**
 * Render multiple nodes
 * 
 * @param nodes - Array of JSON nodes
 * @param context - Render context
 * @param options - Render options
 * @returns Array of React elements
 */
export function renderNodes(
  nodes: JsonNode[],
  context: RenderContext = { depth: 0 },
  options: RenderOptions = {}
): ReactNode[] {
  return nodes.map((node, index) =>
    renderNode(node, context, options)
  );
}
