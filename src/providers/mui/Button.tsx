/**
 * MUI Button Adapter
 * 
 * Wraps Material-UI Button to conform to internal button interface.
 */

import React from 'react';
import MuiButton from '@mui/material/Button';
import { BaseButtonProps } from '../../core/types';

const colorMap = {
  primary: 'primary' as const,
  secondary: 'secondary' as const,
  error: 'error' as const,
  warning: 'warning' as const,
  info: 'info' as const,
  success: 'success' as const,
};

export const Button = React.forwardRef<HTMLButtonElement, BaseButtonProps>(({
  children,
  onClick,
  disabled = false,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  fullWidth = false,
  startIcon,
  endIcon,
  className,
  type = 'button',
}, ref) => {
  return (
    <MuiButton
      ref={ref}
      onClick={onClick}
      disabled={disabled}
      variant={variant}
      color={colorMap[color] || 'primary'}
      size={size}
      fullWidth={fullWidth}
      startIcon={startIcon}
      endIcon={endIcon}
      className={className}
      type={type}
    >
      {children}
    </MuiButton>
  );
});

Button.displayName = 'MUIButton';
