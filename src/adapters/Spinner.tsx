/**
 * Adaptive Spinner Component
 * 
 * Uses MUI CircularProgress for all providers.
 * Internal implementation is deprecated in favor of MUI's production-ready component.
 */

import React from 'react';
import { CircularProgress as MUISpinner } from '@mui/material';

export interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'inherit';
  className?: string;
}

/**
 * Adaptive Spinner Component
 * 
 * Note: This component now uses MUI implementation for all providers.
 * 
 * @example
 * ```tsx
 * <Spinner size="large" color="primary" />
 * ```
 */
export const Spinner: React.FC<SpinnerProps> = (props) => {
  // Map size to MUI size values
  const sizeMap = { small: 20, medium: 40, large: 60 };
  const size = props.size ? sizeMap[props.size] : 40;
  return <MUISpinner size={size} color={props.color} className={props.className} />;
};

Spinner.displayName = 'AdapterSpinner';
