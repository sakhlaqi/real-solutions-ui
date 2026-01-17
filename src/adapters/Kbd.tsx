/**
 * Adaptive Kbd Component
 * 
 * Automatically switches between provider implementations based on UIProvider.
 */

import React, { ReactNode } from 'react';
import { useUIContext } from '../core/context';
import { Kbd as ShadcnKbd } from '../providers/shadcn';

export interface KbdProps {
  children: ReactNode;
  className?: string;
}

/**
 * Adaptive Kbd Component
 * 
 * @example
 * ```tsx
 * <Kbd>Ctrl</Kbd>
 * ```
 */
export const Kbd: React.FC<KbdProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'shadcn' || provider === 'radix') {
    return <ShadcnKbd {...props} />;
  }
  
  // Fallback to shadcn for other providers
  return <ShadcnKbd {...props} />;
};

Kbd.displayName = 'AdapterKbd';
