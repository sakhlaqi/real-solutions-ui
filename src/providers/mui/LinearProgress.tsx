/**
 * MUI LinearProgress Wrapper
 */

import React from 'react';
import { LinearProgress as MUILinearProgressBase } from '@mui/material';

export interface LinearProgressProps {
  value?: number;
  variant?: 'determinate' | 'indeterminate';
  color?: 'primary' | 'secondary';
  className?: string;
}

export const LinearProgress: React.FC<LinearProgressProps> = ({
  value,
  variant = 'indeterminate',
  color = 'primary',
  className,
}) => {
  return (
    <MUILinearProgressBase
      value={value}
      variant={variant}
      color={color}
      className={className}
    />
  );
};

LinearProgress.displayName = 'MUILinearProgress';
