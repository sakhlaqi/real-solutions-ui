/**
 * Adaptive Slider Component
 * 
 * Uses MUI Slider for all providers.
 * Internal implementation is deprecated in favor of MUI's production-ready component.
 */

import React from 'react';
import { Slider as MUISlider } from '../providers/mui';

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
 * Adaptive Slider Component
 * 
 * Note: This component now uses MUI implementation for all providers.
 * 
 * @example
 * ```tsx
 * <Slider value={50} onChange={setValue} min={0} max={100} />
 * ```
 */
export const Slider: React.FC<SliderProps> = (props) => {
  return <MUISlider {...props} />;
};

Slider.displayName = 'AdapterSlider';
