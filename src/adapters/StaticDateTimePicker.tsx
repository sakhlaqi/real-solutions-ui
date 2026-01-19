/**
 * Adapter StaticDateTimePicker Component
 * 
 * Uses MUI X Static Date Time Picker for all providers.
 */

import React from 'react';
import { StaticDateTimePickerProps } from '../core/types';
import { StaticDateTimePicker as MUIStaticDateTimePicker } from '../providers/mui';

/**
 * Adaptive StaticDateTimePicker Component
 * 
 * Note: Uses MUI implementation for all providers (always visible static date and time picker).
 * 
 * @example
 * ```tsx
 * <StaticDateTimePicker
 *   value={dateTime}
 *   onChange={setDateTime}
 * />
 * ```
 */
export const StaticDateTimePicker: React.FC<StaticDateTimePickerProps> = (props) => {
  return <MUIStaticDateTimePicker {...props} />;
};

StaticDateTimePicker.displayName = 'AdapterStaticDateTimePicker';
