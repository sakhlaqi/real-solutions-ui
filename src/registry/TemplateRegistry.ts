import React from 'react';

/**
 * Template Registry
 * 
 * Maps string keys to layout templates for safe JSON-driven rendering.
 * Only templates registered here can be referenced from JSON configurations.
 */

// Import templates
import { DashboardLayout } from '../core/templates/DashboardLayout';
import { TwoColumnLayout } from '../core/templates/TwoColumnLayout';
import { TabsLayout } from '../core/templates/TabsLayout';

/**
 * Template Registry Object
 * Maps template string keys to actual React components
 */
export const TemplateRegistry = {
  DashboardLayout,
  TwoColumnLayout,
  TabsLayout,
} as const;

/**
 * Template Registry Keys Type
 * Use this type to validate template keys in JSON configurations
 */
export type TemplateKey = keyof typeof TemplateRegistry;

/**
 * Template Type
 * Extracts the template type from the registry
 */
export type RegisteredTemplate<K extends TemplateKey> = typeof TemplateRegistry[K];

/**
 * Get template from registry
 * Returns the template if it exists, throws error otherwise
 */
export function getTemplate(key: string): React.ComponentType<any> {
  if (!(key in TemplateRegistry)) {
    throw new Error(`Template "${key}" not found in TemplateRegistry. Available templates: ${Object.keys(TemplateRegistry).join(', ')}`);
  }
  return TemplateRegistry[key as TemplateKey] as React.ComponentType<any>;
}

/**
 * Check if a template exists in the registry
 */
export function hasTemplate(key: string): key is TemplateKey {
  return key in TemplateRegistry;
}

/**
 * Get all available template keys
 */
export function getTemplateKeys(): TemplateKey[] {
  return Object.keys(TemplateRegistry) as TemplateKey[];
}

/**
 * Validate template key
 * Useful for runtime validation of JSON configurations
 */
export function validateTemplateKey(key: string): asserts key is TemplateKey {
  if (!hasTemplate(key)) {
    throw new Error(`Invalid template key: "${key}". Must be one of: ${getTemplateKeys().join(', ')}`);
  }
}
