/**
 * Adapter StaticDatePicker Component
 * 
 * Uses MUI X Static Date Picker for all providers.
 */

import React from 'react';
import { StaticDatePickerProps } from '../core/types';
import { StaticDatePicker as MUIStaticDatePicker } from '../providers/mui';

/**
 * Adaptive StaticDatePicker Component
 * 
 * Note: Uses MUI implementation for all providers (always-visible calendar).
 * 
 * @example
 * ```tsx
 * <StaticDatePicker
 *   value={date}
 *   onChange={setDate}
 * />
 * ```
 */
export const StaticDatePicker: React.FC<StaticDatePickerProps> = (props) => {
  return <MUIStaticDatePicker {...props} />;
};

StaticDatePicker.displayName = 'AdapterStaticDatePicker';
