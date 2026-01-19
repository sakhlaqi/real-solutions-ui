/**
 * Adapter TreeItem Component
 * 
 * Uses MUI TreeItem for all providers.
 * Building block for creating custom tree structures.
 */

import React from 'react';
import { TreeItem as MuiTreeItem, TreeItemProps as MuiTreeItemProps } from '../providers/mui';

export interface TreeItemProps {
  itemId: string;
  label: string;
  disabled?: boolean;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  sx?: any;
}

/**
 * Adaptive TreeItem Component
 * 
 * Individual tree item component for building custom tree structures.
 * Use with SimpleTreeView for full control over tree rendering.
 * 
 * @example
 * ```tsx
 * <SimpleTreeView>
 *   <TreeItem itemId="1" label="Parent">
 *     <TreeItem itemId="1-1" label="Child 1" />
 *     <TreeItem itemId="1-2" label="Child 2" />
 *   </TreeItem>
 * </SimpleTreeView>
 * ```
 */
export const TreeItem: React.FC<TreeItemProps> = (props) => {
  return <MuiTreeItem {...props} />;
};

TreeItem.displayName = 'AdapterTreeItem';
