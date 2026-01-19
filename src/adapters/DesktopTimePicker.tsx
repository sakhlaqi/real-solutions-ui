/**
 * Adapter DesktopTimePicker Component
 * 
 * Uses MUI X Desktop Time Picker for all providers.
 */

import React from 'react';
import { DesktopTimePickerProps } from '../core/types';
import { DesktopTimePicker as MUIDesktopTimePicker } from '../providers/mui';

/**
 * Adaptive DesktopTimePicker Component
 * 
 * Note: Uses MUI implementation for all providers (desktop-optimized time picker).
 * 
 * @example
 * ```tsx
 * <DesktopTimePicker
 *   value={time}
 *   onChange={setTime}
 *   label="Select Time"
 * />
 * ```
 */
export const DesktopTimePicker: React.FC<DesktopTimePickerProps> = (props) => {
  return <MUIDesktopTimePicker {...props} />;
};

DesktopTimePicker.displayName = 'AdapterDesktopTimePicker';
