/**
 * Adaptive RadioGroup Component
 * 
 * Uses MUI RadioGroup for all providers.
 * Internal implementation is deprecated in favor of MUI's production-ready component.
 */

import React from 'react';
import { RadioGroup as MUIRadioGroup } from '../providers/mui';

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
 * Note: This component now uses MUI implementation for all providers.
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
  return <MUIRadioGroup {...props} />;
};

RadioGroup.displayName = 'AdapterRadioGroup';
