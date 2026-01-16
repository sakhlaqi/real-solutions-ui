/**
 * Adaptive Slider Component
 * 
 * Automatically switches between internal and MUI implementations based on UIProvider.
 */

import React from 'react';
import { useUIContext } from '../core/context';
import { Slider as InternalSlider } from '../forms';
import { Slider as MUISlider } from '../providers/mui';
import { Slider as RadixSlider } from '../providers/radix';

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
 * @example
 * ```tsx
 * <Slider value={50} onChange={setValue} min={0} max={100} />
 * ```
 */
export const Slider: React.FC<SliderProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'mui') {
    return <MUISlider {...props} />;
  }
  
  if (provider === 'radix') {
    return <RadixSlider {...props} />;
  }
  
  // Filter props not supported by internal
  const { marks, valueLabelDisplay, ...internalProps } = props;
  return <InternalSlider {...internalProps} />;
};

Slider.displayName = 'AdapterSlider';
