/**
 * Adapter Paper Component
 * 
 * Uses MUI Paper implementation.
 * Internal implementation is deprecated.
 */

import React from 'react';
import { Paper as MUIPaper, MUIPaperProps } from '../providers/mui';

export type PaperProps = MUIPaperProps;

/**
 * Adaptive Paper Component
 * 
 * @example
 * ```tsx
 * <Paper elevation={2}>
 *   Content
 * </Paper>
 * ```
 */
export const Paper: React.FC<PaperProps> = (props) => {
  return <MUIPaper {...props} />;
};

Paper.displayName = 'AdapterPaper';
