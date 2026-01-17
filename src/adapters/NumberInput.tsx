/**
 * Adapter NumberInput Component
 * 
 * Dynamically switches between internal, MUI, and Radix implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { useUIContext } from '../core/context';
import { NumberInput as InternalNumberInput, NumberInputProps } from '../forms';
import { Input as MUIInput } from '../providers/mui';
import { Input as RadixInput } from '../providers/radix';

/**
 * Adaptive NumberInput Component
 * 
 * @example
 * ```tsx
 * <NumberInput
 *   value={age}
 *   onChange={(e) => setAge(Number(e.target.value))}
 *   label="Age"
 *   min={0}
 *   max={120}
 * />
 * ```
 */
export const NumberInput: React.FC<NumberInputProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'mui') {
    return <MUIInput {...props} type="number" />;
  }
  
  if (provider === 'radix') {
    return <RadixInput {...props} type="number" />;
  }
  
  return <InternalNumberInput {...props} />;
};

NumberInput.displayName = 'AdapterNumberInput';
