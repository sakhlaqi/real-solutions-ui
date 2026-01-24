/**
 * JSON → React Renderer
 * 
 * Public API for rendering JSON page configurations to React components
 */

// Types
export type {
  RenderContext,
  RenderOptions,
  RenderError,
  FallbackComponentProps,
} from './types';

// Page Renderer
export {
  PageRenderer,
  renderPage,
  renderPageSync,
} from './renderPage';

// Node Renderer
export {
  renderNode,
  renderNodes,
  DefaultFallback,
} from './renderNode';

// Context
export {
  RenderContextProvider,
  useRenderContext,
  useRenderDepth,
} from './RenderContext';

// Fallback Components
export {
  ComponentNotFound,
  TemplateNotFound,
  RenderErrorBoundary,
  MaxDepthExceeded,
} from './FallbackComponents';

export type {
  ComponentNotFoundProps,
  TemplateNotFoundProps,
} from './FallbackComponents';
