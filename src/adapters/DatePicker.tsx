/**
 * Adapter DatePicker Component
 * 
 * Uses MUI X Date Picker for all providers.
 * Internal implementation is deprecated in favor of MUI's production-ready date picker.
 */

import React from 'react';
import { BaseDatePickerProps } from '../core/types';
import { DatePicker as MUIDatePicker } from '../providers/mui';

/**
 * Adaptive DatePicker Component
 * 
 * Note: This component now uses MUI implementation for both 'mui' and 'internal' providers.
 * The internal DatePicker implementation is deprecated as MUI X provides full functionality.
 * 
 * @example
 * ```tsx
 * <DatePicker 
 *   label="Birth Date"
 *   value={birthDate}
 *   onChange={(date) => setBirthDate(date)}
 * />
 * ```
 */
export const DatePicker: React.FC<BaseDatePickerProps> = (props) => {
  // Always use MUI implementation - internal DatePicker is deprecated
  return <MUIDatePicker {...props} />;
};

DatePicker.displayName = 'AdapterDatePicker';
