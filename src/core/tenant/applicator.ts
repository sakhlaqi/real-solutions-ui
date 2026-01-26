/**
 * Override Applicator
 * 
 * Applies tenant overrides to templates and data at render time.
 */

import type { 
  TenantCustomization, 
  OverrideMap, 
  AppliedCustomization,
  ApplyOverridesOptions 
} from './types';
import { setValueAtPath, getValueAtPath } from './parser';
import { validateOverrides } from './validator';

/**
 * Deep clone an object (JSON serializable only)
 */
function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Apply tenant overrides to a template or data object
 * 
 * @param data - Original data to customize
 * @param customization - Tenant customization config
 * @param options - Application options
 * @returns Applied customization result
 */
export function applyTenantCustomization<T = any>(
  data: T,
  customization: TenantCustomization,
  options: ApplyOverridesOptions = {}
): AppliedCustomization<T> {
  const {
    validate = true,
    strict = false,
    schema,
    arrayMergeStrategy = 'replace',
  } = options;

  // Validate overrides if enabled
  if (validate && schema) {
    const validation = validateOverrides(customization.overrides, schema);
    
    if (!validation.valid) {
      if (strict) {
        throw new Error(
          `Tenant override validation failed:\n${validation.errors.map(e => `  - ${e.path}: ${e.message}`).join('\n')}`
        );
      } else {
        console.warn('Tenant override validation warnings:', validation.errors);
      }
    }
  }

  // Clone original data
  const customized = deepClone(data);
  const appliedPaths: string[] = [];

  // Apply each override
  for (const [path, value] of Object.entries(customization.overrides)) {
    try {
      setValueAtPath(customized, path, value);
      appliedPaths.push(path);
    } catch (error) {
      if (strict) {
        throw new Error(`Failed to apply override at path "${path}": ${error}`);
      } else {
        console.warn(`Failed to apply override at path "${path}":`, error);
      }
    }
  }

  return {
    original: data,
    customized,
    appliedPaths,
    tenant: {
      id: customization.tenantId,
      name: customization.tenantName,
    },
  };
}

/**
 * Apply overrides from a simple override map (without full TenantCustomization)
 * 
 * @param data - Original data
 * @param overrides - Override map
 * @param options - Application options
 * @returns Customized data
 */
export function applyOverrides<T = any>(
  data: T,
  overrides: OverrideMap,
  options: ApplyOverridesOptions = {}
): T {
  const customization: TenantCustomization = {
    tenantId: 'temp',
    tenantName: 'Temporary',
    baseTemplate: 'unknown',
    overrides,
  };

  const result = applyTenantCustomization(data, customization, options);
  return result.customized;
}

/**
 * Extract overrides from a customized object compared to original
 * 
 * @param original - Original data
 * @param customized - Customized data
 * @returns Override map
 */
export function extractOverrides<T = any>(original: T, customized: T): OverrideMap {
  const overrides: OverrideMap = {};

  function compareObjects(orig: any, cust: any, path: string[] = []): void {
    if (orig === cust) {
      return;
    }

    // Handle null/undefined
    if (orig === null || orig === undefined) {
      if (cust !== null && cust !== undefined) {
        overrides[path.join('.')] = cust;
      }
      return;
    }

    if (cust === null || cust === undefined) {
      overrides[path.join('.')] = cust;
      return;
    }

    // Handle primitives
    if (typeof orig !== 'object' || typeof cust !== 'object') {
      if (orig !== cust) {
        overrides[path.join('.')] = cust;
      }
      return;
    }

    // Handle arrays
    if (Array.isArray(orig) || Array.isArray(cust)) {
      if (JSON.stringify(orig) !== JSON.stringify(cust)) {
        overrides[path.join('.')] = cust;
      }
      return;
    }

    // Handle objects - compare each key
    const allKeys = new Set([...Object.keys(orig), ...Object.keys(cust)]);
    
    for (const key of allKeys) {
      compareObjects(orig[key], cust[key], [...path, key]);
    }
  }

  compareObjects(original, customized);
  return overrides;
}

/**
 * Merge multiple override maps (later overrides take precedence)
 * 
 * @param overrideMaps - Array of override maps
 * @returns Merged override map
 */
export function mergeOverrides(...overrideMaps: OverrideMap[]): OverrideMap {
  return Object.assign({}, ...overrideMaps);
}

/**
 * Filter overrides by path pattern
 * 
 * @param overrides - Override map
 * @param pattern - Path pattern (supports wildcards)
 * @returns Filtered override map
 */
export function filterOverridesByPattern(overrides: OverrideMap, pattern: string): OverrideMap {
  const filtered: OverrideMap = {};

  for (const [path, value] of Object.entries(overrides)) {
    // Simple pattern matching (could be enhanced with matchPath)
    if (path.startsWith(pattern.replace('**', '').replace('*', ''))) {
      filtered[path] = value;
    }
  }

  return filtered;
}
