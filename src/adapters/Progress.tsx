/**
 * Adapter Progress Component
 * 
 * Dynamically switches between internal and MUI progress implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { ProgressProps } from '../core/types';
import { useUIContext } from '../core/context';
import { ProgressCircle, ProgressBar } from '../feedback';
import { Progress as MUIProgress } from '../providers/mui';
import { Progress as RadixProgress } from '../providers/radix';
import { Progress as ShadcnProgress } from '../providers/shadcn';

/**
 * Adaptive Progress Component
 * 
 * Automatically switches between internal and MUI implementations based on UIProvider.
 * 
 * @example
 * ```tsx
 * // Circular progress
 * <Progress variant="indeterminate" color="primary" />
 * 
 * // Determinate progress
 * <Progress variant="determinate" value={75} />
 * 
 * // Linear progress
 * <Progress linear variant="indeterminate" />
 * ```
 */
export const Progress: React.FC<ProgressProps & { linear?: boolean }> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'shadcn') {
    return <ShadcnProgress {...props} />;
  }
  
  if (provider === 'mui') {
    return <MUIProgress {...props} />;
  }
  
  if (provider === 'radix') {
    return <RadixProgress {...props} />;
  }
  
  // Use ProgressBar for linear, ProgressCircle for circular
  const { value = 0, linear, size, color, variant, ...restProps } = props;
  
  // Map size number to string for internal components
  let internalSize: 'sm' | 'md' | 'lg' | 'xl' | undefined;
  if (typeof size === 'number') {
    if (size <= 30) internalSize = 'sm';
    else if (size <= 50) internalSize = 'md';
    else if (size <= 70) internalSize = 'lg';
    else internalSize = 'xl';
  }
  
  // Map color - filter to valid internal colors
  let internalColor: 'primary' | 'success' | 'warning' | 'error' | 'info' | undefined;
  if (color && ['primary', 'success', 'warning', 'error', 'info'].includes(color)) {
    internalColor = color as any;
  }
  
  // Map variant for ProgressBar (doesn't use determinate/indeterminate)
  let barVariant: 'default' | 'success' | 'warning' | 'error' | undefined = 'default';
  if (color === 'success') barVariant = 'success';
  else if (color === 'warning') barVariant = 'warning';
  else if (color === 'error') barVariant = 'error';
  
  if (linear) {
    return <ProgressBar {...restProps} value={value} size={internalSize as 'sm' | 'md' | 'lg'} variant={barVariant} />;
  }
  
  return <ProgressCircle {...restProps} value={value} size={internalSize} variant={variant} color={internalColor} />;
};

Progress.displayName = 'AdapterProgress';
