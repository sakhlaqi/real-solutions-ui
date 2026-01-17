/**
 * Adapter Stack Component
 * 
 * Dynamically switches between internal, MUI, and Radix implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { Stack as InternalStack, StackProps } from '../layout';

/**
 * Adaptive Stack Component
 * 
 * @example
 * ```tsx
 * <Stack spacing={16} direction="vertical">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Stack>
 * ```
 */
export const Stack: React.FC<StackProps> = (props) => {
  // Stack always uses internal implementation for consistent stacking behavior
  return <InternalStack {...props} />;
};

Stack.displayName = 'AdapterStack';
