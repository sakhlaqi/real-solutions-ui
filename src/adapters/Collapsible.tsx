/**
 * Adaptive Collapsible Component
 * 
 * Automatically switches between provider implementations based on UIProvider.
 */

import React, { ReactNode } from 'react';
import { useUIContext } from '../core/context';
import { Collapsible as ShadcnCollapsible } from '../providers/shadcn';

export interface CollapsibleProps {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  className?: string;
}

/**
 * Adaptive Collapsible Component
 * 
 * @example
 * ```tsx
 * <Collapsible open={open} onOpenChange={setOpen}>
 *   {children}
 * </Collapsible>
 * ```
 */
export const Collapsible: React.FC<CollapsibleProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'shadcn' || provider === 'radix') {
    return <ShadcnCollapsible {...props} />;
  }
  
  // Fallback to shadcn for other providers
  return <ShadcnCollapsible {...props} />;
};

Collapsible.displayName = 'AdapterCollapsible';
