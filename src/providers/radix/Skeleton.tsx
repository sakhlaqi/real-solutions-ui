/**
 * Radix UI Skeleton Wrapper
 * Uses Skeleton from Radix Themes
 */

import React from 'react';
import { Skeleton as RadixSkeleton } from '@radix-ui/themes';
import type { SkeletonProps } from '../../core/types';

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  animation: _animation = 'pulse',
  className,
}) => {
  const defaultHeight = variant === 'text' ? '1em' :
                       variant === 'circular' ? '40px' :
                       variant === 'rectangular' ? '100px' : height;

  return (
    <RadixSkeleton
      className={className}
      style={{
        width: width || '100%',
        height: height || defaultHeight,
        borderRadius: variant === 'circular' ? '50%' : variant === 'text' ? '4px' : '8px',
      }}
    />
  );
};

export default Skeleton;
