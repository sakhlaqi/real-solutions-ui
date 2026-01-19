/**
 * Adaptive Drawer Component
 * 
 * Uses MUI Drawer for all providers.
 */

import React from 'react';
import { Drawer as MUIDrawer } from '../providers/mui';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  anchor?: 'left' | 'right' | 'top' | 'bottom';
  variant?: 'temporary' | 'permanent' | 'persistent';
  width?: string | number;
}

/**
 * Adaptive Drawer Component
 * 
 * @example
 * ```tsx
 * <Drawer open={isOpen} onClose={handleClose} anchor="left">
 *   <nav>Navigation items</nav>
 * </Drawer>
 * ```
 */
export const Drawer: React.FC<DrawerProps> = (props) => {
  return <MUIDrawer {...props} />;
};

Drawer.displayName = 'AdapterDrawer';
