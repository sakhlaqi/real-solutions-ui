/**
 * Adapter ErrorState Component
 * 
 * Dynamically switches between internal, MUI, and Radix implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { ErrorState as InternalErrorState, ErrorStateProps } from '../core/components/feedback';

/**
 * Adaptive ErrorState Component
 * 
 * @example
 * ```tsx
 * <ErrorState
 *   title="Something went wrong"
 *   message="Please try again later"
 *   onRetry={handleRetry}
 * />
 * ```
 */
export const ErrorState: React.FC<ErrorStateProps> = (props) => {
  // ErrorState always uses internal implementation
  return <InternalErrorState {...props} />;
};

ErrorState.displayName = 'AdapterErrorState';
