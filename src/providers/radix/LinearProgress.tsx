/**
 * Radix UI LinearProgress Wrapper
 * Uses Progress in linear mode
 */

import React from 'react';
import { Progress } from '@radix-ui/themes';
import type { LinearProgressProps } from '../../core/types';

export const LinearProgress: React.FC<LinearProgressProps> = ({
  value,
  variant = 'determinate',
  color = 'primary',
  className,
}) => {
  const radixColor = color === 'secondary' ? 'gray' :
                     color === 'error' ? 'red' :
                     color === 'warning' ? 'orange' :
                     color === 'info' ? 'blue' :
                     color === 'success' ? 'green' : 'blue';

  return (
    <Progress
      value={variant === 'determinate' ? value : undefined}
      color={radixColor as any}
      className={className}
      style={{ width: '100%' }}
    />
  );
};

export default LinearProgress;
