/**
 * Adapter DesktopDateTimePicker Component
 * 
 * Uses MUI X Desktop Date Time Picker for all providers.
 */

import React from 'react';
import { DesktopDateTimePickerProps } from '../core/types';
import { DesktopDateTimePicker as MUIDesktopDateTimePicker } from '../providers/mui';

/**
 * Adaptive DesktopDateTimePicker Component
 * 
 * Note: Uses MUI implementation for all providers (desktop-optimized date and time picker).
 * 
 * @example
 * ```tsx
 * <DesktopDateTimePicker
 *   value={dateTime}
 *   onChange={setDateTime}
 *   label="Appointment Time"
 * />
 * ```
 */
export const DesktopDateTimePicker: React.FC<DesktopDateTimePickerProps> = (props) => {
  return <MUIDesktopDateTimePicker {...props} />;
};

DesktopDateTimePicker.displayName = 'AdapterDesktopDateTimePicker';
