/**
 * Adapter PasswordInput Component
 * 
 * Uses MUI Input with type="password" for all providers.
 */

import React from 'react';
import { Input as MUIInput } from '../providers/mui';
import { BaseInputProps } from '../core/types';

export type PasswordInputProps = Omit<BaseInputProps, 'type'>;

/**
 * Adaptive PasswordInput Component
 * 
 * @example
 * ```tsx
 * <PasswordInput
 *   value={password}
 *   onChange={(e) => setPassword(e.target.value)}
 *   label="Password"
 * />
 * ```
 */
export const PasswordInput: React.FC<PasswordInputProps> = (props) => {
  return <MUIInput {...props as any} type="password" />;
};

PasswordInput.displayName = 'AdapterPasswordInput';
