/**
 * MUI TreeView Adapter
 */

import React from 'react';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { BaseTreeViewProps, TreeNode } from '../../core/types';

const renderTree = (node: TreeNode) => (
  <TreeItem key={node.id} itemId={node.id} label={node.label} disabled={node.disabled}>
    {node.children?.map((child) => renderTree(child))}
  </TreeItem>
);

export const TreeView: React.FC<BaseTreeViewProps> = ({
  nodes,
  onNodeSelect,
  defaultExpanded = [],
  defaultSelected,
  multiSelect = false,
  className,
}) => {
  const handleSelectedItemsChange = (
    _event: React.SyntheticEvent | null,
    itemId: string | string[] | null
  ) => {
    if (itemId && typeof itemId === 'string' && onNodeSelect) {
      onNodeSelect(itemId);
    }
  };

  return (
    <SimpleTreeView
      defaultExpandedItems={defaultExpanded}
      defaultSelectedItems={defaultSelected}
      onSelectedItemsChange={handleSelectedItemsChange}
      multiSelect={multiSelect}
      className={className}
    >
      {nodes.map((node) => renderTree(node))}
    </SimpleTreeView>
  );
};

TreeView.displayName = 'MUITreeView';
