/**
 * Adapter MobileDateRangePicker Component
 * 
 * Uses MUI MobileDateRangePicker for all providers.
 * 
 * Note: DateRangePicker requires MUI X Pro license for full functionality.
 */

import React from 'react';
import { MobileDateRangePickerProps } from '../core/types';
import { MobileDateRangePicker as MUIMobileDateRangePicker } from '../providers/mui';

/**
 * Adaptive MobileDateRangePicker Component
 * 
 * Mobile-optimized date range picker. Requires MUI X Pro.
 * 
 * @example
 * ```tsx
 * <MobileDateRangePicker
 *   value={{ start: startDate, end: endDate }}
 *   onChange={(range) => {
 *     setStartDate(range.start);
 *     setEndDate(range.end);
 *   }}
 * />
 * ```
 */
export const MobileDateRangePicker: React.FC<MobileDateRangePickerProps> = (props) => {
  return <MUIMobileDateRangePicker {...props} />;
};

MobileDateRangePicker.displayName = 'AdapterMobileDateRangePicker';
