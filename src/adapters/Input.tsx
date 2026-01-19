/**
 * Adapter Input Component
 * 
 * Uses MUI Input (TextField) for all providers.
 * Internal implementation is deprecated in favor of MUI's production-ready component.
 */

import React from 'react';
import { BaseInputProps } from '../core/types';
import { Input as MUIInput } from '../providers/mui';

/**
 * Adaptive Input Component
 * 
 * Note: This component now uses MUI implementation for all providers.
 * 
 * @example
 * ```tsx
 * <Input label="Email" placeholder="Enter email" />
 * ```
 */
export const Input: React.FC<BaseInputProps> = (props) => {
  return <MUIInput {...props} />;
};

Input.displayName = 'AdapterInput';
