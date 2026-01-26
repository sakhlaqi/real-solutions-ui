/**
 * Core Registry Module
 * 
 * Centralized registry system for templates and sections.
 * Exports all registry types, utilities, and singleton instances.
 */

// Base registry
export { BaseRegistry } from './BaseRegistry';
export type {
  TemplateMetadata,
  BaseRegistryEntry,
  RegistryConfig,
  RegistryQueryOptions,
  RegistryStats,
  RegistryEntryStatus,
} from './types';

// Template registry
export {
  templateRegistry,
  registerTemplate,
  getTemplate,
  getTemplatesByCategory,
  getTemplatesByTag,
  searchTemplates,
  listTemplates,
  getTemplateStats,
} from './templateRegistry';
export type {
  TemplateComponent,
  TemplateRegistryEntry,
} from './templateRegistry';

// Section registry
export {
  sectionRegistry,
  registerSection,
  getSection,
  getSectionsByCategory,
  getSectionsByTag,
  searchSections,
  listSections,
  getSectionSchema,
  getSectionDefaultProps,
  getSectionStats,
} from './sectionRegistry';
export type {
  SectionComponent,
  SectionRegistryEntry,
} from './sectionRegistry';

// Legacy exports (for backward compatibility)
export { PageSectionRegistry } from './PageSectionRegistry';
export { WebsiteTemplateRegistry } from './WebsiteTemplateRegistry';
export type {
  PageSectionCategory,
  PageSectionProps,
  PageSectionSchema,
  PageSectionDefinition,
  PageSectionEntry,
  PageSectionInstance,
} from './page-section-types';
export type {
  WebsiteTemplateCategory,
  PageDefinition,
  NavigationConfig,
  WebsiteTemplateDefinition,
  WebsiteTemplateEntry,
  TenantTemplateInstance,
} from './website-template-types';
