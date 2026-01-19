/**
 * MUI DesktopDateRangePicker Adapter
 */

import React from 'react';
// DesktopDateRangePicker requires MUI X Pro license
// import { DesktopDateRangePicker as MuiDesktopDateRangePicker } from '@mui/x-date-pickers-pro/DesktopDateRangePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDateRangePickerProps, DateRange } from '../../core/types';

export const DesktopDateRangePicker: React.FC<DesktopDateRangePickerProps> = ({
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
          DesktopDateRangePicker requires MUI X Pro license. Please install @mui/x-date-pickers-pro.
        </p>
      </div>
    </LocalizationProvider>
  );
};

DesktopDateRangePicker.displayName = 'MUIDesktopDateRangePicker';
