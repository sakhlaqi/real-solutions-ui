/**
 * Adapter StaticTimePicker Component
 * 
 * Uses MUI X Static Time Picker for all providers.
 */

import React from 'react';
import { StaticTimePickerProps } from '../core/types';
import { StaticTimePicker as MUIStaticTimePicker } from '../providers/mui';

/**
 * Adaptive StaticTimePicker Component
 * 
 * Note: Uses MUI implementation for all providers (always visible static time picker).
 * 
 * @example
 * ```tsx
 * <StaticTimePicker
 *   value={time}
 *   onChange={setTime}
 * />
 * ```
 */
export const StaticTimePicker: React.FC<StaticTimePickerProps> = (props) => {
  return <MUIStaticTimePicker {...props} />;
};

StaticTimePicker.displayName = 'AdapterStaticTimePicker';
