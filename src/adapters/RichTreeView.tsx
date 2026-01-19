/**
 * Adapter RichTreeView Component
 * 
 * Uses MUI RichTreeView for all providers.
 * Provides an advanced interface for rendering complex hierarchical tree structures.
 */

import React from 'react';
import {
  RichTreeView as MuiRichTreeView,
  RichTreeViewProps as MuiRichTreeViewProps,
  RichTreeViewItem,
} from '../providers/mui';

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

/**
 * Adaptive RichTreeView Component
 * 
 * An advanced tree view for displaying complex hierarchical data with rich features.
 * Better performance for large datasets compared to SimpleTreeView.
 * 
 * @example
 * ```tsx
 * const items = [
 *   {
 *     id: '1',
 *     label: 'Documents',
 *     children: [
 *       { id: '1-1', label: 'Work' },
 *       { id: '1-2', label: 'Personal' },
 *     ],
 *   },
 *   { id: '2', label: 'Downloads' },
 * ];
 * 
 * <RichTreeView items={items} multiSelect checkboxSelection />
 * ```
 */
export const RichTreeView: React.FC<RichTreeViewProps> = (props) => {
  return <MuiRichTreeView {...props} />;
};

RichTreeView.displayName = 'AdapterRichTreeView';
