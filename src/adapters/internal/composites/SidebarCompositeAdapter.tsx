import React from 'react';
import type { SidebarCompositeProps } from '../../../core/composites/Sidebar/types';
// Fallback to MUI adapter
import { SidebarCompositeAdapter as MUISidebarAdapter } from '../../mui/composites/SidebarCompositeAdapter';

/**
 * Internal SidebarComposite Adapter
 * 
 * Fallback implementation using MUI Drawer.
 * Can be replaced with a custom internal implementation in the future.
 */
export const SidebarCompositeAdapter: React.FC<SidebarCompositeProps> = (props) => {
  return <MUISidebarAdapter {...props} />;
};

export default SidebarCompositeAdapter;
