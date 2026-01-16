/**
 * Component Library - Main Export
 * 
 * A comprehensive, production-ready React UI component library with dual-provider architecture.
 * Supports both internal components (default) and Material-UI components (opt-in).
 * 
 * @example
 * ```tsx
 * // Adaptive components (recommended) - automatically switch between providers
 * import { UIProvider, Button, Input, Table } from '@sakhlaqi/ui';
 * 
 * function App() {
 *   return (
 *     <UIProvider defaultProvider="internal">
 *       <Button>Click Me</Button>
 *     </UIProvider>
 *   );
 * }
 * 
 * // Switch to Material-UI globally
 * <UIProvider defaultProvider="mui">
 *   <Button>Material UI Button</Button>
 * </UIProvider>
 * 
 * // Or import specific implementations
 * import { InternalComponents, MUIComponents } from '@sakhlaqi/ui';
 * <InternalComponents.Button>Always Internal</InternalComponents.Button>
 * <MUIComponents.Button>Always MUI</MUIComponents.Button>
 * ```
 */

// ============================================================================
// CORE INFRASTRUCTURE (Provider, Context, Theme)
// ============================================================================
export { UIProvider, useUIContext, withUIProvider } from './core/context';
export { getDesignTokens, applyCSSTokens, createMUITheme } from './core/theme';

// Export core types without wildcard to avoid conflicts
export type {
  UIProvider as UIProviderType,
  ThemeMode,
  ThemeConfig,
  DesignTokens,
  Size,
  Variant,
  ColorVariant,
} from './core/types';

// ============================================================================
// ADAPTIVE COMPONENTS (Recommended API)
// These provide MUI-based implementations with consistent APIs
// ============================================================================
export {
  Button,
  IconButton,
  Input,
  Select,
  Checkbox,
  Table,
  DatePicker,
  TreeView,
  LineChart,
  BarChart,
  PieChart,
  Modal,
  Alert,
  Tabs,
  Breadcrumbs,
  Snackbar,
  Progress,
} from './adapters';

// ============================================================================
// DIRECT PROVIDER ACCESS (Advanced Use)
// For explicit control over which implementation to use
// ============================================================================
export * as InternalComponents from './providers/internal';
export * as MUIComponents from './providers/mui';

// ============================================================================
// LEGACY EXPORTS (Backward Compatibility)
// Original internal components - direct imports
// Note: These may conflict with adaptive components above.
// Prefer using adaptive components or InternalComponents namespace.
// ============================================================================

// Base Components
export * from './base';

// Layout Components
export {
  Header,
  Footer,
  MainLayout,
  AdminLayout,
  AppShell,
  Sidebar,
  Drawer,
  Container,
  Grid,
  GridItem,
  Flex,
  Section,
  Divider,
  Spacer,
  Card,
  Paper,
  Accordion,
  Stack,
  Box,
  ImageList,
  Masonry,
} from './layout';

export type {
  HeaderProps,
  FooterProps,
  AppShellProps,
  SidebarProps,
  DrawerProps,
  ContainerProps,
  GridProps,
  GridItemProps,
  FlexProps,
  SectionProps,
  DividerProps,
  SpacerProps,
  CardProps,
  PaperProps,
  AccordionProps,
  AccordionItemProps,
  StackProps,
  BoxProps,
  ImageListProps,
  ImageListItem,
  MasonryProps,
} from './layout';

// Navigation Components (excluding Breadcrumbs and Tabs - use adaptive versions)
export {
  Navbar,
  Pagination,
  Stepper,
  AppBar,
  BottomNavigation,
  DropdownMenu,
  ContextMenu,
  SpeedDial,
} from './navigation';

export type {
  NavbarProps,
  TabsProps,
  PaginationProps,
  StepperProps,
} from './navigation';

// Form Components (excluding conflicts with adapters)
export {
  PasswordInput,
  EmailInput,
  NumberInput,
  Textarea,
  TextareaAutosize,
  MultiSelect,
  Autocomplete,
  RadioGroup,
  Toggle,
  TimePicker,
  DateTimePicker,
  Rating,
  Slider,
  TransferList,
  FileUpload,
} from './forms';

export type {
  PasswordInputProps,
  EmailInputProps,
  NumberInputProps,
  AutocompleteProps,
  RadioGroupProps,
  ToggleProps,
  RatingProps,
  SliderProps,
  FileUploadProps,
} from './forms';

// Button Components (excluding conflicts with adapters)
export {
  ButtonGroup,
  FloatingActionButton,
  LinkButton,
  SplitButton,
  ToggleButton,
} from './buttons';

export type {
  ButtonGroupProps,
  FloatingActionButtonProps,
  LinkButtonProps,
  SplitButtonProps,
  ToggleButtonProps,
} from './buttons';

// Data Display Components (excluding conflicts with adapters)
export {
  Badge,
  Avatar,
  Tooltip,
  List,
  ListItem,
  Chip,
  Tag,
  Timeline,
} from './data-display';

export type {
  BadgeProps,
  AvatarProps,
  TooltipProps,
  ListProps,
  ListItemProps,
  ChipProps,
  TagProps,
  TimelineProps,
} from './data-display';

// Feedback Components (excluding Alert and Snackbar - use adaptive versions)
export {
  Spinner,
  ProgressBar,
  ProgressCircle,
  SkeletonLoader,
  EmptyState,
  ErrorState,
  SuccessState,
  Toast,
  useToast,
} from './feedback';

export type {
  AlertProps,
  SpinnerProps,
  ProgressBarProps,
  ProgressCircleProps,
  SkeletonLoaderProps,
  EmptyStateProps,
  ErrorStateProps,
  SuccessStateProps,
  ToastProps,
} from './feedback';

// Overlay Components (excluding Modal - use adaptive version)
export {
  Dialog,
  Backdrop,
  SlideOver,
  BottomSheet,
  Lightbox,
  Popover,
} from './overlay';

export type {
  ModalProps,
  BackdropProps,
  SlideOverProps,
  BottomSheetProps,
  LightboxProps,
  PopoverProps,
} from './overlay';

// Typography Components
export {
  Heading,
  Text,
} from './typography';

export type {
  HeadingProps,
  TextProps,
} from './typography';

// Utility Components
export {
  ErrorBoundary,
  Portal,
  ThemeProvider,
  ClickAwayListener,
  CssBaseline,
  NoSsr,
  useMediaQuery,
  ResponsiveWrapper,
  VisibilityToggle,
  FeatureFlagWrapper,
} from './utility';

export type {
  PortalProps,
  ThemeProviderProps,
  ClickAwayListenerProps,
  ResponsiveWrapperProps,
  VisibilityToggleProps,
  FeatureFlagWrapperProps,
} from './utility';

// Media Components
export {
  Image,
  Carousel,
  ImageGallery,
  Thumbnail,
} from './media';

export type {
  ImageProps,
  CarouselProps,
  ImageGalleryProps,
  ThumbnailProps,
} from './media';

