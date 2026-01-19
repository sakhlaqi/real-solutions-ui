/**
 * Adapter StaticDateRangePicker Component
 * 
 * Uses MUI StaticDateRangePicker for all providers.
 * 
 * Note: StaticDateRangePicker is not available in MUI X Date Pickers.
 */

import React from 'react';
import { StaticDateRangePickerProps } from '../core/types';
import { StaticDateRangePicker as MUIStaticDateRangePicker } from '../providers/mui';

/**
 * Adaptive StaticDateRangePicker Component
 * 
 * Always visible static date range picker (no input field).
 * 
 * @example
 * ```tsx
 * <StaticDateRangePicker
 *   value={{ start: startDate, end: endDate }}
 *   onChange={(range) => {
 *     setStartDate(range.start);
 *     setEndDate(range.end);
 *   }}
 * />
 * ```
 */
export const StaticDateRangePicker: React.FC<StaticDateRangePickerProps> = (props) => {
  return <MUIStaticDateRangePicker {...props} />;
};

StaticDateRangePicker.displayName = 'AdapterStaticDateRangePicker';
