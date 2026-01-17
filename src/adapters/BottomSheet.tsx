/**
 * Adapter BottomSheet Component
 * 
 * Dynamically switches between internal, MUI, and Radix implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { BottomSheet as InternalBottomSheet, BottomSheetProps } from '../overlay';

/**
 * Adaptive BottomSheet Component
 * 
 * @example
 * ```tsx
 * <BottomSheet
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   snapPoints={[300, 600]}
 * >
 *   <div>Content</div>
 * </BottomSheet>
 * ```
 */
export const BottomSheet: React.FC<BottomSheetProps> = (props) => {
  // BottomSheet always uses internal implementation
  return <InternalBottomSheet {...props} />;
};

BottomSheet.displayName = 'AdapterBottomSheet';
