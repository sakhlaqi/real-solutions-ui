/**
 * MUI RadioGroup Wrapper Component
 */

import React from 'react';
import {
  RadioGroup as MUIRadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
} from '@mui/material';

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  value: string;
  onChange: (value: string) => void;
  options: RadioOption[];
  name?: string;
  row?: boolean;
  disabled?: boolean;
}

/**
 * MUI RadioGroup wrapper component
 */
export const RadioGroup: React.FC<RadioGroupProps> = ({
  value,
  onChange,
  options,
  name,
  row = false,
  disabled = false,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <FormControl component="fieldset" disabled={disabled}>
      <MUIRadioGroup name={name} value={value} onChange={handleChange} row={row}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
            disabled={option.disabled || disabled}
          />
        ))}
      </MUIRadioGroup>
    </FormControl>
  );
};

RadioGroup.displayName = 'MUIRadioGroup';
