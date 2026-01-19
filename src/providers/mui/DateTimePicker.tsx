/**
 * MUI DateTimePicker Adapter
 */

import React from 'react';
import { DateTimePicker as MuiDateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePickerProps } from '../../core/types';

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  value,
  onChange,
  label,
  disabled = false,
  readOnly = false,
  error,
  helperText,
  minDate,
  maxDate,
  format,
  fullWidth = false,
  required = false,
  showSeconds = false,
  disablePast = false,
  disableFuture = false,
  shouldDisableDate,
  className,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MuiDateTimePicker
        label={label}
        value={value}
        onChange={(newValue) => onChange(newValue)}
        disabled={disabled}
        readOnly={readOnly}
        minDate={minDate}
        maxDate={maxDate}
        format={format}
        views={showSeconds ? ['year', 'month', 'day', 'hours', 'minutes', 'seconds'] : undefined}
        disablePast={disablePast}
        disableFuture={disableFuture}
        shouldDisableDate={shouldDisableDate}
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

DateTimePicker.displayName = 'MUIDateTimePicker';
