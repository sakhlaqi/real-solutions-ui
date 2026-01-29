import React, { ReactNode, useMemo, useState, useEffect } from 'react';
import { getTemplate, hasTemplate } from '../registry/TemplateRegistry';
import { resolveTemplateAdapter, type UIProvider } from '../adapters';
import { validatePageConfig, type PageConfig } from '../schema';
import { renderNode } from './renderNode';
import type { RenderContext, RenderOptions, RenderError, RenderResult } from './types';
import { RenderContextProvider } from './RenderContext';
import type { AdapterWarning } from './AdapterWarnings';

/**
 * Render Page
 * 
 * Converts a JSON page configuration into a complete React page
 */

/**
 * Page Renderer Props
 */
export interface PageRendererProps {
  /** Page configuration (JSON or validated object) */
  config: PageConfig | string;
  
  /** Render options */
  options?: RenderOptions;
  
  /** Loading component */
  loading?: ReactNode;
  
  /** Error component */
  errorComponent?: React.ComponentType<{ error: Error; errors?: RenderError[] }>;
  
  /** Callback when rendering completes */
  onRenderComplete?: (result: RenderResult) => void;
  
  /** Callback when adapter warnings occur */
  onAdapterWarning?: (warning: AdapterWarning) => void;
  
  /** Show inline warnings in UI (default: false) */
  showInlineWarnings?: boolean;
}

/**
 * Default Error Component
 */
function DefaultErrorComponent({ error, errors = [] }: { error: Error; errors?: RenderError[] }) {
  return (
    <div
      style={{
        padding: '24px',
        margin: '24px',
        border: '2px solid #ff6b6b',
        borderRadius: '8px',
        backgroundColor: '#fff5f5',
        color: '#c92a2a',
      }}
    >
      <h2 style={{ margin: '0 0 16px 0' }}>❌ Page Render Error</h2>
      <div style={{ marginBottom: '16px' }}>
        <strong>Error:</strong> {error.message}
      </div>
      
      {errors.length > 0 && (
        <details>
          <summary style={{ cursor: 'pointer', marginBottom: '8px' }}>
            <strong>Render Errors ({errors.length})</strong>
          </summary>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            {errors.map((err, index) => (
              <li key={index} style={{ marginBottom: '8px' }}>
                <strong>{err.type}:</strong> {err.message}
                {err.key && <div>Component: <code>{err.key}</code></div>}
                {err.depth !== undefined && <div>Depth: {err.depth}</div>}
              </li>
            ))}
          </ul>
        </details>
      )}
      
      <details style={{ marginTop: '16px' }}>
        <summary style={{ cursor: 'pointer' }}>Stack Trace</summary>
        <pre style={{ 
          marginTop: '8px', 
          padding: '8px', 
          backgroundColor: '#f1f3f5',
          borderRadius: '4px',
          overflow: 'auto',
          fontSize: '12px',
        }}>
          {error.stack}
        </pre>
      </details>
    </div>
  );
}

/**
 * Page Renderer Component
 * 
 * Renders a complete page from JSON configuration
 */
