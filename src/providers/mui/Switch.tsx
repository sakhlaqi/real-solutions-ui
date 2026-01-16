/**
 * MUI Switch Wrapper Component
 */

import React from 'react';
import { Switch as MUISwitch, FormControlLabel } from '@mui/material';

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  color?: 'primary' | 'secondary' | 'default';
  size?: 'small' | 'medium';
}

/**
 * MUI Switch wrapper component
 */
export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  color = 'primary',
  size = 'medium',
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  const switchComponent = (
    <MUISwitch
      checked={checked}
      onChange={handleChange}
      disabled={disabled}
      color={color}
      size={size}
    />
  );

  if (label) {
    return (
      <FormControlLabel
        control={switchComponent}
        label={label}
        disabled={disabled}
      />
    );
  }

  return switchComponent;
};

Switch.displayName = 'MUISwitch';
