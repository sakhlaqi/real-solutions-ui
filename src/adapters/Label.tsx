/**
 * Adaptive Label Component
 * 
 * Automatically switches between provider implementations based on UIProvider.
 */

import React, { ReactNode } from 'react';
import { useUIContext } from '../core/context';
import { Label as ShadcnLabel } from '../providers/shadcn';

export interface LabelProps {
  children: ReactNode;
  htmlFor?: string;
  className?: string;
}

/**
 * Adaptive Label Component
 * 
 * @example
 * ```tsx
 * <Label htmlFor="input">Label Text</Label>
 * ```
 */
export const Label: React.FC<LabelProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'shadcn' || provider === 'radix') {
    return <ShadcnLabel {...props} />;
  }
  
  // Fallback to shadcn for other providers
  return <ShadcnLabel {...props} />;
};

Label.displayName = 'AdapterLabel';
