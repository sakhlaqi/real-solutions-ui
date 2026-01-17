/**
 * Adapter Flex Component
 * 
 * Dynamically switches between internal, MUI, and Radix implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { Flex as InternalFlex, FlexProps } from '../layout';

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
export const Flex: React.FC<FlexProps> = (props) => {
  // Flex always uses internal implementation for consistent flexbox behavior
  return <InternalFlex {...props} />;
};

Flex.displayName = 'AdapterFlex';
