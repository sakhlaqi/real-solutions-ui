/**
 * Adapter Masonry Component
 * 
 * Uses MUI Lab Masonry for all providers.
 */

import React from 'react';
import { Masonry as MUIMasonry, MUIMasonryProps as MasonryProps } from '../providers/mui';

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
  return <MUIMasonry {...props} />;
};

Masonry.displayName = 'AdapterMasonry';
