/**
 * Adaptive Spinner Component
 * 
 * Automatically switches between internal and MUI implementations based on UIProvider.
 */

import React from 'react';
import { useUIContext } from '../core/context';
import { Spinner as InternalSpinner } from '../feedback';
import { CircularProgress as MUISpinner } from '@mui/material';
import { Spinner as RadixSpinner } from '../providers/radix';
import { Spinner as ShadcnSpinner } from '../providers/shadcn';

export interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'inherit';
  className?: string;
}

/**
 * Adaptive Spinner Component
 * 
 * @example
 * ```tsx
 * <Spinner size="large" color="primary" />
 * ```
 */
export const Spinner: React.FC<SpinnerProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'shadcn') {
    return <ShadcnSpinner {...props} />;
  }
  
  if (provider === 'mui') {
    // Map size to MUI size values
    const sizeMap = { small: 20, medium: 40, large: 60 };
    const size = props.size ? sizeMap[props.size] : 40;
    return <MUISpinner size={size} color={props.color} className={props.className} />;
  }
  
  if (provider === 'radix') {
    return <RadixSpinner {...props as any} />;
  }
  
  // Map size to internal format
  const { size, ...restProps } = props;
  const sizeMap = { small: 'sm', medium: 'md', large: 'lg' } as const;
  const internalSize = size ? sizeMap[size] : 'md';
  
  return <InternalSpinner {...restProps} size={internalSize} />;
};

Spinner.displayName = 'AdapterSpinner';
