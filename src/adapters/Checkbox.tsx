/**
 * Adapter Checkbox Component
 * 
 * Dynamically switches between internal and MUI checkbox implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { CheckboxProps } from '../core/types';
import { useUIContext } from '../core/context';
import { Checkbox as InternalCheckbox } from '../forms';
import { Checkbox as MUICheckbox } from '../providers/mui';
import { Checkbox as RadixCheckbox } from '../providers/radix';
import { Checkbox as ShadcnCheckbox } from '../providers/shadcn';

/**
 * Adaptive Checkbox Component
 * 
 * Automatically switches between internal and MUI implementations based on UIProvider.
 * 
 * @example
 * ```tsx
 * <Checkbox 
 *   label="Accept terms"
 *   checked={accepted}
 *   onChange={(e) => setAccepted(e.target.checked)}
 * />
 * ```
 */
export const Checkbox: React.FC<CheckboxProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'mui') {
    return <MUICheckbox {...props} />;
  }
  
  if (provider === 'radix') {
    return <RadixCheckbox {...props} />;
  }

  if (provider === 'shadcn') {
    return <ShadcnCheckbox {...props} />;
  }
  
  // Transform onChange handler and filter incompatible props
  const { onChange, size, color, ...restProps } = props as any;
  const handleChange = onChange ? (checked: boolean) => {
    // Internal component already provides boolean
    onChange(checked as any);
  } : undefined;
  
  return <InternalCheckbox {...restProps} onChange={handleChange} />;
};

Checkbox.displayName = 'AdapterCheckbox';
