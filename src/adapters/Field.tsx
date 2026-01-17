/**
 * Adaptive Field Component
 * 
 * Automatically switches between provider implementations based on UIProvider.
 */

import React, { ReactNode } from 'react';
import { useUIContext } from '../core/context';
import { Field as ShadcnField } from '../providers/shadcn';

export interface FieldProps {
  children: ReactNode;
  orientation?: 'vertical' | 'horizontal' | 'responsive';
  className?: string;
}

/**
 * Adaptive Field Component
 * 
 * @example
 * ```tsx
 * <Field orientation="horizontal">
 *   <FieldLabel>Label</FieldLabel>
 *   <Input />
 * </Field>
 * ```
 */
export const Field: React.FC<FieldProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'shadcn' || provider === 'radix') {
    return <ShadcnField {...props} />;
  }
  
  // Fallback to shadcn for other providers
  return <ShadcnField {...props} />;
};

Field.displayName = 'AdapterField';
