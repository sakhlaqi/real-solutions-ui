/**
 * Adaptive Empty Component
 * 
 * Automatically switches between provider implementations based on UIProvider.
 */

import React, { ReactNode } from 'react';
import { useUIContext } from '../core/context';
import { Empty as ShadcnEmpty } from '../providers/shadcn';

export interface EmptyProps {
  children: ReactNode;
  variant?: 'default' | 'outline';
  className?: string;
}

/**
 * Adaptive Empty Component
 * 
 * @example
 * ```tsx
 * <Empty>
 *   <EmptyHeader>
 *     <EmptyTitle>No data</EmptyTitle>
 *   </EmptyHeader>
 * </Empty>
 * ```
 */
export const Empty: React.FC<EmptyProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'shadcn' || provider === 'radix') {
    return <ShadcnEmpty {...props} />;
  }
  
  // Fallback to shadcn for other providers
  return <ShadcnEmpty {...props} />;
};

Empty.displayName = 'AdapterEmpty';
