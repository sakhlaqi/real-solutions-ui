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
export type { PageRendererProps } from './renderPage';

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

// Validation Display
export {
  ValidationErrorDisplay,
  ValidationSuccessDisplay,
  parseZodErrors,
} from './ValidationDisplay';

export type {
  ValidationError,
  ValidationDisplayProps,
  ValidationSuccessProps,
} from './ValidationDisplay';

// Adapter Warnings
export {
  AdapterWarningsDisplay,
  InlineAdapterWarning,
  AdapterWarningsBadge,
} from './AdapterWarnings';

export type {
  AdapterWarning,
  AdapterWarningsDisplayProps,
} from './AdapterWarnings';

// Error & Warning Overlay
export {
  ErrorWarningOverlay,
  InlineErrorBanner,
} from './ErrorWarningOverlay';

export type {
  ErrorWarningOverlayProps,
  InlineErrorBannerProps,
} from './ErrorWarningOverlay';

