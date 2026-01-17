/**
 * Adapter SuccessState Component
 * 
 * Dynamically switches between internal, MUI, and Radix implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { SuccessState as InternalSuccessState, SuccessStateProps } from '../feedback';

/**
 * Adaptive SuccessState Component
 * 
 * @example
 * ```tsx
 * <SuccessState
 *   title="Success!"
 *   message="Your changes have been saved"
 * />
 * ```
 */
export const SuccessState: React.FC<SuccessStateProps> = (props) => {
  // SuccessState always uses internal implementation
  return <InternalSuccessState {...props} />;
};

SuccessState.displayName = 'AdapterSuccessState';
