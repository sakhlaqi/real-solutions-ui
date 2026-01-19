/**
 * Adapter DateTimePicker Component
 * 
 * Uses MUI X Date Time Picker for all providers.
 * Internal implementation is deprecated in favor of MUI's production-ready component.
 */

import React from 'react';
import { DateTimePickerProps } from '../core/types';
import { DateTimePicker as MUIDateTimePicker } from '../providers/mui';

/**
 * Adaptive DateTimePicker Component
 * 
 * Note: This component now uses MUI implementation for all providers.
 * 
 * @example
 * ```tsx
 * <DateTimePicker
 *   value={dateTime}
 *   onChange={setDateTime}
 *   label="Select Date and Time"
 * />
 * ```
 */
export const DateTimePicker: React.FC<DateTimePickerProps> = (props) => {
  return <MUIDateTimePicker {...props} />;
};

DateTimePicker.displayName = 'AdapterDateTimePicker';
