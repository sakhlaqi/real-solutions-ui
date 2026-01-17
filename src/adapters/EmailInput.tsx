/**
 * Adapter EmailInput Component
 * 
 * Dynamically switches between internal, MUI, and Radix implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { useUIContext } from '../core/context';
import { EmailInput as InternalEmailInput, EmailInputProps } from '../forms';
import { Input as MUIInput } from '../providers/mui';
import { Input as RadixInput } from '../providers/radix';

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
  const { provider } = useUIContext();
  
  if (provider === 'mui') {
    return <MUIInput {...props as any} type="email" />;
  }
  
  if (provider === 'radix') {
    return <RadixInput {...props as any} type="email" />;
  }
  
  return <InternalEmailInput {...props} />;
};

EmailInput.displayName = 'AdapterEmailInput';
