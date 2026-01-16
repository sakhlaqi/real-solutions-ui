/**
 * MUI Input Adapter
 */

import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { BaseInputProps } from '../../core/types';

export const Input: React.FC<BaseInputProps> = ({
  value,
  defaultValue,
  onChange,
  placeholder,
  disabled = false,
  required = false,
  error,
  helperText,
  label,
  fullWidth = false,
  size = 'medium',
  startAdornment,
  endAdornment,
  className,
  id,
  name,
  autoComplete,
}) => {
  return (
    <TextField
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      error={!!error}
      helperText={error || helperText}
      label={label}
      fullWidth={fullWidth}
      size={size === 'large' ? 'medium' : size}
      className={className}
      id={id}
      name={name}
      autoComplete={autoComplete}
      InputProps={{
        startAdornment: startAdornment ? (
          <InputAdornment position="start">{startAdornment}</InputAdornment>
        ) : undefined,
        endAdornment: endAdornment ? (
          <InputAdornment position="end">{endAdornment}</InputAdornment>
        ) : undefined,
      }}
    />
  );
};

Input.displayName = 'MUIInput';
