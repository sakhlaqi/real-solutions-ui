/**
 * MUI MobileDateRangePicker Adapter
 */

import React from 'react';
// MobileDateRangePicker requires MUI X Pro license
// import { MobileDateRangePicker as MuiMobileDateRangePicker } from '@mui/x-date-pickers-pro/MobileDateRangePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { MobileDateRangePickerProps, DateRange } from '../../core/types';

export const MobileDateRangePicker: React.FC<MobileDateRangePickerProps> = ({
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
  calendars = 1,
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
          MobileDateRangePicker requires MUI X Pro license. Please install @mui/x-date-pickers-pro.
        </p>
      </div>
    </LocalizationProvider>
  );
};

MobileDateRangePicker.displayName = 'MUIMobileDateRangePicker';
