/**
 * Adapter Box Component
 * 
 * Uses MUI Box for all providers.
 * MUI Box provides a generic container with access to theme and sx prop.
 */

import React from 'react';
import { Box as MUIBox, MUIBoxProps as BoxProps } from '../providers/mui';

export type { BoxProps };

/**
 * Adaptive Box Component
 * 
 * @example
 * ```tsx
 * <Box padding="md" margin="sm" display="flex">
 *   Content
 * </Box>
 * ```
 */
export const Box: React.FC<BoxProps> = (props) => {
  return <MUIBox {...props} />;
};

Box.displayName = 'AdapterBox';
