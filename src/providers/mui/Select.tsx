/**
 * MUI Select Adapter
 */

import React from 'react';
import MuiSelect from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { SelectProps } from '../../core/types';

export const Select: React.FC<SelectProps> = ({
  value,
  defaultValue,
  onChange,
  options,
  disabled = false,
  required = false,
  error,
  helperText,
  label,
  fullWidth = false,
  size = 'medium',
  className,
  id,
  name,
  multiple = false,
}) => {
  const handleChange = (event: any) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <FormControl
      fullWidth={fullWidth}
      error={!!error}
      disabled={disabled}
      required={required}
      size={size === 'large' ? 'medium' : size}
      className={className}
    >
      {label && <InputLabel id={`${id}-label`}>{label}</InputLabel>}
      <MuiSelect
        labelId={label ? `${id}-label` : undefined}
        id={id}
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        label={label}
        multiple={multiple}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
      {(error || helperText) && (
        <FormHelperText>{error || helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

Select.displayName = 'MUISelect';
