/**
 * Adaptive InputOTP Component
 * 
 * Automatically switches between provider implementations based on UIProvider.
 */

import React from 'react';
import { useUIContext } from '../core/context';
import { InputOTP as ShadcnInputOTP } from '../providers/shadcn';

export interface InputOTPProps {
  value?: string;
  onChange?: (value: string) => void;
  maxLength?: number;
  disabled?: boolean;
  className?: string;
}

/**
 * Adaptive InputOTP Component
 * 
 * @example
 * ```tsx
 * <InputOTP
 *   maxLength={6}
 *   value={value}
 *   onChange={setValue}
 * />
 * ```
 */
export const InputOTP: React.FC<InputOTPProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'shadcn' || provider === 'radix') {
    return <ShadcnInputOTP {...props as any} />;
  }
  
  // Fallback to shadcn for other providers
  return <ShadcnInputOTP {...props as any} />;
};

InputOTP.displayName = 'AdapterInputOTP';
