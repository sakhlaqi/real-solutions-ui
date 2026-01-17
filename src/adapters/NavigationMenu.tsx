/**
 * Adaptive NavigationMenu Component
 * 
 * Automatically switches between provider implementations based on UIProvider.
 */

import React, { ReactNode } from 'react';
import { useUIContext } from '../core/context';
import { NavigationMenu as ShadcnNavigationMenu } from '../providers/shadcn';

export interface NavigationMenuProps {
  children: ReactNode;
  className?: string;
}

/**
 * Adaptive NavigationMenu Component
 * 
 * @example
 * ```tsx
 * <NavigationMenu>
 *   <NavigationMenuList>
 *     <NavigationMenuItem>Item</NavigationMenuItem>
 *   </NavigationMenuList>
 * </NavigationMenu>
 * ```
 */
export const NavigationMenu: React.FC<NavigationMenuProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'shadcn' || provider === 'radix') {
    return <ShadcnNavigationMenu {...props} />;
  }
  
  // Fallback to shadcn for other providers
  return <ShadcnNavigationMenu {...props} />;
};

NavigationMenu.displayName = 'AdapterNavigationMenu';
