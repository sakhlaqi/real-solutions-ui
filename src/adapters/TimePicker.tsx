/**
 * Adapter TimePicker Component
 * 
 * Dynamically switches between internal, MUI, and Radix implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { TimePicker as InternalTimePicker, TimePickerProps } from '../forms';

/**
 * Adaptive TimePicker Component
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
  // TimePicker always uses internal implementation for consistency
  return <InternalTimePicker {...props} />;
};

TimePicker.displayName = 'AdapterTimePicker';
