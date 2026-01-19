/**
 * MUI StaticTimePicker Adapter
 */

import React from 'react';
import { StaticTimePicker as MuiStaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { StaticTimePickerProps } from '../../core/types';

export const StaticTimePicker: React.FC<StaticTimePickerProps> = ({
  value,
  onChange,
  disabled = false,
  readOnly = false,
  minTime,
  maxTime,
  showSeconds = false,
  disablePast = false,
  disableFuture = false,
  className,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MuiStaticTimePicker
        value={value}
        onChange={(newValue) => onChange(newValue)}
        disabled={disabled}
        readOnly={readOnly}
        minTime={minTime}
        maxTime={maxTime}
        views={showSeconds ? ['hours', 'minutes', 'seconds'] : ['hours', 'minutes']}
        disablePast={disablePast}
        disableFuture={disableFuture}
        className={className}
      />
    </LocalizationProvider>
  );
};

StaticTimePicker.displayName = 'MUIStaticTimePicker';
