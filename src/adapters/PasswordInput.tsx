/**
 * Adapter PasswordInput Component
 * 
 * Dynamically switches between internal, MUI, and Radix implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { useUIContext } from '../core/context';
import { PasswordInput as InternalPasswordInput, PasswordInputProps } from '../forms';
import { Input as MUIInput } from '../providers/mui';
import { Input as RadixInput } from '../providers/radix';

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
  const { provider } = useUIContext();
  
  if (provider === 'mui') {
    return <MUIInput {...props} type="password" />;
  }
  
  if (provider === 'radix') {
    return <RadixInput {...props} type="password" />;
  }
  
  return <InternalPasswordInput {...props} />;
};

PasswordInput.displayName = 'AdapterPasswordInput';
