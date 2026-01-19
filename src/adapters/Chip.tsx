/**
 * Adaptive Chip Component
 * 
 * Uses MUI Chip for all providers.
 */

import React from 'react';
import { Chip as MUIChip } from '../providers/mui';

export interface ChipProps {
  label: string;
  color?: 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  variant?: 'filled' | 'outlined';
  size?: 'small' | 'medium';
  onDelete?: () => void;
  onClick?: () => void;
  icon?: React.ReactElement;
  deleteIcon?: React.ReactElement;
}

/**
 * Adaptive Chip Component
 * 
 * @example
 * ```tsx
 * <Chip label="Active" color="success" />
 * <Chip label="Tag" onDelete={() => handleDelete()} />
 * ```
 */
export const Chip: React.FC<ChipProps> = (props) => {
  return <MUIChip {...props} />;
};

Chip.displayName = 'AdapterChip';
