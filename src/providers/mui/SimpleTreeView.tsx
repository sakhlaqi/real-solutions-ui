/**
 * MUI SimpleTreeView Provider Component
 * 
 * A simple tree view component for rendering hierarchical data.
 * Uses MUI X Tree View.
 */

import React from 'react';
import { SimpleTreeView as MuiSimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import {
  ExpandMore as ExpandMoreIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';

export interface SimpleTreeViewItem {
  id: string;
  label: string;
  children?: SimpleTreeViewItem[];
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface SimpleTreeViewProps {
  items: SimpleTreeViewItem[];
  defaultExpanded?: string[];
  defaultSelected?: string | string[];
  expanded?: string[];
  selected?: string | string[];
  multiSelect?: boolean;
  checkboxSelection?: boolean;
  disableSelection?: boolean;
  onNodeToggle?: (event: React.SyntheticEvent | null, nodeIds: string[]) => void;
  onNodeSelect?: (event: React.SyntheticEvent | null, nodeIds: string | string[] | null) => void;
  onNodeFocus?: (event: React.SyntheticEvent | null, nodeId: string) => void;
  className?: string;
  sx?: any;
}

const renderTreeItems = (items: SimpleTreeViewItem[]) => {
  return items.map((item) => (
    <TreeItem
      key={item.id}
      itemId={item.id}
      label={item.label}
      disabled={item.disabled}
    >
      {item.children && item.children.length > 0 && renderTreeItems(item.children)}
    </TreeItem>
  ));
};

export const SimpleTreeView: React.FC<SimpleTreeViewProps> = ({
  items,
  defaultExpanded,
  defaultSelected,
  expanded,
  selected,
  multiSelect = false,
  checkboxSelection = false,
  disableSelection = false,
  onNodeToggle,
  onNodeSelect,
  onNodeFocus,
  className,
  sx,
}) => {
  return (
    <MuiSimpleTreeView
      defaultExpandedItems={defaultExpanded}
      defaultSelectedItems={defaultSelected}
      expandedItems={expanded}
      selectedItems={selected}
      multiSelect={multiSelect}
      checkboxSelection={checkboxSelection}
      disableSelection={disableSelection}
      onExpandedItemsChange={onNodeToggle}
      onSelectedItemsChange={onNodeSelect}
      onItemFocus={onNodeFocus}
      className={className}
      sx={sx}
      slots={{
        expandIcon: ChevronRightIcon,
        collapseIcon: ExpandMoreIcon,
      }}
    >
      {renderTreeItems(items)}
    </MuiSimpleTreeView>
  );
};

SimpleTreeView.displayName = 'MuiSimpleTreeView';
