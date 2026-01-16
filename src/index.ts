/**
 * Component Library - Main Export
 * 
 * A comprehensive, production-ready React UI component library
 * Built with React + TypeScript for modern web applications
 */

// ============================================================================
// BASE COMPONENTS
// ============================================================================
export * from './base';

// ============================================================================
// LAYOUT COMPONENTS (explicit exports to avoid Card duplicate)
// ============================================================================
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

// ============================================================================
// NAVIGATION COMPONENTS
// ============================================================================
export * from './navigation';

// ============================================================================
// FORM COMPONENTS
// ============================================================================
export * from './forms';

// ============================================================================
// BUTTON COMPONENTS
// ============================================================================
export * from './buttons';

// ============================================================================
// DATA DISPLAY COMPONENTS
// ============================================================================
export * from './data-display';

// ============================================================================
// FEEDBACK COMPONENTS
// ============================================================================
export * from './feedback';

// ============================================================================
// OVERLAY COMPONENTS
// ============================================================================
export * from './overlay';

// ============================================================================
// TYPOGRAPHY COMPONENTS
// ============================================================================
export * from './typography';

// ============================================================================
// UTILITY COMPONENTS
// ============================================================================
export * from './utility';

// ============================================================================
// MEDIA COMPONENTS
// ============================================================================
export * from './media';
