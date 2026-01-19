/**
 * Adapter Stack Component
 * 
 * Uses MUI Stack implementation.
 * Internal implementation is deprecated.
 */

import React from 'react';
import { Stack as MUIStack, MUIStackProps } from '../providers/mui';

export type StackProps = MUIStackProps;

/**
 * Adaptive Stack Component
 * 
 * @example
 * ```tsx
 * <Stack spacing={2} direction="row">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Stack>
 * ```
 */
export const Stack: React.FC<StackProps> = (props) => {
  return <MUIStack {...props} />;
};

Stack.displayName = 'AdapterStack';
