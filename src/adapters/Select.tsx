/**
 * Adapter Select Component
 * 
 * Dynamically switches between internal and MUI select implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { SelectProps } from '../core/types';
import { useUIContext } from '../core/context';
import { Select as InternalSelect } from '../forms';
import { Select as MUISelect } from '../providers/mui';
import { Select as RadixSelect } from '../providers/radix';
import { Select as ShadcnSelect } from '../providers/shadcn';

/**
 * Adaptive Select Component
 * 
 * Automatically switches between internal and MUI implementations based on UIProvider.
 * 
 * @example
 * ```tsx
 * <Select 
 *   label="Country"
 *   options={[{ value: 'us', label: 'United States' }]}
 *   value={country}
 *   onChange={(value) => setCountry(value)}
 * />
 * ```
 */
export const Select: React.FC<SelectProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'shadcn') {
    return <ShadcnSelect {...props} />;
  }
  
  if (provider === 'mui') {
    return <MUISelect {...props} />;
  }
  
  if (provider === 'radix') {
    return <RadixSelect {...props} />;
  }
  
  // Internal Select doesn't support size as string, remove it
  const { size, ...restProps } = props as any;
  
  return <InternalSelect {...restProps} />;
};

Select.displayName = 'AdapterSelect';
