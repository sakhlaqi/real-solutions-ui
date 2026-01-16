/**
 * Adaptive RadioGroup Component
 * 
 * Automatically switches between internal and MUI implementations based on UIProvider.
 */

import React from 'react';
import { useUIContext } from '../core/context';
import { RadioGroup as InternalRadioGroup } from '../forms';
import { RadioGroup as MUIRadioGroup } from '../providers/mui';
import { RadioGroup as RadixRadioGroup } from '../providers/radix';

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  value: string;
  onChange: (value: string) => void;
  options: RadioOption[];
  name?: string;
  row?: boolean;
  disabled?: boolean;
}

/**
 * Adaptive RadioGroup Component
 * 
 * @example
 * ```tsx
 * <RadioGroup 
 *   value={selected}
 *   onChange={setSelected}
 *   options={[
 *     { value: 'option1', label: 'Option 1' },
 *     { value: 'option2', label: 'Option 2' }
 *   ]}
 * />
 * ```
 */
export const RadioGroup: React.FC<RadioGroupProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'mui') {
    return <MUIRadioGroup {...props} />;
  }
  
  if (provider === 'radix') {
    return <RadixRadioGroup {...props} />;
  }
  
  // Internal RadioGroup requires name prop and accepts string | number for value
  const { name = 'radio-group', onChange, ...restProps } = props;
  
  // Wrap onChange to handle internal's string | number -> string
  const handleChange = (value: string | number) => {
    onChange(String(value));
  };
  
  return <InternalRadioGroup {...restProps} name={name} onChange={handleChange} />;
};

RadioGroup.displayName = 'AdapterRadioGroup';
