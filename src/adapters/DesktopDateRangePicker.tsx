/**
 * Adapter DesktopDateRangePicker Component
 * 
 * Uses MUI DesktopDateRangePicker for all providers.
 * 
 * Note: DateRangePicker requires MUI X Pro license for full functionality.
 */

import React from 'react';
import { DesktopDateRangePickerProps } from '../core/types';
import { DesktopDateRangePicker as MUIDesktopDateRangePicker } from '../providers/mui';

/**
 * Adaptive DesktopDateRangePicker Component
 * 
 * Desktop-optimized date range picker. Requires MUI X Pro.
 * 
 * @example
 * ```tsx
 * <DesktopDateRangePicker
 *   value={{ start: startDate, end: endDate }}
 *   onChange={(range) => {
 *     setStartDate(range.start);
 *     setEndDate(range.end);
 *   }}
 * />
 * ```
 */
export const DesktopDateRangePicker: React.FC<DesktopDateRangePickerProps> = (props) => {
  return <MUIDesktopDateRangePicker {...props} />;
};

DesktopDateRangePicker.displayName = 'AdapterDesktopDateRangePicker';
