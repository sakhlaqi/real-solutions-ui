/**
 * Adaptive Separator Component
 * 
 * Automatically switches between provider implementations based on UIProvider.
 */

import React from 'react';
import { useUIContext } from '../core/context';
import { Separator as ShadcnSeparator } from '../providers/shadcn';

export interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
  className?: string;
}

/**
 * Adaptive Separator Component
 * 
 * @example
 * ```tsx
 * <Separator />
 * <Separator orientation="vertical" />
 * ```
 */
export const Separator: React.FC<SeparatorProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'shadcn' || provider === 'radix') {
    return <ShadcnSeparator {...props} />;
  }
  
  // Fallback to shadcn for other providers
  return <ShadcnSeparator {...props} />;
};

Separator.displayName = 'AdapterSeparator';
