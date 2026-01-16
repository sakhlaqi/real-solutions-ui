/**
 * Adapter TreeView Component
 * 
 * Dynamically switches between internal and MUI tree view implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { BaseTreeViewProps } from '../core/types';
import { useUIContext } from '../core/context';
import { TreeView as InternalTreeView } from '../data-display';
import { TreeView as MUITreeView } from '../providers/mui';

/**
 * Adaptive TreeView Component
 * 
 * Automatically switches between internal and MUI implementations based on UIProvider.
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
  const { provider } = useUIContext();
  
  if (provider === 'mui') {
    return <MUITreeView {...props} />;
  }
  
  // Transform nodes to data prop for internal component
  const { nodes, ...restProps } = props;
  
  return <InternalTreeView {...restProps} data={nodes} />;
};

TreeView.displayName = 'AdapterTreeView';
