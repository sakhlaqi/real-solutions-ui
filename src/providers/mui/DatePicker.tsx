/**
 * MUI DatePicker Adapter
 */

import React from 'react';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { BaseDatePickerProps } from '../../core/types';

export const DatePicker: React.FC<BaseDatePickerProps> = ({
  value,
  onChange,
  label,
  disabled = false,
  error,
  helperText,
  minDate,
  maxDate,
  fullWidth = false,
  className,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MuiDatePicker
        label={label}
        value={value}
        onChange={(newValue) => onChange(newValue)}
        disabled={disabled}
        minDate={minDate}
        maxDate={maxDate}
        slotProps={{
          textField: {
            fullWidth,
            error: !!error,
            helperText: error || helperText,
            className,
          },
        }}
      />
    </LocalizationProvider>
  );
};

DatePicker.displayName = 'MUIDatePicker';
