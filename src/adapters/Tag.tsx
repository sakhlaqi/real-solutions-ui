/**
 * Adapter Tag Component
 * 
 * Dynamically switches between internal, MUI, and Radix implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { useUIContext } from '../core/context';
import { Tag as InternalTag, TagProps } from '../data-display';
import { Chip as MUIChip } from '../providers/mui';
import { Chip as RadixChip } from '../providers/radix';

/**
 * Adaptive Tag Component
 * 
 * @example
 * ```tsx
 * <Tag label="New" variant="filled" color="success" />
 * ```
 */
export const Tag: React.FC<TagProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'mui') {
    return <MUIChip {...props as any} />;
  }
  
  if (provider === 'radix') {
    return <RadixChip {...props as any} />;
  }
  
  return <InternalTag {...props} />;
};

Tag.displayName = 'AdapterTag';
