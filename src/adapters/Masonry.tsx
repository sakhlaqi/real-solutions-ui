/**
 * Adapter Masonry Component
 * 
 * Dynamically switches between internal, MUI, and Radix implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { Masonry as InternalMasonry, MasonryProps } from '../layout';

/**
 * Adaptive Masonry Component
 * 
 * @example
 * ```tsx
 * <Masonry columns={3} spacing={2}>
 *   {items.map(item => (
 *     <div key={item.id}>{item.content}</div>
 *   ))}
 * </Masonry>
 * ```
 */
export const Masonry: React.FC<MasonryProps> = (props) => {
  // Masonry always uses internal implementation
  return <InternalMasonry {...props} />;
};

Masonry.displayName = 'AdapterMasonry';
