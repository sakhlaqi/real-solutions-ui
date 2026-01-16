/**
 * Adaptive List Component
 * 
 * Automatically switches between internal and MUI implementations based on UIProvider.
 */

import React from 'react';
import { useUIContext } from '../core/context';
import { List as InternalList } from '../data-display';
import { List as MUIList } from '../providers/mui';
import { List as RadixList } from '../providers/radix';

export interface ListProps {
  children: React.ReactNode;
  dense?: boolean;
  disablePadding?: boolean;
}

/**
 * Adaptive List Component
 * 
 * @example
 * ```tsx
 * <List>
 *   <ListItem>Item 1</ListItem>
 *   <ListItem>Item 2</ListItem>
 * </List>
 * ```
 */
export const List: React.FC<ListProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'mui') {
    return <MUIList {...props} />;
  }
  
  if (provider === 'radix') {
    return <RadixList {...props} />;
  }
  
  // Filter props not supported by internal
  const { dense, disablePadding, ...internalProps } = props;
  return <InternalList {...internalProps} />;
};

List.displayName = 'AdapterList';
