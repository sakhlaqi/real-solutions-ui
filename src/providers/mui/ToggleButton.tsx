/**
 * MUI ToggleButton Wrapper
 */

import React from 'react';
import { ToggleButton as MUIToggleButtonBase } from '@mui/material';

export interface ToggleButtonProps {
  value: string;
  selected?: boolean;
  onChange?: (value: string) => void;
  children: React.ReactNode;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  value,
  selected = false,
  onChange,
  children,
  disabled = false,
  size = 'medium',
  className,
}) => {
  const handleChange = () => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <MUIToggleButtonBase
      value={value}
      selected={selected}
      onChange={handleChange}
      disabled={disabled}
      size={size}
      className={className}
    >
      {children}
    </MUIToggleButtonBase>
  );
};

ToggleButton.displayName = 'MUIToggleButton';
