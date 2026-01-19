/**
 * Adapter TreeView Component
 * 
 * Uses MUI TreeView for all providers.
 */

import React from 'react';
import { BaseTreeViewProps } from '../core/types';
import { TreeView as MUITreeView } from '../providers/mui';

/**
 * Adaptive TreeView Component
 * 
 * @example
 * ```tsx
 * <TreeView 
 *   nodes={[
 *     { id: '1', label: 'Root', children: [
 *       { id: '1-1', label: 'Child 1' },
 *       { id: '1-2', label: 'Child 2' }
 *     ]}
 *   ]}
 *   onSelect={(ids) => console.log('Selected:', ids)}
 * />
 * ```
 */
export const TreeView: React.FC<BaseTreeViewProps> = (props) => {
  return <MUITreeView {...props} />;
};

TreeView.displayName = 'AdapterTreeView';
