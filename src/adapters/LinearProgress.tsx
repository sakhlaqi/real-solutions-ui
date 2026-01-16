/**
 * Adaptive LinearProgress Component
 * 
 * Automatically switches between internal and MUI implementations based on UIProvider.
 */

import React from 'react';
import { useUIContext } from '../core/context';
import { ProgressBar as InternalProgressBar } from '../feedback';
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
  const { provider } = useUIContext();
  
  if (provider === 'mui') {
    return <MUILinearProgress {...props} />;
  }
  
  // Transform for internal - ProgressBar requires value prop
  const { variant, color, value, ...restProps } = props;
  const progressValue = value !== undefined ? value : 0;
  
  return <InternalProgressBar {...restProps} value={progressValue} />;
};

LinearProgress.displayName = 'AdapterLinearProgress';
