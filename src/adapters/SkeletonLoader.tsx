/**
 * Adapter SkeletonLoader Component
 * 
 * Dynamically switches between internal, MUI, and Radix implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { SkeletonLoader as InternalSkeletonLoader, SkeletonLoaderProps } from '../feedback';

/**
 * Adaptive SkeletonLoader Component
 * 
 * @example
 * ```tsx
 * <SkeletonLoader variant="text" width={200} />
 * <SkeletonLoader variant="circular" width={40} height={40} />
 * ```
 */
export const SkeletonLoader: React.FC<SkeletonLoaderProps> = (props) => {
  // SkeletonLoader always uses internal implementation
  return <InternalSkeletonLoader {...props} />;
};

SkeletonLoader.displayName = 'AdapterSkeletonLoader';
