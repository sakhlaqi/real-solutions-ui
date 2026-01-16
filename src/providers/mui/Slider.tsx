/**
 * MUI Slider Wrapper Component
 */

import React from 'react';
import { Slider as MUISlider } from '@mui/material';

export interface SliderProps {
  value: number | number[];
  onChange: (value: number | number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  marks?: boolean | { value: number; label?: string }[];
  disabled?: boolean;
  valueLabelDisplay?: 'auto' | 'on' | 'off';
}

/**
 * MUI Slider wrapper component
 */
export const Slider: React.FC<SliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  marks = false,
  disabled = false,
  valueLabelDisplay = 'auto',
}) => {
  const handleChange = (_event: Event, newValue: number | number[]) => {
    onChange(newValue);
  };

  return (
    <MUISlider
      value={value}
      onChange={handleChange}
      min={min}
      max={max}
      step={step}
      marks={marks}
      disabled={disabled}
      valueLabelDisplay={valueLabelDisplay}
    />
  );
};

Slider.displayName = 'MUISlider';
