import { ReactNode } from 'react';

/**
 * Common column definition for data grids
 */
export interface ColumnDefinition<T = any> {
  /** Column identifier */
  id: string;
  /** Column display label */
  label: string;
  /** Field name in the data object */
  field: keyof T | string;
  /** Column width */
  width?: number | string;
  /** Whether column is sortable */
  sortable?: boolean;
  /** Custom render function */
  render?: (value: any, row: T) => ReactNode;
  /** Column alignment */
  align?: 'left' | 'center' | 'right';
}

/**
 * Filter definition for search and filtering
 */
export interface FilterDefinition {
  /** Filter identifier */
  id: string;
  /** Filter label */
  label: string;
  /** Filter type */
  type: 'text' | 'select' | 'date' | 'number' | 'boolean';
  /** Filter field name */
  field: string;
  /** Options for select filters */
  options?: Array<{ label: string; value: any }>;
  /** Default value */
  defaultValue?: any;
}

/**
 * Action button definition
 */
export interface ActionDefinition {
  /** Action identifier */
  id: string;
  /** Action label */
  label: string;
  /** Action icon (optional) */
  icon?: ReactNode;
  /** Action handler */
  onClick: () => void;
  /** Whether action is disabled */
  disabled?: boolean;
  /** Action variant */
  variant?: 'text' | 'outlined' | 'contained';
  /** Action color */
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
}

/**
 * Navigation item for sidebars and menus
 */
export interface NavigationItem {
  /** Item identifier */
  id: string;
  /** Item label */
  label: string;
  /** Item icon (optional) */
  icon?: ReactNode;
  /** Navigation path */
  path?: string;
  /** Click handler (alternative to path) */
  onClick?: () => void;
  /** Whether item is active */
  active?: boolean;
  /** Whether item is disabled */
  disabled?: boolean;
  /** Child navigation items */
  children?: NavigationItem[];
  /** Badge content (e.g., notification count) */
  badge?: string | number;
}

/**
 * Breadcrumb item definition
 */
export interface BreadcrumbItem {
  /** Item label */
  label: string;
  /** Navigation path */
  path?: string;
  /** Click handler */
  onClick?: () => void;
}

/**
 * Search Grid Composite Props
 */
export interface SearchGridCompositeProps<T = any> {
  /** Data source identifier (for future API integration) */
  dataSource: string;
  /** Column definitions */
  columns: ColumnDefinition<T>[];
  /** Initial data */
  data?: T[];
  /** Filter definitions */
  filters?: FilterDefinition[];
  /** Whether search is enabled */
  searchEnabled?: boolean;
  /** Search placeholder text */
  searchPlaceholder?: string;
  /** Row actions */
  rowActions?: (row: T) => ActionDefinition[];
  /** Toolbar actions */
  toolbarActions?: ActionDefinition[];
  /** Selection mode */
  selectionMode?: 'none' | 'single' | 'multiple';
  /** Selection change handler */
  onSelectionChange?: (selectedRows: T[]) => void;
  /** Row click handler */
  onRowClick?: (row: T) => void;
  /** Loading state */
  loading?: boolean;
  /** Empty state message */
  emptyMessage?: string;
  /** Page size options */
  pageSizeOptions?: number[];
  /** Default page size */
  defaultPageSize?: number;
  /** Custom CSS class */
  className?: string;
  /** Test ID */
  testId?: string;
}

/**
 * Header Composite Props
 */
export interface HeaderCompositeProps {
  /** Page title */
  title: string;
  /** Subtitle or description */
  subtitle?: string;
  /** Breadcrumb items */
  breadcrumbs?: BreadcrumbItem[];
  /** Primary actions */
  actions?: ActionDefinition[];
  /** Whether to show back button */
  showBackButton?: boolean;
  /** Back button handler */
  onBack?: () => void;
  /** Custom content (right side) */
  children?: ReactNode;
  /** Custom CSS class */
  className?: string;
  /** Test ID */
  testId?: string;
}

/**
 * Sidebar Composite Props
 */
export interface SidebarCompositeProps {
  /** Navigation items */
  items: NavigationItem[];
  /** Sidebar header content */
  header?: ReactNode;
  /** Sidebar footer content */
  footer?: ReactNode;
  /** Whether sidebar is collapsible */
  collapsible?: boolean;
  /** Whether sidebar is collapsed */
  collapsed?: boolean;
  /** Collapse toggle handler */
  onCollapse?: (collapsed: boolean) => void;
  /** Navigation item click handler */
  onNavigate?: (item: NavigationItem) => void;
  /** Custom CSS class */
  className?: string;
  /** Test ID */
  testId?: string;
}

/**
 * Form Composite Props
 */
export interface FormCompositeProps {
  /** Form title */
  title?: string;
  /** Form fields configuration */
  fields: FormFieldDefinition[];
  /** Submit handler */
  onSubmit: (values: Record<string, any>) => void;
  /** Cancel handler */
  onCancel?: () => void;
  /** Initial values */
  initialValues?: Record<string, any>;
  /** Submit button label */
  submitLabel?: string;
  /** Cancel button label */
  cancelLabel?: string;
  /** Whether form is loading */
  loading?: boolean;
  /** Custom CSS class */
  className?: string;
  /** Test ID */
  testId?: string;
}

/**
 * Form field definition
 */
export interface FormFieldDefinition {
  /** Field name */
  name: string;
  /** Field label */
  label: string;
  /** Field type */
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'checkbox' | 'date' | 'textarea';
  /** Whether field is required */
  required?: boolean;
  /** Field placeholder */
  placeholder?: string;
  /** Options for select fields */
  options?: Array<{ label: string; value: any }>;
  /** Validation rules */
  validation?: {
    min?: number;
    max?: number;
    pattern?: RegExp;
    custom?: (value: any) => string | undefined;
  };
  /** Help text */
  helperText?: string;
  /** Whether field is disabled */
  disabled?: boolean;
}
