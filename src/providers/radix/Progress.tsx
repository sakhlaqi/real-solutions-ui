/**
 * Radix UI Progress Wrapper
 * Adapts Radix UI Progress to match internal Progress API
 */

import React from 'react';
import { Progress as RadixProgress } from '@radix-ui/themes';
import type { ProgressProps } from '../../core/types';

export const Progress: React.FC<ProgressProps> = ({
  value = 0,
  variant = 'determinate',
  color = 'primary',
  size = 'medium',
  className,
}) => {
  const radixSize = size === 'small' ? '1' : size === 'medium' ? '2' : '3';
  
  const radixColor = color === 'secondary' ? 'gray' :
                     color === 'error' ? 'red' :
                     color === 'warning' ? 'orange' :
                     color === 'info' ? 'blue' :
                     color === 'success' ? 'green' : 'blue';

  return (
    <RadixProgress
      value={variant === 'determinate' ? value : undefined}
      size={radixSize as any}
      color={radixColor as any}
      className={className}
      style={{ width: '100%' }}
    />
  );
};

export default Progress;
