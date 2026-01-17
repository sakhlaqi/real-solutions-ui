/**
 * Adapter Input Component
 */

import React from 'react';
import { BaseInputProps } from '../core/types';
import { useUIContext } from '../core/context';
import { Input as InternalInput } from '../base';
import { Input as MUIInput } from '../providers/mui';
import { Input as RadixInput } from '../providers/radix';
import { Input as ShadcnInput } from '../providers/shadcn';

/**
 * Adaptive Input Component
 * 
 * Automatically switches between internal and MUI implementations based on UIProvider.
 * 
 * @example
 * ```tsx
 * <Input label="Email" placeholder="Enter email" />
 * ```
 */
export const Input: React.FC<BaseInputProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'mui') {
    return <MUIInput {...props} />;
  }
  
  if (provider === 'radix') {
    return <RadixInput {...props} />;
  }

  if (provider === 'shadcn') {
    return <ShadcnInput {...props} />;
  }
  
  // Filter out MUI-specific props that don't apply to internal Input
  const { size, color, variant, ...restProps } = props as any;
  
  return <InternalInput {...restProps} />;
};

Input.displayName = 'AdapterInput';