export function PageRenderer({
  config,
  options = {},
  loading = <div>Loading page...</div>,
  errorComponent: ErrorComponent = DefaultErrorComponent,
  onRenderComplete,
  onAdapterWarning,
  showInlineWarnings = false,
}: PageRendererProps) {
  const [errors, setErrors] = useState<RenderError[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [adapterWarnings, setAdapterWarnings] = useState<AdapterWarning[]>([]);

  // Parse and validate config
  const validationResult = useMemo(() => {
    try {
      // Parse JSON if string
      const parsedConfig = typeof config === 'string' ? JSON.parse(config) : config;

      // Validate config
      return validatePageConfig(parsedConfig);
    } catch (error) {
      console.error('[PageRenderer] Failed to parse config:', error);
      return {
        success: false,
        errors: [{
          path: [],
          message: error instanceof Error ? error.message : 'Failed to parse configuration',
          code: 'PARSE_ERROR',
        }],
      };
    }
  }, [config]);

  // If validation failed, show validation errors
  if (!validationResult.success) {
    console.error('[PageRenderer] Validation failed:', validationResult.errors);
    const errorMessage = validationResult.errors?.map((e) => e.message).join(', ') || 'Unknown validation error';
    
    return (
      <div style={{ 
        padding: '24px', 
        color: '#c92a2a', 
        border: '2px solid #ff6b6b', 
        borderRadius: '8px',
        backgroundColor: '#fff5f5',
        margin: '16px' 
      }}>
        <h2 style={{ marginTop: 0 }}>❌ Page Configuration Validation Failed</h2>
        <p><strong>The following validation errors were found:</strong></p>
        <ul style={{ marginBottom: '16px' }}>
          {validationResult.errors?.map((err, idx) => (
            <li key={idx} style={{ marginBottom: '8px' }}>
              {err.path.length > 0 && <><code style={{ 
                backgroundColor: '#f1f3f5',
                padding: '2px 6px',
                borderRadius: '4px',
                marginRight: '8px'
              }}>{err.path.join('.')}</code></>}
              {err.message}
              {err.code && <span style={{ color: '#868e96', fontSize: '0.85em' }}> ({err.code})</span>}
            </li>
          ))}
        </ul>
        <details>
          <summary style={{ cursor: 'pointer', marginBottom: '8px' }}>View Raw Errors</summary>
          <pre style={{ 
            fontSize: '12px', 
            overflow: 'auto',
            backgroundColor: '#f8f9fa',
            padding: '12px',
            borderRadius: '4px',
            border: '1px solid #dee2e6'
          }}>
            {JSON.stringify(validationResult.errors, null, 2)}
          </pre>
        </details>
      </div>
    );
  }

  const pageConfig = validationResult.data!;

  // Error handler
  const handleError = (error: RenderError) => {
    setErrors((prev) => [...prev, error]);
    if (options.onError) {
      options.onError(error);
    }
  };

  // Render with error handling
  return (
    <PageRendererInternal
      config={pageConfig}
      options={{ ...options, onError: handleError }}
      errors={errors}
      warnings={warnings}
      ErrorComponent={ErrorComponent}
      onRenderComplete={onRenderComplete}
      onAdapterWarning={(warning) => {
        setAdapterWarnings(prev => [...prev, warning]);
        if (onAdapterWarning) {
          onAdapterWarning(warning);
        }
      }}
      adapterWarnings={adapterWarnings}
      showInlineWarnings={showInlineWarnings}
    />
  );
}

/**
 * Internal Page Renderer
 * Handles the actual rendering logic
 */
function PageRendererInternal({
  config,
  options,
  errors,
  warnings,
  ErrorComponent,
  onRenderComplete,
  onAdapterWarning,
  adapterWarnings,
  showInlineWarnings = false,
}: {
  config: PageConfig;
  options: RenderOptions;
  errors: RenderError[];
  warnings: string[];
  ErrorComponent: React.ComponentType<{ error: Error; errors?: RenderError[] }>;
  onRenderComplete?: (result: RenderResult) => void;
  onAdapterWarning?: (warning: AdapterWarning) => void;
  adapterWarnings: AdapterWarning[];
  showInlineWarnings?: boolean;
}) {
  const { debug = false } = options;

  // Render page
  const renderedPage = useMemo(() => {
    try {
      if (debug) {
        console.log('[PageRenderer] Rendering page with config:', config);
      }

      // Get provider from options or use default
      const provider: UIProvider = (options.provider as UIProvider) || 'mui';

      // Check if template exists
      if (!hasTemplate(config.template)) {
        throw new Error(`Template "${config.template}" not found in TemplateRegistry`);
      }

      // Use React.lazy for template adapter resolution
      const TemplateAdapter = React.lazy(async () => {
        const Adapter = await resolveTemplateAdapter(config.template, provider);
        if (!Adapter) {
          // Emit adapter warning
          if (onAdapterWarning) {
            onAdapterWarning({
              type: 'template-not-found',
              componentType: config.template,
              requestedProvider: provider,
              message: `Template adapter for "${config.template}" not found for provider "${provider}"`,
              timestamp: Date.now(),
            });
          }
          throw new Error(`Template adapter for "${config.template}" not found for provider "${provider}"`);
        }
        return { default: Adapter };
      });

      // Create render context
      const context: RenderContext = {
        depth: 0,
        maxDepth: options.maxDepth || 50,
        data: options.data || {},
        onError: options.onError,
        provider,
      };

      // Render slots
      const renderedSlots: Record<string, ReactNode> = {};
      Object.entries(config.slots).forEach(([slotName, slotContent]) => {
        if (debug) {
          console.log(`[PageRenderer] Rendering slot "${slotName}"`);
        }

        if (Array.isArray(slotContent)) {
          renderedSlots[slotName] = slotContent.map((node, index) =>
            renderNode(node, context, options)
          );
        } else {
          renderedSlots[slotName] = renderNode(slotContent, context, options);
        }
      });

      if (debug) {
        console.log('[PageRenderer] Slots rendered:', Object.keys(renderedSlots));
      }

      // Render template with slots using Suspense for async adapter loading
      return (
        <RenderContextProvider value={context}>
          <React.Suspense fallback={<div>Loading template...</div>}>
            <TemplateAdapter slots={renderedSlots} {...(config.templateProps || {})} />
          </React.Suspense>
        </RenderContextProvider>
      );
    } catch (error) {
      console.error('[PageRenderer] Render error:', error);
      throw error;
    }
  }, [config, options, debug]);

  // Notify completion
  useEffect(() => {
    if (onRenderComplete) {
      const result: RenderResult = {
        element: renderedPage,
        errors,
        warnings,
      };
      onRenderComplete(result);
    }
  }, [renderedPage, errors, warnings, onRenderComplete]);

  // Return rendered page or error
  try {
    return <>{renderedPage}</>;
  } catch (error) {
    return (
      <ErrorComponent
        error={error instanceof Error ? error : new Error('Unknown render error')}
        errors={errors}
      />
    );
  }
}

/**
 * Render Page from JSON
 * 
 * Utility function to render a page from JSON configuration
 * 
 * @param config - Page configuration
 * @param options - Render options
 * @returns Rendered React element
 */
export function renderPage(
  config: PageConfig | string,
  options: RenderOptions = {}
): ReactNode {
  return <PageRenderer config={config} options={options} />;
}

/**
 * Render Page Sync
 * 
 * Synchronously renders a page (for testing or server-side rendering)
 * 
 * @param config - Page configuration
 * @param options - Render options
 * @returns Rendered React element
 */
export function renderPageSync(
  config: PageConfig,
  options: RenderOptions = {}
): ReactNode {
  const { debug = false } = options;

  // Validate config
  const validation = validatePageConfig(config);
  if (!validation.success) {
    throw new Error(
      `Page configuration validation failed: ${validation.errors?.map((e) => e.message).join(', ')}`
    );
  }

  // Get template
  if (!hasTemplate(config.template)) {
    throw new Error(`Template "${config.template}" not found in TemplateRegistry`);
  }

  const Template = getTemplate(config.template);

  // Create context
  const context: RenderContext = {
    depth: 0,
    maxDepth: options.maxDepth || 50,
    data: options.data || {},
    onError: options.onError,
  };

  // Render slots
  const renderedSlots: Record<string, ReactNode> = {};
  Object.entries(config.slots).forEach(([slotName, slotContent]) => {
    if (Array.isArray(slotContent)) {
      renderedSlots[slotName] = slotContent.map((node) =>
        renderNode(node, context, options)
      );
    } else {
      renderedSlots[slotName] = renderNode(slotContent, context, options);
    }
  });

  // Render template
  return (
    <RenderContextProvider value={context}>
      <Template slots={renderedSlots} />
    </RenderContextProvider>
  );
}
