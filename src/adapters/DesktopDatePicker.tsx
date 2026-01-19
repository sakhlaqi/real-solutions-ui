/**
 * Adapter DesktopDatePicker Component
 * 
 * Uses MUI X Desktop Date Picker for all providers.
 * Internal implementation is deprecated in favor of MUI's desktop-optimized picker.
 */

import React from 'react';
import { DesktopDatePickerProps } from '../core/types';
import { DesktopDatePicker as MUIDesktopDatePicker } from '../providers/mui';

/**
 * Adaptive DesktopDatePicker Component
 * 
 * Note: This component now uses MUI implementation for both 'mui' and 'internal' providers.
 * Desktop-optimized date picker with keyboard navigation and calendar popup.
 * 
 * @example
 * ```tsx
 * <DesktopDatePicker
 *   value={date}
 *   onChange={setDate}
 *   label="Select Date"
 * />
 * ```
 */
export const DesktopDatePicker: React.FC<DesktopDatePickerProps> = (props) => {
  // Always use MUI implementation - internal version deprecated
  return <MUIDesktopDatePicker {...props} />;
};

DesktopDatePicker.displayName = 'AdapterDesktopDatePicker';
