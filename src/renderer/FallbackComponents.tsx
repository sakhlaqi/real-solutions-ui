import React from 'react';
import type { RenderError } from './types';

/**
 * Fallback Components
 * 
 * Error boundaries and fallback components for graceful error handling
 */

/**
 * Component Not Found Props
 */
export interface ComponentNotFoundProps {
  type: string;
  props?: Record<string, any>;
  error?: RenderError;
}

/**
 * Component Not Found Fallback
 */
export function ComponentNotFound({ type, props, error }: ComponentNotFoundProps) {
  return (
    <div
      style={{
        padding: '16px',
        margin: '8px 0',
        border: '2px dashed #ffd43b',
        borderRadius: '8px',
        backgroundColor: '#fff9db',
        color: '#862e9c',
      }}
      role="alert"
      data-testid="component-not-found"
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
        <span style={{ fontSize: '20px', marginRight: '8px' }}>⚠️</span>
        <strong>Component Not Found</strong>
      </div>
      <div style={{ fontSize: '14px', fontFamily: 'monospace' }}>
        <div style={{ marginBottom: '4px' }}>
          Component: <code style={{ padding: '2px 4px', backgroundColor: '#fff', borderRadius: '3px' }}>{type}</code>
        </div>
        {error && (
          <div style={{ marginTop: '8px', color: '#c92a2a' }}>
            {error.message}
          </div>
        )}
      </div>
      {props && Object.keys(props).length > 0 && (
        <details style={{ marginTop: '12px' }}>
          <summary style={{ cursor: 'pointer', fontWeight: 600 }}>
            View Props
          </summary>
          <pre style={{
            marginTop: '8px',
            padding: '8px',
            backgroundColor: '#fff',
            borderRadius: '4px',
            overflow: 'auto',
            fontSize: '12px',
          }}>
            {JSON.stringify(props, null, 2)}
          </pre>
        </details>
      )}
    </div>
  );
}

/**
 * Template Not Found Props
 */
export interface TemplateNotFoundProps {
  template: string;
  error?: Error;
}

/**
 * Template Not Found Fallback
 */
export function TemplateNotFound({ template, error }: TemplateNotFoundProps) {
  return (
    <div
      style={{
        padding: '24px',
        margin: '24px',
        border: '3px solid #ff6b6b',
        borderRadius: '12px',
        backgroundColor: '#fff5f5',
        color: '#c92a2a',
        textAlign: 'center',
      }}
      role="alert"
      data-testid="template-not-found"
    >
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚫</div>
      <h2 style={{ margin: '0 0 16px 0', fontSize: '24px' }}>Template Not Found</h2>
      <div style={{ fontSize: '16px', fontFamily: 'monospace', marginBottom: '16px' }}>
        Template: <code style={{ 
          padding: '4px 8px', 
          backgroundColor: '#fff', 
          borderRadius: '4px',
          fontSize: '18px',
        }}>{template}</code>
      </div>
      {error && (
        <div style={{ 
          marginTop: '16px', 
          padding: '12px',
          backgroundColor: '#ffe0e0',
          borderRadius: '6px',
          fontSize: '14px',
        }}>
          <strong>Error:</strong> {error.message}
        </div>
      )}
    </div>
  );
}

/**
 * Render Error Boundary Props
 */
interface RenderErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error }>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

/**
 * Render Error Boundary State
 */
interface RenderErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

/**
 * Default Error Fallback
 */
function DefaultErrorFallback({ error }: { error: Error }) {
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
      role="alert"
      data-testid="render-error"
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
        <span style={{ fontSize: '32px', marginRight: '12px' }}>💥</span>
        <h2 style={{ margin: 0 }}>Render Error</h2>
      </div>
      <div style={{ marginBottom: '16px' }}>
        <strong>Message:</strong> {error.message}
      </div>
      <details>
        <summary style={{ cursor: 'pointer', fontWeight: 600 }}>Stack Trace</summary>
        <pre style={{
          marginTop: '8px',
          padding: '12px',
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
 * Render Error Boundary
 * 
 * Catches React errors during rendering
 */
export class RenderErrorBoundary extends React.Component<
  RenderErrorBoundaryProps,
  RenderErrorBoundaryState
> {
  constructor(props: RenderErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): RenderErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[RenderErrorBoundary] Caught error:', error, errorInfo);
    
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError && this.state.error) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error} />;
    }

    return this.props.children;
  }
}

/**
 * Max Depth Exceeded Fallback
 */
export function MaxDepthExceeded({ depth }: { depth: number }) {
  return (
    <div
      style={{
        padding: '12px',
        border: '2px solid #fd7e14',
        borderRadius: '6px',
        backgroundColor: '#fff4e6',
        color: '#d9480f',
        fontSize: '14px',
      }}
      role="alert"
      data-testid="max-depth-exceeded"
    >
      <strong>⚠️ Maximum Render Depth Exceeded</strong>
      <div style={{ marginTop: '4px' }}>
        Stopped at depth: {depth}
      </div>
      <div style={{ marginTop: '8px', fontSize: '12px' }}>
        This may indicate infinite recursion in your component tree.
      </div>
    </div>
  );
}
