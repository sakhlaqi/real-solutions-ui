/**
 * Adaptive Combobox Component
 * 
 * Automatically switches between provider implementations based on UIProvider.
 */

import React from 'react';
import { useUIContext } from '../core/context';
import { Combobox as ShadcnCombobox } from '../providers/shadcn';

export interface ComboboxProps {
  value?: string;
  onValueChange?: (value: string) => void;
  options?: Array<{ value: string; label: string }>;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * Adaptive Combobox Component
 * 
 * @example
 * ```tsx
 * <Combobox
 *   value={value}
 *   onValueChange={setValue}
 *   options={options}
 * />
 * ```
 */
export const Combobox: React.FC<ComboboxProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'shadcn' || provider === 'radix') {
    return <ShadcnCombobox {...props as any} />;
  }
  
  // Fallback to shadcn for other providers
  return <ShadcnCombobox {...props as any} />;
};

Combobox.displayName = 'AdapterCombobox';
