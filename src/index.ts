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
export { UIProvider, useUIContext, withUIProvider, useTokens } from './core/context';
export { createMUIThemeFromTokens } from './core/theme';

// Export theme system (types, schemas, utils, presets)
export * from './theme';

// Export core types without wildcard to avoid conflicts
export type {
  UIProvider as UIProviderType,
  ThemeMode,
  ThemeConfig,
  Size,
  Variant,
  ColorVariant,
} from './core/types';

// Export template & section type contracts (Phase 0A)
export type {
  // Template types
  TemplateCategory,
  TemplateTier,
  PageDefinition,
  PageSectionReference,
  TemplatePreset,
  TemplateOverride,
  ResolvedTemplate,
  // Section types
  SectionCategory,
  SectionSlot,
  SectionLayout,
  SectionJsonSchema,
  SectionDefinition,
  SectionInstance,
  SectionOverride,
  ResolvedSection,
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
  
  // Date & Time Pickers
  DatePicker,
  DesktopDatePicker,
  MobileDatePicker,
  StaticDatePicker,
  TimePicker,
  DesktopTimePicker,
  MobileTimePicker,
  StaticTimePicker,
  DateTimePicker,
  DesktopDateTimePicker,
  MobileDateTimePicker,
  StaticDateTimePicker,
  DateRangePicker,
  DesktopDateRangePicker,
  MobileDateRangePicker,
  StaticDateRangePicker,
  
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
  Typography,
  PasswordInput,
  EmailInput,
  NumberInput,
  Timeline,
  FloatingActionButton,
  LinkButton,
  SplitButton,
  MultiSelect,
  TransferList,
  FileUpload,
  TextareaAutosize,
  Toast,
  EmptyState,
  SlideOver,
  BottomSheet,
  Image,
  Carousel,
  Navbar,
  Flex,
  Stack,
  Box,
  Container,
  Paper,
  ErrorState,
  SuccessState,
  Lightbox,
  ImageGallery,
  Thumbnail,
  Heading,
  Text,
  DropdownMenu,
  ContextMenu,
  ImageList,
  Masonry,
  Section,
  Spacer,
  Form,
  Toggle,
  Kbd,
  Separator,
  Sheet,
} from './adapters';

// ============================================================================
// DIRECT PROVIDER ACCESS (Advanced Use)
// For explicit control over which implementation to use
// ============================================================================
export * as InternalComponents from './providers/internal';
export * as MUIComponents from './providers/mui';

// ============================================================================
// RENDERER & PAGE CONFIGURATION
// For JSON-to-React rendering and page configuration
// ============================================================================
export {
  PageRenderer,
  renderPage,
  renderPageSync,
  renderNode,
  renderNodes,
  RenderContextProvider,
  useRenderContext,
  useRenderDepth,
  ValidationErrorDisplay,
  ValidationSuccessDisplay,
  AdapterWarningsDisplay,
  ErrorWarningOverlay,
} from './renderer';

export type {
  PageRendererProps,
  RenderContext,
  RenderOptions,
  RenderError,
  FallbackComponentProps,
} from './renderer';

// ============================================================================
// SCHEMA & VALIDATION
// For page configuration schemas and validation
// ============================================================================
export {
  PageConfigSchema,
  validatePageConfig,
  getValidationSummary,
  validateJsonNode,
  safeParsePageConfig,
  assertValidPageConfig,
  validateOrThrow,
  SchemaUtils,
} from './schema';

export type {
  PageConfig,
  JsonNode,
  SlotContent,
  Slots,
  PageMetadata,
  DataSource,
  ValidationResult,
  ValidationError,
} from './schema';

// ============================================================================
// LEGACY EXPORTS (Backward Compatibility)
// Original internal components - direct imports
// Note: These may conflict with adaptive components above.
// Prefer using adaptive components or InternalComponents namespace.
// =================================, Drawer, Accordion - use adaptive versions)
// Layout Components (use adaptive versions from adapters)
// Note: Layout exports moved to adapters - import from adapters/[Component]
// export {
//   Header,
//   Footer,
//   MainLayout,
//   AdminLayout,
//   AppShell,
// } from './layout';

// export type {
//   HeaderProps,
//   FooterProps,
//   AppShellProps,
//   SpacerProps,
//   // Note: PaperProps, StackProps, ImageListProps moved to MUI - import from adapters
//   // Note: SidebarProps, FlexProps, SectionProps moved to MUI - import from adapters
// } from './layout';

// Navigation Components (use adaptive versions from adapters)
// Note: Navigation exports moved to adapters - import from adapters/[Component]
// export {} from './navigation';

// export type {
//   NavbarProps,
// } from './navigation';

