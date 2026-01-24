/**
 * Adapter Toast Component
 * 
 * Dynamically switches between internal, MUI, Radix, and Shadcn implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { Toast as InternalToast, ToastProps } from '../core/components/feedback';

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
  
  // Toast uses internal implementation for consistent behavior
  return <InternalToast {...props} />;
};

Toast.displayName = 'AdapterToast';
