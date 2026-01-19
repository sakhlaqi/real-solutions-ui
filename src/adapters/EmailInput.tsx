/**
 * Adapter EmailInput Component
 * 
 * Uses MUI Input with type="email" for all providers.
 */

import React from 'react';
import { Input as MUIInput } from '../providers/mui';
import { BaseInputProps } from '../core/types';

export type EmailInputProps = Omit<BaseInputProps, 'type'>;

/**
 * Adaptive EmailInput Component
 * 
 * @example
 * ```tsx
 * <EmailInput
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 *   label="Email Address"
 * />
 * ```
 */
export const EmailInput: React.FC<EmailInputProps> = (props) => {
  return <MUIInput {...props as any} type="email" />;
};

EmailInput.displayName = 'AdapterEmailInput';
