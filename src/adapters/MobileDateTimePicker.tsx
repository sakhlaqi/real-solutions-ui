/**
 * Adapter MobileDateTimePicker Component
 * 
 * Uses MUI X Mobile Date Time Picker for all providers.
 */

import React from 'react';
import { MobileDateTimePickerProps } from '../core/types';
import { MobileDateTimePicker as MUIMobileDateTimePicker } from '../providers/mui';

/**
 * Adaptive MobileDateTimePicker Component
 * 
 * Note: Uses MUI implementation for all providers (mobile-optimized date and time picker).
 * 
 * @example
 * ```tsx
 * <MobileDateTimePicker
 *   value={dateTime}
 *   onChange={setDateTime}
 *   label="Meeting Time"
 * />
 * ```
 */
export const MobileDateTimePicker: React.FC<MobileDateTimePickerProps> = (props) => {
  return <MUIMobileDateTimePicker {...props} />;
};

MobileDateTimePicker.displayName = 'AdapterMobileDateTimePicker';
