/**
 * Adaptive Command Component
 * 
 * Automatically switches between provider implementations based on UIProvider.
 */

import React, { ReactNode } from 'react';
import { useUIContext } from '../core/context';
import { Command as ShadcnCommand } from '../providers/shadcn';

export interface CommandProps {
  children: ReactNode;
  className?: string;
  label?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

/**
 * Adaptive Command Component
 * 
 * @example
 * ```tsx
 * <Command>
 *   {children}
 * </Command>
 * ```
 */
export const Command: React.FC<CommandProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'shadcn' || provider === 'radix') {
    return <ShadcnCommand {...props} />;
  }
  
  // Fallback to shadcn for other providers
  return <ShadcnCommand {...props} />;
};

Command.displayName = 'AdapterCommand';
