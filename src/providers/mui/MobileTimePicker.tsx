/**
 * MUI MobileTimePicker Adapter
 */

import React from 'react';
import { MobileTimePicker as MuiMobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { MobileTimePickerProps } from '../../core/types';

export const MobileTimePicker: React.FC<MobileTimePickerProps> = ({
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
      <MuiMobileTimePicker
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

MobileTimePicker.displayName = 'MUIMobileTimePicker';
