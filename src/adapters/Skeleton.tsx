/**
 * Adaptive Skeleton Component
 * 
 * Uses MUI Skeleton for all providers.
 */

import React from 'react';
import { Skeleton as MUISkeleton } from '../providers/mui';

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
  return <MUISkeleton {...props} />;
};

Skeleton.displayName = 'AdapterSkeleton';
