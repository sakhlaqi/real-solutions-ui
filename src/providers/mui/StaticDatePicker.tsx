/**
 * MUI StaticDatePicker Adapter
 */

import React from 'react';
import { StaticDatePicker as MuiStaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { StaticDatePickerProps } from '../../core/types';

export const StaticDatePicker: React.FC<StaticDatePickerProps> = ({
  value,
  onChange,
  label,
  disabled = false,
  readOnly = false,
  minDate,
  maxDate,
  format,
  required = false,
  disablePast = false,
  disableFuture = false,
  shouldDisableDate,
  className,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MuiStaticDatePicker
        value={value}
        onChange={(newValue) => onChange(newValue)}
        disabled={disabled}
        readOnly={readOnly}
        minDate={minDate}
        maxDate={maxDate}
        displayStaticWrapperAs="desktop"
        disablePast={disablePast}
        disableFuture={disableFuture}
        shouldDisableDate={shouldDisableDate}
        className={className}
      />
    </LocalizationProvider>
  );
};

StaticDatePicker.displayName = 'MUIStaticDatePicker';
