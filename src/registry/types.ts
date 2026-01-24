/**
 * Registry Types
 * 
 * Shared type definitions for the registry system
 */

import type { ComponentKey } from './ComponentRegistry';
import type { TemplateKey } from './TemplateRegistry';
import type { BehaviorKey } from './BehaviorRegistry';

/**
 * JSON Node Type
 * Represents a node in the JSON page configuration
 */
export interface JsonNode {
  /** Component or template key from registry */
  type: string;
  /** Component props */
  props?: Record<string, any>;
  /** Child nodes or slot content */
  children?: JsonNode[] | Record<string, JsonNode | JsonNode[]>;
  /** Behavior binding for events */
  on?: Record<string, string | BehaviorKey>;
}

/**
 * Page Configuration
 * Top-level JSON structure for a page
 */
export interface PageConfig {
  /** Page metadata */
  meta?: {
    title?: string;
    description?: string;
    version?: string;
  };
  /** Template key */
  template: TemplateKey;
  /** Slot content for the template */
  slots: Record<string, JsonNode | JsonNode[]>;
  /** Global behaviors for the page */
  behaviors?: Record<string, BehaviorKey>;
}

/**
 * Registry Configuration
 * Type-safe configuration for JSON rendering
 */
export interface RegistryConfig {
  components: typeof import('./ComponentRegistry').ComponentRegistry;
  templates: typeof import('./TemplateRegistry').TemplateRegistry;
  behaviors: typeof import('./BehaviorRegistry').BehaviorRegistry;
}

/**
 * Render Context
 * Context passed to the renderer
 */
export interface RenderContext {
  /** Current depth in the component tree */
  depth: number;
  /** Parent component key */
  parent?: string;
  /** Data context for dynamic values */
  data?: Record<string, any>;
}

/**
 * Validation Result
 */
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

/**
 * Validation Error
 */
export interface ValidationError {
  path: string;
  message: string;
  code: 'INVALID_TYPE' | 'INVALID_PROP' | 'INVALID_BEHAVIOR' | 'MISSING_REQUIRED' | 'UNKNOWN';
}
