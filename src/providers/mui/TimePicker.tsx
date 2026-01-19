/**
 * MUI TimePicker Adapter
 */

import React from 'react';
import { TimePicker as MuiTimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TimePickerProps } from '../../core/types';

export const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  label,
  disabled = false,
  readOnly = false,
  error,
  helperText,
  minTime,
  maxTime,
  format,
  fullWidth = false,
  required = false,
  showSeconds = false,
  disablePast = false,
  disableFuture = false,
  className,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MuiTimePicker
        label={label}
        value={value}
        onChange={(newValue) => onChange(newValue)}
        disabled={disabled}
        readOnly={readOnly}
        minTime={minTime}
        maxTime={maxTime}
        format={format}
        views={showSeconds ? ['hours', 'minutes', 'seconds'] : ['hours', 'minutes']}
        disablePast={disablePast}
        disableFuture={disableFuture}
        slotProps={{
          textField: {
            fullWidth,
            required,
            error: !!error,
            helperText: error || helperText,
            className,
          },
        }}
      />
    </LocalizationProvider>
  );
};

TimePicker.displayName = 'MUITimePicker';
