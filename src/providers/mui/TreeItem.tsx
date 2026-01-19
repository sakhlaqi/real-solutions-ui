/**
 * MUI TreeItem Provider Component
 * 
 * Individual tree item component for building custom tree structures.
 * Uses MUI X Tree View TreeItem.
 */

import React from 'react';
import { TreeItem as MuiTreeItem, TreeItemProps as MuiTreeItemProps } from '@mui/x-tree-view/TreeItem';

export interface TreeItemProps extends Omit<MuiTreeItemProps, 'nodeId'> {
  itemId: string;
  label: string;
  disabled?: boolean;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  sx?: any;
}

export const TreeItem: React.FC<TreeItemProps> = ({
  itemId,
  label,
  disabled,
  children,
  icon,
  className,
  sx,
  ...rest
}) => {
  return (
    <MuiTreeItem
      itemId={itemId}
      label={label}
      disabled={disabled}
      className={className}
      sx={sx}
      {...rest}
    >
      {children}
    </MuiTreeItem>
  );
};

TreeItem.displayName = 'MuiTreeItem';
