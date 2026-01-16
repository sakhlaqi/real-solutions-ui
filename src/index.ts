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
  Card,
  Tooltip,
  Badge,
  Avatar,
  Chip,
  Spinner,
  Slider,
  Switch,
  RadioGroup,
  Pagination,
  Autocomplete,
  Drawer,
  Menu,
  Stepper,
  Accordion,
  Dialog,
  AppBar,
  List,
  Divider,
  Textarea,
  BottomNavigation,
  Toolbar,
  SpeedDial,
  Popover,
  Backdrop,
  ButtonGroup,
  ToggleButton,
  Rating,
  Skeleton,
  LinearProgress,
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
// =================================, Drawer, Accordion - use adaptive versions)
export {
  Header,
  Footer,
  MainLayout,
  AdminLayout,
  AppShell,
  Sidebar,
  Container,
  Grid,
  GridItem,
  Flex,
  Section,
  Spacer,
  Paper,
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

// Navigation Components (excluding Breadcrumbs, Tabs, Pagination, Stepper, BottomNavigation, SpeedDial - use adaptive versions)
export {
  Navbar,
  DropdownMenu,
  ContextMenu,
} from './navigation';

export type {
  NavbarProps,
  TabsProps,
  PaginationProps,
  StepperProps,
} from './navigation';

// Form Components (excluding RadioGroup, Toggle, Slider, Autocomplete, Rating - use adaptive versions)
export {
  PasswordInput,
  EmailInput,
  NumberInput,
  TextareaAutosize,
  MultiSelect,
  TimePicker,
  DateTimePicker,
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
  FileUploadProps,
} from './forms';

// Button Components (excluding conflicts with adapters)
export {
  FloatingActionButton,
  LinkButton,
  SplitButton,
} from './buttons';

export type {
  FloatingActionButtonProps,
  LinkButtonProps,
  SplitButtonProps,
} from './buttons';

// Data Display Components (excluding Badge, Avatar, Tooltip, Chip, List - use adaptive versions)
export {
  ListItem,
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

// Feedback Components (excluding Alert, Snackbar, Spinner - use adaptive versions)
export {
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

// Overlay Components (excluding Modal, Dialog, Backdrop, Popover - use adaptive versions)
export {
  SlideOver,
  BottomSheet,
  Lightbox,
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

