/**
 * MUI DateRangePicker Adapter
 */

import React from 'react';
// DateRangePicker requires MUI X Pro license
// import { DateRangePicker as MuiDateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateRangePickerProps, DateRange } from '../../core/types';

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
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
  disablePast = false,
  disableFuture = false,
  shouldDisableDate,
  calendars = 2,
  className,
}) => {
  // Note: DateRangePicker is a PRO component, so this will only work with MUI X Pro license
  // For the free version, we'll provide a fallback message
  
  const rangeValue: [Date | null, Date | null] = [value.start, value.end];
  
  const handleChange = (newValue: [Date | null, Date | null]) => {
    const newRange: DateRange = {
      start: newValue[0],
      end: newValue[1],
    };
    onChange(newRange);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div style={{ padding: '16px', border: '1px dashed #ccc', borderRadius: '4px' }}>
        <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
          DateRangePicker requires MUI X Pro license. Please install @mui/x-date-pickers-pro.
        </p>
      </div>
    </LocalizationProvider>
  );
};

DateRangePicker.displayName = 'MUIDateRangePicker';
