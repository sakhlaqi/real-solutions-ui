/**
 * Adapter Progress Component
 * 
 * Uses MUI CircularProgress for all providers.
 */

import React from 'react';
import { ProgressProps } from '../core/types';
import { Progress as MUIProgress } from '../providers/mui';

/**
 * Adaptive Progress Component
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
  return <MUIProgress {...props} />;
};

Progress.displayName = 'AdapterProgress';
