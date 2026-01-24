/**
 * Behavior Registry
 * 
 * Maps string keys to behavior handlers for safe JSON-driven interactions.
 * Only behaviors registered here can be referenced from JSON configurations.
 */

// Import behaviors
import { 
  navigateToPath, 
  navigateBack, 
  openExternalLink 
} from '../core/behaviors/navigation';

import { 
  editRow, 
  deleteRow, 
  viewRowDetails, 
  exportRows, 
  refreshGrid 
} from '../core/behaviors/gridActions';

/**
 * Behavior Handler Type
 */
export type BehaviorHandler = (...args: any[]) => void | Promise<void>;

/**
 * Behavior Registry Object
 * Maps behavior string keys to handler functions
 */
export const BehaviorRegistry = {
  // Navigation Behaviors
  navigateToPath,
  navigateBack,
  openExternalLink,

  // Grid Action Behaviors
  editRow,
  deleteRow,
  viewRowDetails,
  exportRows,
  refreshGrid,
} as const;

/**
 * Behavior Registry Keys Type
 * Use this type to validate behavior keys in JSON configurations
 */
export type BehaviorKey = keyof typeof BehaviorRegistry;

/**
 * Behavior Type
 * Extracts the behavior handler type from the registry
 */
export type RegisteredBehavior<K extends BehaviorKey> = typeof BehaviorRegistry[K];

/**
 * Get behavior from registry
 * Returns the behavior handler if it exists, throws error otherwise
 */
export function getBehavior(key: string): BehaviorHandler {
  if (!(key in BehaviorRegistry)) {
    throw new Error(`Behavior "${key}" not found in BehaviorRegistry. Available behaviors: ${Object.keys(BehaviorRegistry).join(', ')}`);
  }
  return BehaviorRegistry[key as BehaviorKey] as BehaviorHandler;
}

/**
 * Check if a behavior exists in the registry
 */
export function hasBehavior(key: string): key is BehaviorKey {
  return key in BehaviorRegistry;
}

/**
 * Get all available behavior keys
 */
export function getBehaviorKeys(): BehaviorKey[] {
  return Object.keys(BehaviorRegistry) as BehaviorKey[];
}

/**
 * Validate behavior key
 * Useful for runtime validation of JSON configurations
 */
export function validateBehaviorKey(key: string): asserts key is BehaviorKey {
  if (!hasBehavior(key)) {
    throw new Error(`Invalid behavior key: "${key}". Must be one of: ${getBehaviorKeys().join(', ')}`);
  }
}

/**
 * Execute behavior with parameters
 * Safe execution wrapper that validates the behavior exists before calling
 */
export function executeBehavior(key: string, ...args: any[]): void | Promise<void> {
  validateBehaviorKey(key);
  const behavior = getBehavior(key);
  return behavior(...args);
}
