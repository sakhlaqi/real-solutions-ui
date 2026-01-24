/**
 * Adapter Spacer Component
 * 
 * Dynamically switches between internal, MUI, and Radix implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { Spacer as InternalSpacer, SpacerProps } from '../core/components/layout';

/**
 * Adaptive Spacer Component
 * 
 * @example
 * ```tsx
 * <Spacer size="lg" />
 * <Spacer size="md" direction="horizontal" />
 * ```
 */
export const Spacer: React.FC<SpacerProps> = (props) => {
  // Spacer always uses internal implementation
  return <InternalSpacer {...props} />;
};

Spacer.displayName = 'AdapterSpacer';
