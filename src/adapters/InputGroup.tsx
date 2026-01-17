/**
 * Adaptive InputGroup Component
 * 
 * Automatically switches between provider implementations based on UIProvider.
 */

import React, { ReactNode } from 'react';
import { useUIContext } from '../core/context';
import { InputGroup as ShadcnInputGroup } from '../providers/shadcn';

export interface InputGroupProps {
  children: ReactNode;
  className?: string;
}

/**
 * Adaptive InputGroup Component
 * 
 * @example
 * ```tsx
 * <InputGroup>
 *   <InputGroupInput placeholder="Search..." />
 *   <InputGroupAddon>
 *     <SearchIcon />
 *   </InputGroupAddon>
 * </InputGroup>
 * ```
 */
export const InputGroup: React.FC<InputGroupProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'shadcn' || provider === 'radix') {
    return <ShadcnInputGroup {...props} />;
  }
  
  // Fallback to shadcn for other providers
  return <ShadcnInputGroup {...props} />;
};

InputGroup.displayName = 'AdapterInputGroup';
