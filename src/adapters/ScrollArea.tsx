/**
 * Adaptive ScrollArea Component
 * 
 * Automatically switches between provider implementations based on UIProvider.
 */

import React, { ReactNode } from 'react';
import { useUIContext } from '../core/context';
import { ScrollArea as ShadcnScrollArea } from '../providers/shadcn';

export interface ScrollAreaProps {
  children: ReactNode;
  className?: string;
  type?: 'auto' | 'always' | 'scroll' | 'hover';
}

/**
 * Adaptive ScrollArea Component
 * 
 * @example
 * ```tsx
 * <ScrollArea className="h-72">
 *   {children}
 * </ScrollArea>
 * ```
 */
export const ScrollArea: React.FC<ScrollAreaProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'shadcn' || provider === 'radix') {
    return <ShadcnScrollArea {...props} />;
  }
  
  // Fallback to shadcn for other providers
  return <ShadcnScrollArea {...props} />;
};

ScrollArea.displayName = 'AdapterScrollArea';
