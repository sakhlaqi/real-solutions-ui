/**
 * Registry Module
 * 
 * Central registry system for safe JSON-driven rendering.
 * Provides type-safe access to components, templates, and behaviors.
 * 
 * @example
 * ```typescript
 * import { ComponentRegistry, TemplateRegistry, BehaviorRegistry } from './registry';
 * 
 * // Get a component
 * const MyComponent = ComponentRegistry['SearchGridComposite'];
 * 
 * // Get a template
 * const MyTemplate = TemplateRegistry['DashboardLayout'];
 * 
 * // Execute a behavior
 * BehaviorRegistry.navigateToPath('/dashboard');
 * ```
 */

// Import for local use in functions
import { 
  getComponentKeys as _getComponentKeys,
  type ComponentKey as _ComponentKey 
} from './ComponentRegistry';
import { 
  getTemplateKeys as _getTemplateKeys,
  type TemplateKey as _TemplateKey 
} from './TemplateRegistry';
import { 
  getBehaviorKeys as _getBehaviorKeys,
  type BehaviorKey as _BehaviorKey 
} from './BehaviorRegistry';

// Component Registry
export {
  ComponentRegistry,
  getComponent,
  hasComponent,
  getComponentKeys,
  validateComponentKey,
} from './ComponentRegistry';

export type {
  ComponentKey,
  RegisteredComponent,
} from './ComponentRegistry';

// Template Registry
export {
  TemplateRegistry,
  getTemplate,
  hasTemplate,
  getTemplateKeys,
  validateTemplateKey,
} from './TemplateRegistry';

export type {
  TemplateKey,
  RegisteredTemplate,
} from './TemplateRegistry';

// Behavior Registry
export {
  BehaviorRegistry,
  getBehavior,
  hasBehavior,
  getBehaviorKeys,
  validateBehaviorKey,
  executeBehavior,
} from './BehaviorRegistry';

export type {
  BehaviorKey,
  BehaviorHandler,
  RegisteredBehavior,
} from './BehaviorRegistry';

// Registry Types
export type {
  JsonNode,
  PageConfig,
  RegistryConfig,
  RenderContext,
  ValidationResult,
  ValidationError,
} from './types';

/**
 * All Registry Keys Combined
 * Useful for comprehensive validation
 */
export type RegistryKey = {
  component: _ComponentKey;
  template: _TemplateKey;
  behavior: _BehaviorKey;
};

/**
 * Registry Statistics
 * Get counts of registered items
 */
export function getRegistryStats() {
  return {
    components: _getComponentKeys().length,
    templates: _getTemplateKeys().length,
    behaviors: _getBehaviorKeys().length,
  };
}

/**
 * Validate entire registry configuration
 * Useful for debugging and testing
 */
export function validateRegistry(): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  try {
    // Validate component registry
    const componentKeys = _getComponentKeys();
    if (componentKeys.length === 0) {
      errors.push('ComponentRegistry is empty');
    }

    // Validate template registry
    const templateKeys = _getTemplateKeys();
    if (templateKeys.length === 0) {
      errors.push('TemplateRegistry is empty');
    }

    // Validate behavior registry
    const behaviorKeys = _getBehaviorKeys();
    if (behaviorKeys.length === 0) {
      errors.push('BehaviorRegistry is empty');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  } catch (error) {
    errors.push(`Registry validation failed: ${error}`);
    return {
      isValid: false,
      errors,
    };
  }
}
