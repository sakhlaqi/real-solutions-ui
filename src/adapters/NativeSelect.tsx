/**
 * Adaptive NativeSelect Component
 * 
 * Automatically switches between provider implementations based on UIProvider.
 */

import React from 'react';
import { useUIContext } from '../core/context';
import { NativeSelect as ShadcnNativeSelect } from '../providers/shadcn';

export interface NativeSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
  className?: string;
}

/**
 * Adaptive NativeSelect Component
 * 
 * @example
 * ```tsx
 * <NativeSelect>
 *   <option value="">Select</option>
 *   <option value="1">Option 1</option>
 * </NativeSelect>
 * ```
 */
export const NativeSelect: React.FC<NativeSelectProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'shadcn' || provider === 'radix') {
    return <ShadcnNativeSelect {...props} />;
  }
  
  // Fallback to shadcn for other providers
  return <ShadcnNativeSelect {...props} />;
};

NativeSelect.displayName = 'AdapterNativeSelect';
