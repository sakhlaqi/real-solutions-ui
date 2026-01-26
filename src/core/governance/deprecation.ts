/**
 * Template Deprecation System
 * 
 * Handles deprecation warnings and lifecycle management
 */

import type { DeprecationNotice } from './versioning';
import { parseVersion, compareVersions } from './versioning';

/**
 * Deprecation severity
 */
export type DeprecationSeverity = 'info' | 'warning' | 'error';

/**
 * Deprecation handler
 */
export type DeprecationHandler = (notice: DeprecationNotice, context: any) => void;

/**
 * Deprecation registry
 */
export class DeprecationRegistry {
  private deprecations = new Map<string, DeprecationNotice[]>();
  private handlers: DeprecationHandler[] = [];
  private emittedWarnings = new Set<string>();

  /**
   * Register a deprecation
   */
  register(templateId: string, deprecation: DeprecationNotice): void {
    if (!this.deprecations.has(templateId)) {
      this.deprecations.set(templateId, []);
    }
    
    this.deprecations.get(templateId)!.push(deprecation);
  }

  /**
   * Register a deprecation handler
   */
  onDeprecation(handler: DeprecationHandler): void {
    this.handlers.push(handler);
  }

  /**
   * Check for deprecated properties
   */
  check(
    templateId: string,
    currentVersion: string,
    data: any,
    options: { once?: boolean } = {}
  ): DeprecationNotice[] {
    const templateDeprecations = this.deprecations.get(templateId) || [];
    const current = parseVersion(currentVersion);
    const found: DeprecationNotice[] = [];

    for (const deprecation of templateDeprecations) {
      const since = parseVersion(deprecation.since);
      
      // Only check if deprecated in current or earlier version
      if (compareVersions(current, since) !== 'less') {
        // Check if property exists in data
        if (hasNestedProperty(data, deprecation.path)) {
          found.push(deprecation);
          
          // Emit warning
          const warningKey = `${templateId}:${deprecation.path}`;
          if (!options.once || !this.emittedWarnings.has(warningKey)) {
            this.emit(deprecation, { templateId, currentVersion, data });
            this.emittedWarnings.add(warningKey);
          }
        }
      }
    }

    return found;
  }

  /**
   * Get all deprecations for a template
   */
  getDeprecations(templateId: string): DeprecationNotice[] {
    return this.deprecations.get(templateId) || [];
  }

  /**
   * Check if property is deprecated
   */
  isDeprecated(templateId: string, path: string, currentVersion: string): boolean {
    const deprecations = this.check(templateId, currentVersion, { [path]: true });
    return deprecations.some(d => d.path === path);
  }

  /**
   * Emit deprecation warning
   */
  private emit(notice: DeprecationNotice, context: any): void {
    // Call all handlers
    for (const handler of this.handlers) {
      handler(notice, context);
    }
  }

  /**
   * Clear emitted warnings cache
   */
  clearCache(): void {
    this.emittedWarnings.clear();
  }
}

/**
 * Global deprecation registry
 */
export const deprecationRegistry = new DeprecationRegistry();

/**
 * Default console deprecation handler
 */
deprecationRegistry.onDeprecation((notice, context) => {
  const message = formatDeprecationMessage(notice, context);
  
  if (notice.severity === 'error') {
    console.error(message);
  } else {
    console.warn(message);
  }
});

/**
 * Format deprecation message
 */
export function formatDeprecationMessage(notice: DeprecationNotice, context: any): string {
  const parts = [
    `[DEPRECATED] ${notice.path}`,
    `Deprecated since: ${notice.since}`,
    `Will be removed in: ${notice.removeIn}`,
    `Reason: ${notice.reason}`,
  ];
  
  if (notice.replacement) {
    parts.push(`Use instead: ${notice.replacement}`);
  }
  
  if (context.templateId) {
    parts.unshift(`Template: ${context.templateId}`);
  }
  
  return parts.join('\n  ');
}

/**
 * Create deprecation notice
 */
export function createDeprecation(
  path: string,
  since: string,
  removeIn: string,
  reason: string,
  options: {
    replacement?: string;
    severity?: DeprecationSeverity;
  } = {}
): DeprecationNotice {
  return {
    path,
    since,
    removeIn,
    reason,
    replacement: options.replacement,
    severity: options.severity === 'error' ? 'error' : 'warning',
  };
}

/**
 * Helper: Check if nested property exists
 */
function hasNestedProperty(obj: any, path: string): boolean {
  const keys = path.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (current === null || current === undefined || !(key in current)) {
      return false;
    }
    current = current[key];
  }
  
  return true;
}

/**
 * Deprecation decorator for functions
 */
export function deprecated(
  since: string,
  removeIn: string,
  message: string
): MethodDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function (...args: any[]) {
      console.warn(
        `[DEPRECATED] ${String(propertyKey)} is deprecated since ${since} and will be removed in ${removeIn}. ${message}`
      );
      return originalMethod.apply(this, args);
    };
    
    return descriptor;
  };
}
