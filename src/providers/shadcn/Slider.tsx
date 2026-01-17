/**
 * Shadcn Slider Component
 * Wrapper that handles value conversion between number and array
 */

import React from 'react';
import { Slider as ShadcnSliderPrimitive } from './ui/slider';

export interface SliderProps {
  value: number | number[];
  onChange: (value: number | number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}

/**
 * Shadcn Slider Component with value conversion
 */
export const Slider: React.FC<SliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
}) => {
  // Convert single value to array for Radix Slider
  const arrayValue = Array.isArray(value) ? value : [value];

  const handleValueChange = (newValue: number[]) => {
    // If original value was a number, return a number
    if (typeof value === 'number') {
      onChange(newValue[0]);
    } else {
      onChange(newValue);
    }
  };

  return (
    <ShadcnSliderPrimitive
      value={arrayValue}
      onValueChange={handleValueChange}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
    />
  );
};
