/**
 * Adapter TimePicker Component
 * 
 * Uses MUI X Time Picker for all providers.
 * Internal implementation is deprecated in favor of MUI's production-ready time picker.
 */

import React from 'react';
import { TimePickerProps } from '../core/types';
import { TimePicker as MUITimePicker } from '../providers/mui';

/**
 * Adaptive TimePicker Component
 * 
 * Note: This component now uses MUI implementation for all providers.
 * The internal TimePicker is deprecated as MUI X provides full functionality.
 * 
 * @example
 * ```tsx
 * <TimePicker
 *   value={time}
 *   onChange={setTime}
 *   label="Select Time"
 *   format="12"
 * />
 * ```
 */
export const TimePicker: React.FC<TimePickerProps> = (props) => {
  // Always use MUI implementation
  return <MUITimePicker {...props} />;
};

TimePicker.displayName = 'AdapterTimePicker';
