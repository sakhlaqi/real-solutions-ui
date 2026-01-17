/**
 * Adapter DateTimePicker Component
 * 
 * Dynamically switches between internal, MUI, and Radix implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { DateTimePicker as InternalDateTimePicker, DateTimePickerProps } from '../forms';

/**
 * Adaptive DateTimePicker Component
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
  // DateTimePicker always uses internal implementation for consistency
  return <InternalDateTimePicker {...props} />;
};

DateTimePicker.displayName = 'AdapterDateTimePicker';
