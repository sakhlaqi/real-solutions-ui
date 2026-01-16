import React from 'react';
import { CircularProgress, LinearProgress, Box } from '@mui/material';
import { ProgressProps } from '../../core/types';

export const Progress: React.FC<ProgressProps & { linear?: boolean }> = ({
  value,
  variant = 'indeterminate',
  color = 'primary',
  size,
  className,
  linear = false,
}) => {
  if (linear) {
    return (
      <Box sx={{ width: '100%' }} className={className}>
        <LinearProgress
          variant={variant}
          value={value}
          color={color}
        />
      </Box>
    );
  }

  return (
    <CircularProgress
      variant={variant}
      value={value}
      color={color}
      size={size}
      className={className}
    />
  );
};

Progress.displayName = 'MUIProgress';
