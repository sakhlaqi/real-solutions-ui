/**
 * Adapter Paper Component
 * 
 * Dynamically switches between internal, MUI, and Radix implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { Paper as InternalPaper, PaperProps } from '../layout';

/**
 * Adaptive Paper Component
 * 
 * @example
 * ```tsx
 * <Paper elevation={2} padding={16}>
 *   Content
 * </Paper>
 * ```
 */
export const Paper: React.FC<PaperProps> = (props) => {
  // Paper always uses internal implementation
  return <InternalPaper {...props} />;
};

Paper.displayName = 'AdapterPaper';
