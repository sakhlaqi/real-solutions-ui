/**
 * MUI ButtonGroup Wrapper
 */

import React from 'react';
import { ButtonGroup as MUIButtonGroupBase } from '@mui/material';

export interface ButtonGroupProps {
  children: React.ReactNode;
  variant?: 'text' | 'outlined' | 'contained';
  size?: 'small' | 'medium' | 'large';
  orientation?: 'horizontal' | 'vertical';
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  variant = 'outlined',
  size = 'medium',
  orientation = 'horizontal',
  disabled = false,
  fullWidth = false,
  className,
}) => {
  return (
    <MUIButtonGroupBase
      variant={variant}
      size={size}
      orientation={orientation}
      disabled={disabled}
      fullWidth={fullWidth}
      className={className}
    >
      {children}
    </MUIButtonGroupBase>
  );
};

ButtonGroup.displayName = 'MUIButtonGroup';
