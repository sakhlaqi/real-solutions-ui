/**
 * Adaptive Menubar Component
 * 
 * Automatically switches between provider implementations based on UIProvider.
 */

import React, { ReactNode } from 'react';
import { useUIContext } from '../core/context';
import { Menubar as ShadcnMenubar } from '../providers/shadcn';

export interface MenubarProps {
  children: ReactNode;
  className?: string;
}

/**
 * Adaptive Menubar Component
 * 
 * @example
 * ```tsx
 * <Menubar>
 *   <MenubarMenu>
 *     <MenubarTrigger>File</MenubarTrigger>
 *   </MenubarMenu>
 * </Menubar>
 * ```
 */
export const Menubar: React.FC<MenubarProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'shadcn' || provider === 'radix') {
    return <ShadcnMenubar {...props} />;
  }
  
  // Fallback to shadcn for other providers
  return <ShadcnMenubar {...props} />;
};

Menubar.displayName = 'AdapterMenubar';
