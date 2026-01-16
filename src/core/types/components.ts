/**
 * Shared Component Interfaces
 * 
 * These interfaces define the common API contract for components
 * regardless of the underlying implementation (internal vs MUI).
 */

import React from 'react';

// ============================================================================
// BASE TYPES
// ============================================================================

export type Size = 'small' | 'medium' | 'large';
export type Variant = 'default' | 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info';
export type ColorVariant = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';

// ============================================================================
// BUTTON INTERFACES
// ============================================================================

export interface BaseButtonProps {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  variant?: 'contained' | 'outlined' | 'text';
  color?: ColorVariant;
  size?: Size;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export interface IconButtonProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  color?: ColorVariant;
  size?: Size;
  className?: string;
  'aria-label': string;
}

// ============================================================================
// INPUT INTERFACES
// ============================================================================

export interface BaseInputProps {
  value?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  helperText?: string;
  label?: string;
  fullWidth?: boolean;
  size?: Size;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  className?: string;
  id?: string;
  name?: string;
  autoComplete?: string;
}

export interface TextareaProps extends Omit<BaseInputProps, 'startAdornment' | 'endAdornment' | 'onChange'> {
  rows?: number;
  minRows?: number;
  maxRows?: number;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<BaseInputProps, 'startAdornment' | 'endAdornment' | 'onChange'> {
  options: SelectOption[];
  onChange?: (value: string | number) => void;
  multiple?: boolean;
}

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  label?: string;
  indeterminate?: boolean;
  color?: ColorVariant;
  size?: Size;
  className?: string;
}

// ============================================================================
// TABLE INTERFACES
// ============================================================================

export interface Column<T = any> {
  field: keyof T | string;
  headerName: string;
  width?: number;
  flex?: number;
  sortable?: boolean;
  filterable?: boolean;
  renderCell?: (row: T) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
}

export interface BaseTableProps<T = any> {
  columns: Column<T>[];
  rows: T[];
  loading?: boolean;
  error?: string;
  onRowClick?: (row: T) => void;
  pagination?: boolean;
  pageSize?: number;
  rowsPerPageOptions?: number[];
  checkboxSelection?: boolean;
  onSelectionChange?: (selectedRows: T[]) => void;
  className?: string;
}

// ============================================================================
// MODAL/DIALOG INTERFACES
// ============================================================================

export interface BaseModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  fullScreen?: boolean;
  actions?: React.ReactNode;
  className?: string;
}

export interface DialogProps extends BaseModalProps {
  cancelText?: string;
  confirmText?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  loading?: boolean;
}

// ============================================================================
// FEEDBACK INTERFACES
// ============================================================================

export interface BaseAlertProps {
  severity?: 'error' | 'warning' | 'info' | 'success';
  variant?: 'standard' | 'filled' | 'outlined';
  children: React.ReactNode;
  onClose?: () => void;
  title?: string;
  icon?: React.ReactNode;
  className?: string;
}

export interface SnackbarProps {
  open: boolean;
  onClose: () => void;
  message: string;
  severity?: 'error' | 'warning' | 'info' | 'success';
  autoHideDuration?: number;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}

export interface ProgressProps {
  value?: number;
  variant?: 'determinate' | 'indeterminate';
  color?: ColorVariant;
  size?: number;
  className?: string;
}

// ============================================================================
// NAVIGATION INTERFACES
// ============================================================================

export interface TabItem {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface BaseTabsProps {
  value: string | number;
  onChange: (value: string | number) => void;
  tabs: TabItem[];
  variant?: 'standard' | 'scrollable' | 'fullWidth';
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  maxItems?: number;
  className?: string;
}

// ============================================================================
// DATE PICKER INTERFACES
// ============================================================================

export interface BaseDatePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  label?: string;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  minDate?: Date;
  maxDate?: Date;
  format?: string;
  fullWidth?: boolean;
  className?: string;
}

export interface DateTimePickerProps extends BaseDatePickerProps {
  showTime?: boolean;
}

export interface TimePickerProps extends Omit<BaseDatePickerProps, 'minDate' | 'maxDate'> {
  minTime?: Date;
  maxTime?: Date;
}

// ============================================================================
// TREE VIEW INTERFACES
// ============================================================================

export interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface BaseTreeViewProps {
  nodes: TreeNode[];
  onNodeSelect?: (nodeId: string) => void;
  onNodeToggle?: (nodeId: string) => void;
  defaultExpanded?: string[];
  defaultSelected?: string;
  multiSelect?: boolean;
  className?: string;
}

// ============================================================================
// CHART INTERFACES
// ============================================================================

export interface ChartDataPoint {
  x: string | number | Date;
  y: number;
  label?: string;
}

export interface ChartSeries {
  name: string;
  data: ChartDataPoint[];
  color?: string;
}

export interface BaseChartProps {
  series: ChartSeries[];
  width?: number | string;
  height?: number | string;
  title?: string;
  loading?: boolean;
  className?: string;
}

export interface LineChartProps extends BaseChartProps {
  showGrid?: boolean;
  showLegend?: boolean;
  curve?: 'linear' | 'smooth';
}

export interface BarChartProps extends BaseChartProps {
  orientation?: 'vertical' | 'horizontal';
  showLegend?: boolean;
  stacked?: boolean;
}

export interface PieChartProps extends Omit<BaseChartProps, 'series'> {
  data: Array<{ label: string; value: number; color?: string }>;
  showLegend?: boolean;
  innerRadius?: number;
}

// ============================================================================
// LAYOUT INTERFACES
// ============================================================================

export interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  disableGutters?: boolean;
  className?: string;
}

export interface GridProps {
  children: React.ReactNode;
  container?: boolean;
  item?: boolean;
  spacing?: number;
  xs?: number | 'auto';
  sm?: number | 'auto';
  md?: number | 'auto';
  lg?: number | 'auto';
  xl?: number | 'auto';
  className?: string;
}

export interface PaperProps {
  children: React.ReactNode;
  elevation?: number;
  variant?: 'elevation' | 'outlined';
  square?: boolean;
  className?: string;
}

// ============================================================================
// TYPOGRAPHY INTERFACES
// ============================================================================

export interface TypographyProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption' | 'button' | 'overline';
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'textPrimary' | 'textSecondary';
  align?: 'left' | 'center' | 'right' | 'justify';
  gutterBottom?: boolean;
  noWrap?: boolean;
  className?: string;
  component?: React.ElementType;
}
