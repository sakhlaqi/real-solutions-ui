/**
 * Adaptive Sonner (Toast) Component
 * 
 * Automatically switches between provider implementations based on UIProvider.
 */

import React from 'react';
import { useUIContext } from '../core/context';
import { Toaster as ShadcnToaster } from '../providers/shadcn';

export interface SonnerProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
  expand?: boolean;
  richColors?: boolean;
  closeButton?: boolean;
  className?: string;
}

/**
 * Adaptive Sonner Component
 * 
 * @example
 * ```tsx
 * <Sonner position="top-right" />
 * ```
 */
export const Sonner: React.FC<SonnerProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'shadcn' || provider === 'radix') {
    return <ShadcnToaster {...props} />;
  }
  
  // Fallback to shadcn for other providers
  return <ShadcnToaster {...props} />;
};

Sonner.displayName = 'AdapterSonner';
