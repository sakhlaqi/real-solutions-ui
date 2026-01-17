/**
 * Adaptive Sidebar Component
 * 
 * Automatically switches between provider implementations based on UIProvider.
 */

import React, { ReactNode } from 'react';
import { useUIContext } from '../core/context';
import { Sidebar as ShadcnSidebar } from '../providers/shadcn';

export interface SidebarProps {
  children: ReactNode;
  side?: 'left' | 'right';
  variant?: 'sidebar' | 'floating' | 'inset';
  collapsible?: 'offcanvas' | 'icon' | 'none';
  className?: string;
}

/**
 * Adaptive Sidebar Component
 * 
 * @example
 * ```tsx
 * <Sidebar>
 *   <SidebarContent>
 *     {children}
 *   </SidebarContent>
 * </Sidebar>
 * ```
 */
export const Sidebar: React.FC<SidebarProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'shadcn' || provider === 'radix') {
    return <ShadcnSidebar {...props} />;
  }
  
  // Fallback to shadcn for other providers
  return <ShadcnSidebar {...props} />;
};

Sidebar.displayName = 'AdapterSidebar';
