/**
 * Adaptive Skeleton Component
 * 
 * Automatically switches between internal and MUI implementations based on UIProvider.
 */

import React from 'react';
import { useUIContext } from '../core/context';
import { SkeletonLoader as InternalSkeleton } from '../feedback';
import { Skeleton as MUISkeleton } from '../providers/mui';
import { Skeleton as RadixSkeleton } from '../providers/radix';

export interface SkeletonProps {
  variant?: 'text' | 'rectangular' | 'circular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | false;
  className?: string;
}

/**
 * Adaptive Skeleton Component
 * 
 * @example
 * ```tsx
 * <Skeleton variant="rectangular" width={200} height={100} />
 * <Skeleton variant="text" />
 * <Skeleton variant="circular" width={40} height={40} />
 * ```
 */
export const Skeleton: React.FC<SkeletonProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'mui') {
    return <MUISkeleton {...props} />;
  }
  
  if (provider === 'radix') {
    return <RadixSkeleton {...props} />;
  }
  
  // Transform for internal - SkeletonLoader already uses variant
  const { animation, ...restProps } = props;
  return <InternalSkeleton {...restProps} />;
};

Skeleton.displayName = 'AdapterSkeleton';
