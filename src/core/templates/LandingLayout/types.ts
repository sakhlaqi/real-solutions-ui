import { ReactNode, CSSProperties } from 'react';

/**
 * Landing Layout Slots
 * 
 * Optimized for conversion-focused landing pages.
 * Simplified structure without sidebar distractions.
 */
export interface LandingLayoutSlots {
  /** Minimal header with logo and CTA */
  header?: ReactNode;
  /** Main content area - hero, features, testimonials, pricing */
  main: ReactNode;
  /** Footer with minimal links and legal info */
  footer?: ReactNode;
}

/**
 * Landing Layout Props
 */
export interface LandingLayoutProps {
  /** Layout content slots */
  slots: LandingLayoutSlots;
  /** Enable sticky header */
  stickyHeader?: boolean;
  /** Header transparency (for hero overlap) */
  transparentHeader?: boolean;
  /** Maximum content width */
  maxWidth?: number | 'full';
  /** Enable smooth scroll behavior */
  smoothScroll?: boolean;
  /** Additional className */
  className?: string;
  /** Custom styles */
  style?: CSSProperties;
  /** Test ID for testing */
  testId?: string;
}
