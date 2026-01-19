/**
 * Adaptive Divider Component
 * 
 * Uses MUI Divider for all providers.
 */

import React from 'react';
import { Divider as MUIDivider } from '../providers/mui';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'fullWidth' | 'inset' | 'middle';
  flexItem?: boolean;
  className?: string;
}

/**
 * Adaptive Divider Component
 * 
 * @example
 * ```tsx
 * <Divider />
 * <Divider orientation="vertical" flexItem />
 * ```
 */
export const Divider: React.FC<DividerProps> = (props) => {
  return <MUIDivider {...props} />;
};

Divider.displayName = 'AdapterDivider';
