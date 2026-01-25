import { z } from 'zod';
import { 
  ComponentKey, 
  TemplateKey, 
  BehaviorKey,
  getComponentKeys,
  getTemplateKeys,
  getBehaviorKeys,
} from '../registry';

/**
 * Page Schema Definitions using Zod
 * 
 * Provides runtime validation and type inference for JSON page configurations.
 */

/**
 * Schema Version
 */
export const CURRENT_SCHEMA_VERSION = '1.0.0';

/**
 * Component Type Schema
 * Validates that the component type exists in ComponentRegistry
 */
export const ComponentTypeSchema = z.string().refine(
  (type) => getComponentKeys().includes(type as ComponentKey),
  {
    message: 'Component type not found in ComponentRegistry',
  }
);

/**
 * Template Type Schema
 * Validates that the template type exists in TemplateRegistry
 */
export const TemplateTypeSchema = z.string().refine(
  (type) => getTemplateKeys().includes(type as TemplateKey),
  {
    message: 'Template type not found in TemplateRegistry',
  }
);

/**
 * Behavior Key Schema
 * Validates that the behavior exists in BehaviorRegistry
 */
export const BehaviorKeySchema = z.string().refine(
  (key) => getBehaviorKeys().includes(key as BehaviorKey),
  {
    message: 'Behavior not found in BehaviorRegistry',
  }
);

/**
 * Props Schema
 * Accepts any valid JSON object for component props
 */
export const PropsSchema = z.record(z.string(), z.any()).optional();

/**
 * Event Handlers Schema
 * Maps event names to behavior keys
 */
export const EventHandlersSchema = z.record(
  z.string(),
  z.union([
    BehaviorKeySchema,
    z.object({
      behavior: BehaviorKeySchema,
      params: z.any().optional(),
    }),
  ])
).optional();

/**
 * JSON Node Schema (Recursive)
 * Represents a single component node in the page configuration
 */
export type JsonNodeSchema = z.ZodType<{
  type: string;
  props?: Record<string, any>;
  children?: JsonNode[] | Record<string, JsonNode | JsonNode[]>;
  on?: Record<string, any>;
  key?: string;
}>;

export const JsonNodeSchema: JsonNodeSchema = z.lazy(() =>
  z.object({
    /** Component type from ComponentRegistry */
    type: ComponentTypeSchema,
    
    /** Component props */
    props: PropsSchema,
    
    /** Children nodes or slots */
    children: z.union([
      z.array(JsonNodeSchema),
      z.record(z.string(), z.union([JsonNodeSchema, z.array(JsonNodeSchema)])),
    ]).optional(),
    
    /** Event handlers mapping to behaviors */
    on: EventHandlersSchema,
    
    /** Optional key for React reconciliation */
    key: z.string().optional(),
  })
);

/**
 * Slot Content Schema
 * A slot can contain a single node or array of nodes
 */
export const SlotContentSchema = z.union([
  JsonNodeSchema,
  z.array(JsonNodeSchema),
]);

/**
 * Slots Schema
 * Maps slot names to their content
 */
export const SlotsSchema = z.record(z.string(), SlotContentSchema);

/**
 * Page Metadata Schema
 */
export const PageMetadataSchema = z.object({
  /** Page title */
  title: z.string().optional(),
  
  /** Page description */
  description: z.string().optional(),
  
  /** Page author */
  author: z.string().optional(),
  
  /** Creation date */
  createdAt: z.string().datetime().optional(),
  
  /** Last modified date */
  updatedAt: z.string().datetime().optional(),
  
  /** Tags for categorization */
  tags: z.array(z.string()).optional(),
  
  /** Schema version */
  version: z.string().default(CURRENT_SCHEMA_VERSION),
});

/**
 * Data Source Configuration Schema
 */
export const DataSourceSchema = z.object({
  /** Data source identifier */
  id: z.string(),
  
  /** Data source type (api, mock, static) */
  type: z.enum(['api', 'mock', 'static']),
  
  /** Endpoint URL for API sources */
  endpoint: z.string().url().optional(),
  
  /** Static data */
  data: z.any().optional(),
  
  /** Transform function key */
  transform: z.string().optional(),
});

/**
 * Page Configuration Schema
 * Main schema for page JSON definitions
 */
export const PageConfigSchema = z.object({
  /** Page metadata */
  meta: PageMetadataSchema.optional(),
  
  /** Template key from TemplateRegistry */
  template: TemplateTypeSchema,
  
  /** Slot content for the template */
  slots: SlotsSchema,
  
  /** Global behaviors for the page */
  behaviors: z.record(z.string(), BehaviorKeySchema).optional(),
  
  /** Data sources configuration */
  dataSources: z.array(DataSourceSchema).optional(),
});

/**
 * Inferred Types
 */
export type JsonNode = z.infer<typeof JsonNodeSchema>;
export type SlotContent = z.infer<typeof SlotContentSchema>;
export type Slots = z.infer<typeof SlotsSchema>;
export type PageMetadata = z.infer<typeof PageMetadataSchema>;
export type DataSource = z.infer<typeof DataSourceSchema>;
export type PageConfig = z.infer<typeof PageConfigSchema>;

/**
 * Example Page Configuration
 */
export const examplePageConfig: PageConfig = {
  meta: {
    title: 'Employee Dashboard',
    description: 'Main dashboard for employee management',
    version: CURRENT_SCHEMA_VERSION,
  },
  template: 'DashboardLayout',
  slots: {
    header: {
      type: 'HeaderComposite',
      props: {
        title: 'Employees',
        subtitle: 'Manage your team',
      },
    },
    main: {
      type: 'SearchGridComposite',
      props: {
        dataSource: 'employees',
        columns: [
          { id: 'name', label: 'Name', field: 'name' },
          { id: 'email', label: 'Email', field: 'email' },
          { id: 'role', label: 'Role', field: 'role' },
        ],
      },
    },
    sidebar: {
      type: 'SidebarComposite',
      props: {
        items: [
          { id: 'dashboard', label: 'Dashboard', path: '/' },
          { id: 'employees', label: 'Employees', path: '/employees', active: true },
        ],
      },
    },
  },
};
