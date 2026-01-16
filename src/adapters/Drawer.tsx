/**
 * Adaptive Drawer Component
 * 
 * Automatically switches between internal and MUI implementations based on UIProvider.
 */

import React from 'react';
import { useUIContext } from '../core/context';
import { Drawer as InternalDrawer } from '../layout';
import { Drawer as MUIDrawer } from '../providers/mui';
import { Drawer as RadixDrawer } from '../providers/radix';

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
  const { provider } = useUIContext();
  
  if (provider === 'mui') {
    return <MUIDrawer {...props} />;
  }
  
  if (provider === 'radix') {
    return <RadixDrawer {...props} />;
  }
  
  // Transform open to isOpen and filter unsupported props
  const { open, variant, ...internalProps } = props;
  return <InternalDrawer {...internalProps} isOpen={open} />;
};

Drawer.displayName = 'AdapterDrawer';
