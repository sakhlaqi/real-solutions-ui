/**
 * Adapter NumberInput Component
 * 
 * Uses MUI Input with type="number" for all providers.
 */

import React from 'react';
import { Input as MUIInput } from '../providers/mui';
import { BaseInputProps } from '../core/types';

export type NumberInputProps = Omit<BaseInputProps, 'type'> & {
  min?: number;
  max?: number;
  step?: number;
};

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
  return <MUIInput {...props as any} type="number" />;
};

NumberInput.displayName = 'AdapterNumberInput';
