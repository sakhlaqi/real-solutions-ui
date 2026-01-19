/**
 * MUI StaticDateTimePicker Adapter
 */

import React from 'react';
import { StaticDateTimePicker as MuiStaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { StaticDateTimePickerProps } from '../../core/types';

export const StaticDateTimePicker: React.FC<StaticDateTimePickerProps> = ({
  value,
  onChange,
  disabled = false,
  readOnly = false,
  minDate,
  maxDate,
  showSeconds = false,
  disablePast = false,
  disableFuture = false,
  shouldDisableDate,
  className,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MuiStaticDateTimePicker
        value={value}
        onChange={(newValue) => onChange(newValue)}
        disabled={disabled}
        readOnly={readOnly}
        minDate={minDate}
        maxDate={maxDate}
        views={showSeconds ? ['year', 'month', 'day', 'hours', 'minutes', 'seconds'] : undefined}
        disablePast={disablePast}
        disableFuture={disableFuture}
        shouldDisableDate={shouldDisableDate}
        className={className}
      />
    </LocalizationProvider>
  );
};

StaticDateTimePicker.displayName = 'MUIStaticDateTimePicker';
