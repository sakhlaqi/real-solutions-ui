/**
 * Adapter DatePicker Component
 * 
 * Dynamically switches between internal and MUI date picker implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { BaseDatePickerProps } from '../core/types';
import { useUIContext } from '../core/context';
import { DatePicker as InternalDatePicker } from '../forms';
import { DatePicker as MUIDatePicker } from '../providers/mui';

/**
 * Adaptive DatePicker Component
 * 
 * Automatically switches between internal and MUI implementations based on UIProvider.
 * 
 * @example
 * ```tsx
 * <DatePicker 
 *   label="Birth Date"
 *   value={birthDate}
 *   onChange={(date) => setBirthDate(date)}
 * />
 * ```
 */
export const DatePicker: React.FC<BaseDatePickerProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'mui') {
    return <MUIDatePicker {...props} />;
  }
  
  // Ensure format is one of the valid internal formats
  const { format, ...restProps } = props;
  const validFormat = format && ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'].includes(format)
    ? (format as 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD')
    : 'MM/DD/YYYY';
  
  return <InternalDatePicker {...restProps} format={validFormat} />;
};

DatePicker.displayName = 'AdapterDatePicker';
