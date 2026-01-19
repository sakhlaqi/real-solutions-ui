/**
 * Adaptive List Component
 * 
 * Uses MUI List for all providers.
 */

import React from 'react';
import { List as MUIList } from '../providers/mui';

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
  return <MUIList {...props} />;
};

List.displayName = 'AdapterList';
