/**
 * Adaptive Sheet Component
 * 
 * Automatically switches between provider implementations based on UIProvider.
 */

import React, { ReactNode } from 'react';
import { useUIContext } from '../core/context';
import { Sheet as ShadcnSheet } from '../providers/shadcn';

export interface SheetProps {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

/**
 * Adaptive Sheet Component
 * 
 * @example
 * ```tsx
 * <Sheet open={open} onOpenChange={setOpen}>
 *   <SheetContent>
 *     {children}
 *   </SheetContent>
 * </Sheet>
 * ```
 */
export const Sheet: React.FC<SheetProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'shadcn' || provider === 'radix') {
    return <ShadcnSheet {...props} />;
  }
  
  // Fallback to shadcn for other providers
  return <ShadcnSheet {...props} />;
};

Sheet.displayName = 'AdapterSheet';
