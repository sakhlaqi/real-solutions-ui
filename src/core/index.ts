/**
 * Core Module Exports
 * 
 * Explicit exports to avoid conflicts with main index
 */

// Context exports
export { UIProvider, useUIContext, withUIProvider } from './context';

// Theme exports
export { getDesignTokens, applyCSSTokens, createMUITheme } from './theme';

// Type exports (explicit to avoid UIProvider name conflict)
export type {
  UIProvider as UIProviderType,
  ThemeMode,
  ThemeConfig,
  DesignTokens,
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
} from './types';

