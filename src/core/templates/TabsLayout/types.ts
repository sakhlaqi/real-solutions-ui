import { ReactNode } from 'react';

/**
 * Base template slot interface
 */
export interface BaseSlots {
  [key: string]: ReactNode;
}

/**
 * Dashboard Layout Slots
 */
export interface DashboardLayoutSlots extends BaseSlots {
  /** Header content - typically navigation or page title */
  header?: ReactNode;
  /** Main content area */
  main: ReactNode;
  /** Sidebar content - optional navigation or filters */
  sidebar?: ReactNode;
  /** Footer content - optional */
  footer?: ReactNode;
}

/**
 * Two Column Layout Slots
 */
export interface TwoColumnLayoutSlots extends BaseSlots {
  /** Header content - spans full width */
  header?: ReactNode;
  /** Left column content */
  left: ReactNode;
  /** Right column content */
  right: ReactNode;
  /** Footer content - spans full width */
  footer?: ReactNode;
}

/**
 * Tabs Layout Slots
 */
export interface TabsLayoutSlots extends BaseSlots {
  /** Header content - above tabs */
  header?: ReactNode;
  /** Tab content - renders tab panels */
  tabs: Record<string, ReactNode>;
  /** Footer content - below tab panels */
  footer?: ReactNode;
}

/**
 * Layout template props base
 */
export interface BaseLayoutProps {
  /** Custom CSS class name */
  className?: string;
  /** Custom inline styles */
  style?: React.CSSProperties;
  /** Data test id for testing */
  testId?: string;
}

/**
 * Dashboard Layout Props
 */
export interface DashboardLayoutProps extends BaseLayoutProps {
  slots: DashboardLayoutSlots;
  /** Whether sidebar is visible */
  sidebarVisible?: boolean;
  /** Sidebar width in pixels */
  sidebarWidth?: number;
}

/**
 * Two Column Layout Props
 */
export interface TwoColumnLayoutProps extends BaseLayoutProps {
  slots: TwoColumnLayoutSlots;
  /** Left column width ratio (0-1) */
  leftWidth?: number;
  /** Gap between columns in pixels */
  gap?: number;
}

/**
 * Tabs Layout Props
 */
export interface TabsLayoutProps extends BaseLayoutProps {
  slots: TabsLayoutSlots;
  /** Active tab key */
  activeTab: string;
  /** Tab change handler */
  onTabChange: (tabKey: string) => void;
  /** Tab labels */
  tabLabels: Record<string, string>;
}
