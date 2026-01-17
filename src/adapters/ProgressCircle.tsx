/**
 * Adapter ProgressCircle Component
 * 
 * Dynamically switches between internal, MUI, and Radix implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { ProgressCircle as InternalProgressCircle, ProgressCircleProps } from '../feedback';

/**
 * Adaptive ProgressCircle Component
 * 
 * @example
 * ```tsx
 * <ProgressCircle value={75} size="medium" />
 * ```
 */
export const ProgressCircle: React.FC<ProgressCircleProps> = (props) => {
  // ProgressCircle always uses internal implementation
  return <InternalProgressCircle {...props} />;
};

ProgressCircle.displayName = 'AdapterProgressCircle';
