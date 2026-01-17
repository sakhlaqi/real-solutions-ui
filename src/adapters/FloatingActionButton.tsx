/**
 * Adapter FloatingActionButton Component
 * 
 * Dynamically switches between internal, MUI, and Radix implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { FloatingActionButton as InternalFAB, FloatingActionButtonProps } from '../buttons';

/**
 * Adaptive FloatingActionButton Component
 * 
 * @example
 * ```tsx
 * <FloatingActionButton 
 *   icon={<AddIcon />}
 *   onClick={() => handleAdd()}
 *   position="bottom-right"
 * />
 * ```
 */
export const FloatingActionButton: React.FC<FloatingActionButtonProps> = (props) => {
  // FAB always uses internal implementation as it's a specialized component
  // with positioning logic that MUI/Radix handle differently
  return <InternalFAB {...props} />;
};

FloatingActionButton.displayName = 'AdapterFloatingActionButton';
