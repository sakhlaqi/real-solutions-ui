import { ReactNode, CSSProperties } from 'react';

/**
 * Marketing Layout Slots
 * 
 * Designed for marketing websites with full-width sections,
 * optional sidebar, and prominent header/footer areas.
 */
export interface MarketingLayoutSlots {
  /** Header with navigation, logo, CTA buttons */
  header?: ReactNode;
  /** Main content area - typically full-width sections */
  main: ReactNode;
  /** Optional sidebar for navigation, filters, or secondary content */
  sidebar?: ReactNode;
  /** Footer with links, social media, newsletter signup */
  footer?: ReactNode;
}

/**
 * Marketing Layout Props
 */
export interface MarketingLayoutProps {
  /** Layout content slots */
  slots: MarketingLayoutSlots;
  /** Show/hide sidebar */
  sidebarVisible?: boolean;
  /** Sidebar position */
  sidebarPosition?: 'left' | 'right';
  /** Sidebar width in pixels */
  sidebarWidth?: number;
  /** Enable sticky header */
  stickyHeader?: boolean;
  /** Enable sticky sidebar */
  stickySidebar?: boolean;
  /** Maximum content width (for centered layouts) */
  maxWidth?: number | 'full';
  /** Additional className */
  className?: string;
  /** Custom styles */
  style?: CSSProperties;
  /** Test ID for testing */
  testId?: string;
}
