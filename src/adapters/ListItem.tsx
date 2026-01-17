/**
 * Adapter ListItem Component
 * 
 * Dynamically switches between internal, MUI, and Radix implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { ListItem as InternalListItem, ListItemProps } from '../data-display';

/**
 * Adaptive ListItem Component
 * 
 * Note: This component works with the List adapter and always uses
 * internal implementation for consistency.
 * 
 * @example
 * ```tsx
 * <List>
 *   <ListItem primary="Item 1" secondary="Description" />
 *   <ListItem primary="Item 2" icon={<Icon />} />
 * </List>
 * ```
 */
export const ListItem: React.FC<ListItemProps> = (props) => {
  // ListItem always uses internal implementation for consistency
  return <InternalListItem {...props} />;
};

ListItem.displayName = 'AdapterListItem';
