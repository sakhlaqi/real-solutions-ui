/**
 * Adapter Flex Component
 * 
 * Uses MUI Box with flexbox for all providers.
 * Internal implementation is deprecated in favor of MUI's Box component.
 */

import React from 'react';
import { Box } from '@mui/material';

export interface FlexProps {
  children?: React.ReactNode;
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: number | string;
  className?: string;
}

/**
 * Adaptive Flex Component
 * 
 * @example
 * ```tsx
 * <Flex direction="row" align="center" justify="space-between">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Flex>
 * ```
 */
export const Flex: React.FC<FlexProps> = ({
  children,
  direction = 'row',
  align = 'flex-start',
  justify = 'flex-start',
  wrap = 'nowrap',
  gap,
  className,
}) => {
  return (
    <Box
      display="flex"
      flexDirection={direction}
      alignItems={align}
      justifyContent={justify}
      flexWrap={wrap}
      gap={gap}
      className={className}
    >
      {children}
    </Box>
  );
};

Flex.displayName = 'AdapterFlex';
