/**
 * Adapter Toast Component
 * 
 * Dynamically switches between internal, MUI, Radix, and Shadcn implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { useUIContext } from '../core/context';
import { Toast as InternalToast, ToastProps } from '../feedback';
import { Toast as ShadcnToast } from '../providers/shadcn';

/**
 * Adaptive Toast Component
 * 
 * @example
 * ```tsx
 * <Toast
 *   message="Operation successful"
 *   type="success"
 *   onClose={handleClose}
 * />
 * ```
 */
export const Toast: React.FC<ToastProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'shadcn') {
    return <ShadcnToast {...props as any} />;
  }
  
  // Toast uses internal implementation for consistent behavior
  return <InternalToast {...props} />;
};

Toast.displayName = 'AdapterToast';
