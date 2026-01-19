/**
 * Adapter Section Component
 * 
 * Uses MUI Box for all providers.
 * Internal implementation is deprecated in favor of MUI's Box component.
 */

import React from 'react';
import { Box } from '@mui/material';

export interface SectionProps {
  children?: React.ReactNode;
  as?: 'section' | 'div' | 'article' | 'aside';
  padding?: 'none' | 'small' | 'medium' | 'large';
  className?: string;
}

/**
 * Adaptive Section Component
 * 
 * @example
 * ```tsx
 * <Section padding="large">
 *   <h2>Section Title</h2>
 *   <p>Content</p>
 * </Section>
 * ```
 */
export const Section: React.FC<SectionProps> = ({
  children,
  as = 'section',
  padding = 'medium',
  className,
}) => {
  const paddingMap = {
    none: 0,
    small: 2,
    medium: 4,
    large: 6,
  };

  return (
    <Box
      component={as}
      p={paddingMap[padding]}
      className={className}
    >
      {children}
    </Box>
  );
};

Section.displayName = 'AdapterSection';
