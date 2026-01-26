import { ReactNode, CSSProperties } from 'react';

/**
 * Blank Page Layout Slots
 * 
 * Minimal layout for maximum flexibility.
 * Single content slot with optional wrapper.
 */
export interface BlankPageLayoutSlots {
  /** Main content area - complete creative freedom */
  content: ReactNode;
}

/**
 * Blank Page Layout Props
 */
export interface BlankPageLayoutProps {
  /** Layout content slots */
  slots: BlankPageLayoutSlots;
  /** Apply base theme styles */
  applyTheme?: boolean;
  /** Apply minimum height (100vh) */
  fullHeight?: boolean;
  /** Maximum content width */
  maxWidth?: number | 'full';
  /** Apply padding to content */
  padding?: number | 'none';
  /** Additional className */
  className?: string;
  /** Custom styles */
  style?: CSSProperties;
  /** Test ID for testing */
  testId?: string;
}