// Form Components (use adaptive versions from adapters)
// Note: Form exports moved to adapters - import from adapters/[Component]
// export {} from './forms';

// export type {
//   FileUploadProps,
// } from './forms';

// Button Components (use adaptive versions from adapters)
// Note: Button exports moved to adapters - import from adapters/[Component]
// export {} from './buttons';

// export type {
//   FloatingActionButtonProps,
//   LinkButtonProps,
//   SplitButtonProps,
// } from './buttons';

// Data Display Components (excluding Badge, Avatar, Tooltip, Chip, List, ListItem, Tag, Timeline - use adaptive versions)
// Note: Data display exports moved to adapters - import from adapters/[Component]
// export {} from './data-display';

// Note: BadgeProps and TimelineProps are now exported from adapters
// Use these from @sakhlaqi/ui/adapters instead

// Feedback Components (excluding Alert, Snackbar, Spinner - use adaptive versions)
// Feedback Components (use adaptive versions from adapters)
// Note: Feedback exports moved to adapters - import from adapters/[Component]
// export {
//   useToast,
// } from './feedback';

// export type {
//   EmptyStateProps,
//   ErrorStateProps,
//   SuccessStateProps,
//   ToastProps,
// } from './feedback';

// Overlay Components (use adaptive versions from adapters)
// Note: SlideOverProps, BottomSheetProps, LightboxProps moved to MUI - import from adapters

// Typography Components (use adaptive versions from adapters)
// Note: Typography exports moved to adapters - import from adapters/[Component]
// export {} from './typography';

// export type {
//   HeadingProps,
//   TextProps,
// } from './typography';

// Utility Components
// Note: Utility exports moved to adapters - import from adapters/[Component]
// export {
//   ErrorBoundary,
//   Portal,
//   ThemeProvider,
//   ClickAwayListener,
//   CssBaseline,
//   NoSsr,
//   useMediaQuery,
//   ResponsiveWrapper,
//   VisibilityToggle,
//   FeatureFlagWrapper,
// } from './utility';

// export type {
//   PortalProps,
//   ThemeProviderProps,
//   ClickAwayListenerProps,
//   ResponsiveWrapperProps,
//   VisibilityToggleProps,
//   FeatureFlagWrapperProps,
// } from './utility';

// Media Components (use adaptive versions from adapters)
// Note: Media exports moved to adapters - import from adapters/[Component]
// export {} from './media';

// export type {
//   ImageProps,
//   CarouselProps,
//   ImageGalleryProps,
//   ThumbnailProps,
// } from './media';

// ============================================================================
// TEMPLATE MARKETPLACE SYSTEM
// ============================================================================
export {
  PageSectionRegistry,
  WebsiteTemplateRegistry,
  BaseRegistry,
  // New registry system
  templateRegistry,
  sectionRegistry,
  registerTemplate,
  registerSection,
  getTemplate,
  getSection,
  getSectionsByCategory,
  getTemplatesByCategory,
  searchTemplates,
  searchSections,
} from './core/registry';

export type {
  // Core registry types
  TemplateMetadata,
  RegistryEntryStatus,
  BaseRegistryEntry,
  RegistryConfig,
  RegistryQueryOptions,
  RegistryStats,
  // Page section types
  PageSectionCategory,
  PageSectionProps,
  PageSectionSchema,
  PageSectionDefinition,
  PageSectionEntry,
  PageSectionInstance,
  // Website template types
  WebsiteTemplateCategory,
  PageDefinition,
  NavigationConfig,
  WebsiteTemplateDefinition,
  WebsiteTemplateEntry,
  TenantTemplateInstance,
  // New registry types
  TemplateComponent,
  TemplateRegistryEntry,
  SectionComponent,
  SectionRegistryEntry,
} from './core/registry';

// ============================================================================
// LAYOUT TEMPLATES
// ============================================================================
export {
  // Application Layouts
  DashboardLayout,
  TwoColumnLayout,
  TabsLayout,
  // Marketing Layouts (Phase 3)
  MarketingLayout,
  LandingLayout,
  BlankPageLayout,
  // Layout Registration
  registerAllLayouts,
} from './core/templates';

export type {
  // Dashboard Layout
  DashboardLayoutProps,
  DashboardLayoutSlots,
  // Two Column Layout
  TwoColumnLayoutProps,
  TwoColumnLayoutSlots,
  // Tabs Layout
  TabsLayoutProps,
  TabsLayoutSlots,
  // Marketing Layout (Phase 3)
  MarketingLayoutProps,
  MarketingLayoutSlots,
  // Landing Layout (Phase 3)
  LandingLayoutProps,
  LandingLayoutSlots,
  // Blank Page Layout (Phase 3)
  BlankPageLayoutProps,
  BlankPageLayoutSlots,
} from './core/templates';