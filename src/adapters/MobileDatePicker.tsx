/**
 * Adapter MobileDatePicker Component
 * 
 * Uses MUI X Mobile Date Picker for all providers.
 */

import React from 'react';
import { MobileDatePickerProps } from '../core/types';
import { MobileDatePicker as MUIMobileDatePicker } from '../providers/mui';

/**
 * Adaptive MobileDatePicker Component
 * 
 * Note: Uses MUI implementation for all providers (mobile-optimized picker).
 * 
 * @example
 * ```tsx
 * <MobileDatePicker
 *   value={date}
 *   onChange={setDate}
 *   label="Select Date"
 * />
 * ```
 */
export const MobileDatePicker: React.FC<MobileDatePickerProps> = (props) => {
  return <MUIMobileDatePicker {...props} />;
};

MobileDatePicker.displayName = 'AdapterMobileDatePicker';
