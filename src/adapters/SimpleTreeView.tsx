/**
 * Adapter SimpleTreeView Component
 * 
 * Uses MUI SimpleTreeView for all providers.
 * Provides a simple interface for rendering hierarchical tree structures.
 */

import React from 'react';
import {
  SimpleTreeView as MuiSimpleTreeView,
  SimpleTreeViewProps as MuiSimpleTreeViewProps,
  SimpleTreeViewItem,
} from '../providers/mui';

export interface SimpleTreeViewProps {
  items?: SimpleTreeViewItem[];
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
  children?: React.ReactNode;
}

/**
 * Adaptive SimpleTreeView Component
 * 
 * A simple tree view for displaying hierarchical data with basic features.
 * 
 * @example
 * ```tsx
 * const items = [
 *   {
 *     id: '1',
 *     label: 'Parent 1',
 *     children: [
 *       { id: '1-1', label: 'Child 1-1' },
 *       { id: '1-2', label: 'Child 1-2' },
 *     ],
 *   },
 *   { id: '2', label: 'Parent 2' },
 * ];
 * 
 * <SimpleTreeView items={items} />
 * ```
 */
export const SimpleTreeView: React.FC<SimpleTreeViewProps> = (props) => {
  return <MuiSimpleTreeView {...props} />;
};

SimpleTreeView.displayName = 'AdapterSimpleTreeView';
