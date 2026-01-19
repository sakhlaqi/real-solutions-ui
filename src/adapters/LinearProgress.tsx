/**
 * Adaptive LinearProgress Component
 * 
 * Uses MUI LinearProgress for all providers.
 */

import React from 'react';
import { LinearProgress as MUILinearProgress } from '../providers/mui';

export interface LinearProgressProps {
  value?: number;
  variant?: 'determinate' | 'indeterminate';
  color?: 'primary' | 'secondary';
  className?: string;
}

/**
 * Adaptive LinearProgress Component
 * 
 * @example
 * ```tsx
 * <LinearProgress variant="determinate" value={75} />
 * <LinearProgress variant="indeterminate" />
 * ```
 */
export const LinearProgress: React.FC<LinearProgressProps> = (props) => {
  return <MUILinearProgress {...props} />;
};

LinearProgress.displayName = 'AdapterLinearProgress';
