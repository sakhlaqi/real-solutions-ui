/**
 * MUI Chip Wrapper Component
 */

import React from 'react';
import { Chip as MUIChip } from '@mui/material';

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
 * MUI Chip wrapper component
 */
export const Chip: React.FC<ChipProps> = ({
  label,
  color = 'default',
  variant = 'filled',
  size = 'medium',
  onDelete,
  onClick,
  icon,
  deleteIcon,
}) => {
  return (
    <MUIChip
      label={label}
      color={color}
      variant={variant}
      size={size}
      onDelete={onDelete}
      onClick={onClick}
      icon={icon}
      deleteIcon={deleteIcon}
    />
  );
};

Chip.displayName = 'MUIChip';
