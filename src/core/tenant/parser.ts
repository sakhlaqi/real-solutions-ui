/**
 * Override Path Parser
 * 
 * Utilities for parsing and manipulating deep object paths using dot notation.
 */

import type { OverrideValue } from './types';

/**
 * Parse a dot-notation path into segments
 * 
 * @example
 * parseOverridePath('theme.colors.primary') // ['theme', 'colors', 'primary']
 * parseOverridePath('pages[0].sections.hero') // ['pages', '0', 'sections', 'hero']
 */
export function parseOverridePath(path: string): string[] {
  return path
    .replace(/\[(\d+)\]/g, '.$1') // Convert array notation to dot notation
    .split('.')
    .filter(Boolean);
}

/**
 * Get value at a deep path in an object
 * 
 * @param obj - Object to query
 * @param path - Dot-notation path
 * @returns Value at path, or undefined if not found
 */
export function getValueAtPath(obj: any, path: string): OverrideValue | undefined {
  const segments = parseOverridePath(path);
  let current = obj;

  for (const segment of segments) {
    if (current === null || current === undefined) {
      return undefined;
    }
    current = current[segment];
  }

  return current;
}

/**
 * Set value at a deep path in an object (mutates object)
 * Creates intermediate objects/arrays as needed
 * 
 * @param obj - Object to mutate
 * @param path - Dot-notation path
 * @param value - Value to set
 */
export function setValueAtPath(obj: any, path: string, value: OverrideValue): void {
  const segments = parseOverridePath(path);
  let current = obj;

  for (let i = 0; i < segments.length - 1; i++) {
    const segment = segments[i];
    const nextSegment = segments[i + 1];

    if (!(segment in current)) {
      // Create intermediate object or array
      current[segment] = /^\d+$/.test(nextSegment) ? [] : {};
    }

    current = current[segment];
  }

  const lastSegment = segments[segments.length - 1];
  current[lastSegment] = value;
}

/**
 * Check if a path exists in an object
 * 
 * @param obj - Object to check
 * @param path - Dot-notation path
 * @returns True if path exists
 */
export function pathExists(obj: any, path: string): boolean {
  const segments = parseOverridePath(path);
  let current = obj;

  for (const segment of segments) {
    if (current === null || current === undefined || !(segment in current)) {
      return false;
    }
    current = current[segment];
  }

  return true;
}

/**
 * Delete value at a deep path in an object (mutates object)
 * 
 * @param obj - Object to mutate
 * @param path - Dot-notation path
 * @returns True if value was deleted
 */
export function deleteValueAtPath(obj: any, path: string): boolean {
  const segments = parseOverridePath(path);
  let current = obj;

  for (let i = 0; i < segments.length - 1; i++) {
    const segment = segments[i];
    if (!(segment in current)) {
      return false;
    }
    current = current[segment];
  }

  const lastSegment = segments[segments.length - 1];
  if (lastSegment in current) {
    delete current[lastSegment];
    return true;
  }

  return false;
}

/**
 * Get all paths in an object (flattened)
 * 
 * @param obj - Object to flatten
 * @param prefix - Path prefix (used for recursion)
 * @returns Array of all paths
 */
export function getAllPaths(obj: any, prefix = ''): string[] {
  const paths: string[] = [];

  if (obj === null || obj === undefined) {
    return paths;
  }

  if (typeof obj !== 'object') {
    return [prefix];
  }

  for (const key in obj) {
    const path = prefix ? `${prefix}.${key}` : key;
    
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      paths.push(...getAllPaths(obj[key], path));
    } else {
      paths.push(path);
    }
  }

  return paths;
}

/**
 * Match paths against a pattern (supports wildcards)
 * 
 * @param path - Path to match
 * @param pattern - Pattern with wildcards (* for any segment, ** for any depth)
 * @returns True if path matches pattern
 * 
 * @example
 * matchPath('theme.colors.primary', 'theme.*.*') // true
 * matchPath('theme.colors.primary', 'theme.**') // true
 * matchPath('theme.colors.primary', 'pages.**') // false
 */
export function matchPath(path: string, pattern: string): boolean {
  const pathSegments = parseOverridePath(path);
  const patternSegments = parseOverridePath(pattern);

  let pathIdx = 0;
  let patternIdx = 0;

  while (pathIdx < pathSegments.length && patternIdx < patternSegments.length) {
    const pathSeg = pathSegments[pathIdx];
    const patternSeg = patternSegments[patternIdx];

    if (patternSeg === '**') {
      // ** matches any depth
      if (patternIdx === patternSegments.length - 1) {
        return true; // ** at end matches rest
      }
      // Try to match rest of pattern
      for (let i = pathIdx; i <= pathSegments.length; i++) {
        if (matchPath(pathSegments.slice(i).join('.'), patternSegments.slice(patternIdx + 1).join('.'))) {
          return true;
        }
      }
      return false;
    } else if (patternSeg === '*' || patternSeg === pathSeg) {
      // * matches single segment, or exact match
      pathIdx++;
      patternIdx++;
    } else {
      return false;
    }
  }

  return pathIdx === pathSegments.length && patternIdx === patternSegments.length;
}
