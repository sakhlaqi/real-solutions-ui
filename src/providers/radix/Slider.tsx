/**
 * Radix UI Slider Wrapper
 * Adapts Radix UI Slider to match internal Slider API
 */

import React from 'react';
import { Slider as RadixSlider } from '@radix-ui/themes';
import type { SliderProps } from '../../core/types';

export const Slider: React.FC<SliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  color = 'primary',
  size = 'medium',
  className,
}) => {
  const handleValueChange = (newValue: number[]) => {
    if (onChange) {
      onChange(newValue[0]);
    }
  };

  const radixSize = size === 'small' ? '1' : size === 'medium' ? '2' : '3';
  const radixColor = color === 'secondary' ? 'gray' : 'blue';

  // Handle both single value and array
  const sliderValue = Array.isArray(value) ? value : (value !== undefined ? [value] : [0]);

  return (
    <RadixSlider
      value={sliderValue}
      onValueChange={handleValueChange}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      size={radixSize as any}
      color={radixColor as any}
      className={className}
      style={{ width: '100%' }}
    />
  );
};

export default Slider;
