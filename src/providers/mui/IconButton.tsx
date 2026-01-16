/**
 * MUI IconButton Adapter
 */

import React from 'react';
import MuiIconButton from '@mui/material/IconButton';
import { IconButtonProps } from '../../core/types';

const colorMap = {
  primary: 'primary' as const,
  secondary: 'secondary' as const,
  error: 'error' as const,
  warning: 'warning' as const,
  info: 'info' as const,
  success: 'success' as const,
};

export const IconButton: React.FC<IconButtonProps> = ({
  children,
  onClick,
  disabled = false,
  color = 'primary',
  size = 'medium',
  className,
  'aria-label': ariaLabel,
}) => {
  return (
    <MuiIconButton
      onClick={onClick}
      disabled={disabled}
      color={colorMap[color] || 'default'}
      size={size}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </MuiIconButton>
  );
};

IconButton.displayName = 'MUIIconButton';
