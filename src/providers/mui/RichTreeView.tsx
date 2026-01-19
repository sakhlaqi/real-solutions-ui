/**
 * MUI RichTreeView Provider Component
 * 
 * An advanced tree view component with rich features like drag-and-drop,
 * virtualization, and more complex data structures.
 * Uses MUI X Tree View.
 */

import React from 'react';
import { RichTreeView as MuiRichTreeView } from '@mui/x-tree-view/RichTreeView';
import {
  ExpandMore as ExpandMoreIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';

export interface RichTreeViewItem {
  id: string;
  label: string;
  children?: RichTreeViewItem[];
  disabled?: boolean;
}

export interface RichTreeViewProps {
  items: RichTreeViewItem[];
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

export const RichTreeView: React.FC<RichTreeViewProps> = ({
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
    <MuiRichTreeView
      items={items}
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
    />
  );
};

RichTreeView.displayName = 'MuiRichTreeView';
