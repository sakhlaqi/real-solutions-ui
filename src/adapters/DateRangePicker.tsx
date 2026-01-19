/**
 * Adapter DateRangePicker Component
 * 
 * Uses MUI DateRangePicker for all providers.
 * 
 * Note: DateRangePicker requires MUI X Pro license for full functionality.
 */

import React from 'react';
import { DateRangePickerProps } from '../core/types';
import { DateRangePicker as MUIDateRangePicker } from '../providers/mui';

/**
 * Adaptive DateRangePicker Component
 * 
 * Date range picker (start and end dates). Requires MUI X Pro.
 * 
 * @example
 * ```tsx
 * <DateRangePicker
 *   value={{ start: startDate, end: endDate }}
 *   onChange={(range) => {
 *     setStartDate(range.start);
 *     setEndDate(range.end);
 *   }}
 *   label="Date Range"
 * />
 * ```
 */
export const DateRangePicker: React.FC<DateRangePickerProps> = (props) => {
  return <MUIDateRangePicker {...props} />;
};

DateRangePicker.displayName = 'AdapterDateRangePicker';
