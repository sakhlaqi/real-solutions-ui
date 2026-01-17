/**
 * Adaptive AspectRatio Component
 * 
 * Automatically switches between provider implementations based on UIProvider.
 */

import React, { ReactNode } from 'react';
import { useUIContext } from '../core/context';
import { AspectRatio as ShadcnAspectRatio } from '../providers/shadcn';

export interface AspectRatioProps {
  children: ReactNode;
  ratio?: number;
  className?: string;
}

/**
 * Adaptive AspectRatio Component
 * 
 * @example
 * ```tsx
 * <AspectRatio ratio={16/9}>
 *   <img src="..." alt="..." />
 * </AspectRatio>
 * ```
 */
export const AspectRatio: React.FC<AspectRatioProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'shadcn' || provider === 'radix') {
    return <ShadcnAspectRatio {...props} />;
  }
  
  // Fallback to shadcn for other providers
  return <ShadcnAspectRatio {...props} />;
};

AspectRatio.displayName = 'AdapterAspectRatio';
