/**
 * Adapter Box Component
 * 
 * Dynamically switches between internal, MUI, and Radix implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { Box as InternalBox, BoxProps } from '../layout';

/**
 * Adaptive Box Component
 * 
 * @example
 * ```tsx
 * <Box padding={16} margin={8}>
 *   Content
 * </Box>
 * ```
 */
export const Box: React.FC<BoxProps> = (props) => {
  // Box always uses internal implementation
  return <InternalBox {...props} />;
};

Box.displayName = 'AdapterBox';
