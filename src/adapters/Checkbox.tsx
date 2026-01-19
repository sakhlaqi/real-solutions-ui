/**
 * Adapter Checkbox Component
 * 
 * Uses MUI Checkbox for all providers.
 * Internal implementation is deprecated in favor of MUI's production-ready component.
 */

import React from 'react';
import { CheckboxProps } from '../core/types';
import { Checkbox as MUICheckbox } from '../providers/mui';

/**
 * Adaptive Checkbox Component
 * 
 * Note: This component now uses MUI implementation for all providers.
 * 
 * @example
 * ```tsx
 * <Checkbox 
 *   label="Accept terms"
 *   checked={accepted}
 *   onChange={(e) => setAccepted(e.target.checked)}
 * />
 * ```
 */
export const Checkbox: React.FC<CheckboxProps> = (props) => {
  return <MUICheckbox {...props} />;
};

Checkbox.displayName = 'AdapterCheckbox';
