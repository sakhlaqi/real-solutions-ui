/**
 * Adapter MobileTimePicker Component
 * 
 * Uses MUI X Mobile Time Picker for all providers.
 */

import React from 'react';
import { MobileTimePickerProps } from '../core/types';
import { MobileTimePicker as MUIMobileTimePicker } from '../providers/mui';

/**
 * Adaptive MobileTimePicker Component
 * 
 * Note: Uses MUI implementation for all providers (mobile-optimized time picker).
 * 
 * @example
 * ```tsx
 * <MobileTimePicker
 *   value={time}
 *   onChange={setTime}
 *   label="Select Time"
 * />
 * ```
 */
export const MobileTimePicker: React.FC<MobileTimePickerProps> = (props) => {
  return <MUIMobileTimePicker {...props} />;
};

MobileTimePicker.displayName = 'AdapterMobileTimePicker';
