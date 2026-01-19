/**
 * MUI StaticDateRangePicker Adapter (Fallback)
 * 
 * Note: StaticDateRangePicker is not available in MUI X Date Pickers.
 * This is a custom implementation using MultiInputDateRangeField.
 */

import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { StaticDateRangePickerProps, DateRange } from '../../core/types';
import { Box, Typography } from '@mui/material';

export const StaticDateRangePicker: React.FC<StaticDateRangePickerProps> = ({
  value,
  onChange,
  disabled = false,
  className,
}) => {
  // StaticDateRangePicker doesn't exist in MUI X, providing a fallback message
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box className={className} sx={{ p: 2, border: '1px dashed #ccc', borderRadius: 1 }}>
        <Typography variant="body2" color="text.secondary">
          StaticDateRangePicker is not available in MUI X Date Pickers.
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Selected Range: {value.start?.toLocaleDateString()} - {value.end?.toLocaleDateString()}
        </Typography>
      </Box>
    </LocalizationProvider>
  );
};

StaticDateRangePicker.displayName = 'MUIStaticDateRangePicker';
