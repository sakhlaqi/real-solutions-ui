/**
 * MUI MobileDateTimePicker Adapter
 */

import React from 'react';
import { MobileDateTimePicker as MuiMobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { MobileDateTimePickerProps } from '../../core/types';

export const MobileDateTimePicker: React.FC<MobileDateTimePickerProps> = ({
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
      <MuiMobileDateTimePicker
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

MobileDateTimePicker.displayName = 'MUIMobileDateTimePicker';
