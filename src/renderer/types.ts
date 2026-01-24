/**
 * Renderer Types
 * 
 * Type definitions for the JSON to React renderer
 */

import { ReactNode } from 'react';
import type { JsonNode, PageConfig } from '../schema';
import type { ComponentKey, TemplateKey, BehaviorKey } from '../registry';
import type { UIProvider } from '../adapters';

/**
 * Render Context
 * Passed down through the rendering tree
 */
export interface RenderContext {
  /** Current depth in the component tree */
  depth: number;
  
  /** Parent component key */
  parent?: string;
  
  /** Data context for dynamic values */
  data?: Record<string, any>;
  
  /** Behavior handlers */
  behaviors?: Record<string, (...args: any[]) => void>;
  
  /** Error handler for rendering errors */
  onError?: (error: RenderError) => void;
  
  /** Maximum depth to prevent infinite recursion */
  maxDepth?: number;
  
  /** Active UI provider for adapter resolution */
  provider?: UIProvider;
}

/**
 * Render Options
 * Configuration for the renderer
 */
export interface RenderOptions {
  /** Enable strict mode validation */
  strict?: boolean;
  
  /** Maximum component tree depth */
  maxDepth?: number;
  
  /** Enable debug mode with console logs */
  debug?: boolean;
  
  /** Custom error handler */
  onError?: (error: RenderError) => void;
  
  /** Fallback component for unknown types */
  fallbackComponent?: React.ComponentType<FallbackComponentProps>;
  
  /** Data context */
  data?: Record<string, any>;
  
  /** Active UI provider for adapter resolution */
  provider?: UIProvider;
}

/**
 * Render Error
 */
export interface RenderError {
  /** Error type */
  type: 'COMPONENT_NOT_FOUND' | 'TEMPLATE_NOT_FOUND' | 'RENDER_ERROR' | 'MAX_DEPTH_EXCEEDED' | 'INVALID_PROPS';
  
  /** Error message */
  message: string;
  
  /** Component or template key that caused the error */
  key?: string;
  
  /** Current depth when error occurred */
  depth?: number;
  
  /** Original error if available */
  originalError?: Error;
  
  /** Component path */
  path?: string[];
}

/**
 * Fallback Component Props
 */
export interface FallbackComponentProps {
  /** The component type that was not found */
  type: string;
  
  /** Props that were intended for the component */
  props?: Record<string, any>;
  
  /** Error that occurred */
  error?: RenderError;
}

/**
 * Render Result
 */
export interface RenderResult {
  /** Rendered React element */
  element: ReactNode;
  
  /** Any errors that occurred during rendering */
  errors: RenderError[];
  
  /** Warnings */
  warnings: string[];
}

/**
 * Slot Render Result
 */
export interface SlotRenderResult {
  /** Slot name */
  name: string;
  
  /** Rendered content */
  content: ReactNode;
  
  /** Errors for this slot */
  errors: RenderError[];
}
