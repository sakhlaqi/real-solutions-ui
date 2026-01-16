/**
 * MUI Checkbox Adapter
 */

import React from 'react';
import MuiCheckbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { CheckboxProps } from '../../core/types';

const colorMap = {
  primary: 'primary' as const,
  secondary: 'secondary' as const,
  error: 'error' as const,
  warning: 'warning' as const,
  info: 'info' as const,
  success: 'success' as const,
};

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  label,
  indeterminate = false,
  color = 'primary',
  size = 'medium',
  className,
}) => {
  const checkbox = (
    <MuiCheckbox
      checked={checked}
      defaultChecked={defaultChecked}
      onChange={onChange}
      disabled={disabled}
      indeterminate={indeterminate}
      color={colorMap[color] || 'primary'}
      size={size}
    />
  );

  if (label) {
    return (
      <FormControlLabel
        control={checkbox}
        label={label}
        className={className}
        disabled={disabled}
      />
    );
  }

  return <div className={className}>{checkbox}</div>;
};

Checkbox.displayName = 'MUICheckbox';
