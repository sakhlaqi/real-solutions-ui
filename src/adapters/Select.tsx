/**
 * Adapter Select Component
 * 
 * Uses MUI Select for all providers.
 * Internal implementation is deprecated in favor of MUI's production-ready component.
 */

import React from 'react';
import { SelectProps } from '../core/types';
import { Select as MUISelect } from '../providers/mui';

/**
 * Adaptive Select Component
 * 
 * Note: This component now uses MUI implementation for all providers.
 * 
 * @example
 * ```tsx
 * <Select 
 *   label="Country"
 *   options={[{ value: 'us', label: 'United States' }]}
 *   value={country}
 *   onChange={(value) => setCountry(value)}
 * />
 * ```
 */
export const Select: React.FC<SelectProps> = (props) => {
  return <MUISelect {...props} />;
};

Select.displayName = 'AdapterSelect';
