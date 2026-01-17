/**
 * Adaptive Item Component
 * 
 * Automatically switches between provider implementations based on UIProvider.
 */

import React, { ReactNode } from 'react';
import { useUIContext } from '../core/context';
import { Item as ShadcnItem } from '../providers/shadcn';

export interface ItemProps {
  children: ReactNode;
  variant?: 'default' | 'outline' | 'muted';
  size?: 'default' | 'sm';
  className?: string;
}

/**
 * Adaptive Item Component
 * 
 * @example
 * ```tsx
 * <Item variant="outline">
 *   <ItemContent>
 *     <ItemTitle>Title</ItemTitle>
 *   </ItemContent>
 * </Item>
 * ```
 */
export const Item: React.FC<ItemProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'shadcn' || provider === 'radix') {
    return <ShadcnItem {...props} />;
  }
  
  // Fallback to shadcn for other providers
  return <ShadcnItem {...props} />;
};

Item.displayName = 'AdapterItem';
