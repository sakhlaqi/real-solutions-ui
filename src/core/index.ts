/**
 * Core Module Exports
 * 
 * Explicit exports to avoid conflicts with main index
 */

// Context exports
export { UIProvider, useUIContext, withUIProvider } from './context';

// Theme exports
export { createMUIThemeFromTokens } from './theme';
export * from './theme';

// Tenant customization exports
export * from './tenant';

// Template exports
export {
  DashboardLayout,
  TwoColumnLayout,
  TabsLayout,
} from './templates';

// Composite exports
export {
  SearchGridComposite,
  HeaderComposite,
  SidebarComposite,
} from './composites';

// Behavior exports
export * from './behaviors';
export * from './behaviours';

// Registry exports
export * from './registry';

// Template sections (JSON blueprints)
export * from './template-sections';

// Type exports (explicit to avoid UIProvider name conflict)
export type {
  UIProvider as UIProviderType,
  ThemeMode,
  ThemeConfig,
  Size,
  Variant,
  ColorVariant,
  BaseButtonProps,
  IconButtonProps,
  BaseInputProps,
  TextareaProps,
  SelectOption,
  SelectProps,
  CheckboxProps,
  Column,
  BaseTableProps,
  BaseModalProps,
  DialogProps,
  BaseAlertProps,
  SnackbarProps,
  ProgressProps,
  TabItem,
  BaseTabsProps,
  BreadcrumbItem,
  BreadcrumbsProps,
  BaseDatePickerProps,
  DatePickerProps,
  DesktopDatePickerProps,
  MobileDatePickerProps,
  StaticDatePickerProps,
  TimePickerProps,
  DesktopTimePickerProps,
  MobileTimePickerProps,
  StaticTimePickerProps,
  DateTimePickerProps,
  DesktopDateTimePickerProps,
  MobileDateTimePickerProps,
  StaticDateTimePickerProps,
  DateRange,
  DateRangePickerProps,
  DesktopDateRangePickerProps,
  MobileDateRangePickerProps,
  StaticDateRangePickerProps,
  TreeNode,
  BaseTreeViewProps,
  ChartDataPoint,
  ChartSeries,
  BaseChartProps,
  LineChartProps,
  BarChartProps,
  PieChartProps,
  ContainerProps,
  GridProps,
  PaperProps,
  TypographyProps,
  // Template types
  BaseSlots,
  DashboardLayoutSlots,
  TwoColumnLayoutSlots,
  TabsLayoutSlots,
  BaseLayoutProps,
  DashboardLayoutProps,
  TwoColumnLayoutProps,
  TabsLayoutProps,
  // Composite types
  ColumnDefinition,
  FilterDefinition,
  ActionDefinition,
  NavigationItem,
  FormFieldDefinition,
  SearchGridCompositeProps,
  HeaderCompositeProps,
  SidebarCompositeProps,
  FormCompositeProps,
} from './types';

