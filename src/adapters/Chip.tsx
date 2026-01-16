/**
 * Adaptive Chip Component
 * 
 * Automatically switches between internal and MUI implementations based on UIProvider.
 */

import React from 'react';
import { useUIContext } from '../core/context';
import { Chip as InternalChip } from '../data-display';
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
  const { provider } = useUIContext();
  
  if (provider === 'mui') {
    return <MUIChip {...props} />;
  }
  
  // Transform for internal Chip which expects children instead of label
  const { label, variant, size, deleteIcon, ...internalProps } = props;
  return <InternalChip {...internalProps}>{label}</InternalChip>;
};

Chip.displayName = 'AdapterChip';
