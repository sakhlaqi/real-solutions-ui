/**
 * Adapter ProgressBar Component
 * 
 * Dynamically switches between internal, MUI, and Radix implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { ProgressBar as InternalProgressBar, ProgressBarProps } from '../feedback';

/**
 * Adaptive ProgressBar Component
 * 
 * @example
 * ```tsx
 * <ProgressBar value={75} max={100} />
 * ```
 */
export const ProgressBar: React.FC<ProgressBarProps> = (props) => {
  // ProgressBar always uses internal implementation
  return <InternalProgressBar {...props} />;
};

ProgressBar.displayName = 'AdapterProgressBar';
