/**
 * MUI Skeleton Wrapper
 */

import React from 'react';
import { Skeleton as MUISkeletonBase } from '@mui/material';

export interface SkeletonProps {
  variant?: 'text' | 'rectangular' | 'circular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | false;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  animation = 'pulse',
  className,
}) => {
  return (
    <MUISkeletonBase
      variant={variant}
      width={width}
      height={height}
      animation={animation}
      className={className}
    />
  );
};

Skeleton.displayName = 'MUISkeleton';
