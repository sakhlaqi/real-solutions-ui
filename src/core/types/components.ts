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
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';
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

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  label?: string;
  color?: ColorVariant;
  size?: Size;
  className?: string;
}

export interface RadioGroupProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{
    value: string;
    label: string;
    disabled?: boolean;
  }>;
  name?: string;
  disabled?: boolean;
  label?: string;
  row?: boolean;
  orientation?: 'horizontal' | 'vertical';
  size?: Size;
  className?: string;
}


export interface SliderProps {
  value?: number | number[];
  defaultValue?: number | number[];
  onChange?: (value: number | number[]) => void;
  onChangeCommitted?: (value: number | number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  marks?: boolean | Array<{ value: number; label?: string }>;
  disabled?: boolean;
  valueLabelDisplay?: 'on' | 'auto' | 'off';
  orientation?: 'horizontal' | 'vertical';
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
  label?: string;
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
  stickyHeader?: boolean;
  size?: Size;
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

// Alias for convenience
export type ModalProps = BaseModalProps;


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

// Alias for convenience
export type AlertProps = BaseAlertProps;


export interface SnackbarProps {
  open: boolean;
  onClose: () => void;
  message: string;
  severity?: 'error' | 'warning' | 'info' | 'success';
  autoHideDuration?: number;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  action?: React.ReactNode;
  className?: string;
}


export interface TooltipProps {
  title: string;
  children: React.ReactElement;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  arrow?: boolean;
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  className?: string;
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

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'circular' | 'rounded' | 'square';
  children?: React.ReactNode;
  className?: string;
}

export interface ChipProps {
  label: string;
  onDelete?: () => void;
  onClick?: () => void;
  variant?: 'filled' | 'outlined';
  color?: ColorVariant;
  size?: Size;
  icon?: React.ReactNode;
  avatar?: React.ReactNode;
  deleteIcon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}


export interface AccordionItem {
  id: string;
  title: string;
  summary?: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  defaultExpanded?: string | string[];
  multiple?: boolean;
  onChange?: (expandedIds: string | string[]) => void;
  className?: string;
}

export interface TabItem {
  label: string;
  value: string | number;
  content?: React.ReactNode;
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

// Alias for convenience - placed here to avoid duplicate with the one below

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

// Alias for convenience
export type TreeViewProps = BaseTreeViewProps;


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
  type?: 'line' | 'bar' | 'pie' | 'area';
  data?: any[];
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

// ============================================================================
// ADDITIONAL COMPONENT INTERFACES
// ============================================================================

export interface BadgeProps {
  children: React.ReactNode;
  badgeContent?: React.ReactNode;
  color?: ColorVariant;
  variant?: 'standard' | 'dot';
  size?: Size;
  max?: number;
  showZero?: boolean;
  invisible?: boolean;
  anchorOrigin?: {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'right';
  };
  className?: string;
}

export interface CardProps {
  children?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  media?: React.ReactNode;
  elevation?: number;
  variant?: 'elevation' | 'outlined';
  className?: string;
}

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'fullWidth' | 'inset' | 'middle';
  flexItem?: boolean;
  light?: boolean;
  className?: string;
}

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: React.ReactNode;
  anchor?: 'left' | 'right' | 'top' | 'bottom';
  variant?: 'permanent' | 'persistent' | 'temporary';
  className?: string;
}

export interface MenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  items: Array<{
    label: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    disabled?: boolean;
    divider?: boolean;
  }>;
  className?: string;
}

export interface ListProps {
  items: Array<{
    id: string | number;
    primary: string;
    secondary?: string;
    icon?: React.ReactNode;
    onClick?: () => void;
  }>;
  dense?: boolean;
  disablePadding?: boolean;
  className?: string;
}

export interface AppBarProps {
  children: React.ReactNode;
  position?: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative';
  color?: ColorVariant | 'default' | 'transparent';
  elevation?: number;
  className?: string;
}

export interface ToolbarProps {
  children: React.ReactNode;
  variant?: 'regular' | 'dense';
  disableGutters?: boolean;
  className?: string;
}

export interface BottomNavigationProps {
  value: number;
  onChange: (value: number) => void;
  showLabels?: boolean;
  children: React.ReactNode;
  className?: string;
}

export interface StepperProps {
  activeStep: number;
  steps: Array<{
    label: string;
    optional?: boolean;
    completed?: boolean;
  }>;
  orientation?: 'horizontal' | 'vertical';
  alternativeLabel?: boolean;
  className?: string;
}

export interface BackdropProps {
  open: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  invisible?: boolean;
  className?: string;
}

export interface SpeedDialProps {
  ariaLabel: string;
  icon: React.ReactNode;
  actions: Array<{
    icon: React.ReactNode;
    name: string;
    onClick: () => void;
    tooltipTitle?: string;
  }>;
  direction?: 'up' | 'down' | 'left' | 'right';
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  hidden?: boolean;
  className?: string;
}

export interface PopoverProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  children?: React.ReactNode;
  content?: React.ReactNode;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  anchorOrigin?: {
    vertical: 'top' | 'center' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
  transformOrigin?: {
    vertical: 'top' | 'center' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
  className?: string;
}

export interface ButtonGroupProps {
  children: React.ReactNode;
  variant?: 'contained' | 'outlined' | 'text';
  color?: ColorVariant;
  size?: Size;
  orientation?: 'horizontal' | 'vertical';
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
}

export interface ToggleButtonProps {
  value: string;
  selected?: boolean;
  onChange?: (value: string) => void;
  size?: Size;
  color?: ColorVariant;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export interface RatingProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number | null) => void;
  max?: number;
  precision?: number;
  readOnly?: boolean;
  disabled?: boolean;
  size?: Size;
  icon?: React.ReactNode;
  emptyIcon?: React.ReactNode;
  className?: string;
}

export interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: number | string;
  height?: number | string;
  animation?: 'pulse' | 'wave' | false;
  className?: string;
}

export interface LinearProgressProps {
  value?: number;
  variant?: 'determinate' | 'indeterminate';
  color?: ColorVariant;
  className?: string;
}

export interface PaginationProps {
  count: number;
  page: number;
  onChange: (page: number) => void;
  siblingCount?: number;
  boundaryCount?: number;
  disabled?: boolean;
  showFirstButton?: boolean;
  showLastButton?: boolean;
  size?: Size;
  color?: ColorVariant;
  className?: string;
}

export interface AutocompleteProps {
  options: Array<{ label: string; value: string | number }>;
  value?: string | number | null;
  onChange: (value: string | number | null) => void;
  label?: string;
  placeholder?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  multiple?: boolean;
  freeSolo?: boolean;
  loading?: boolean;
  className?: string;
}

export interface SpinnerProps {
  size?: Size;
  color?: ColorVariant;
  className?: string;
}

// Type aliases for convenience
export type TabsProps = BaseTabsProps;
export type DatePickerProps = BaseDatePickerProps;
export type ChartsProps = BaseChartProps;
export type TableProps = BaseTableProps;
