/**
 * Adapter Snackbar Component
 * 
 * Dynamically switches between internal and MUI snackbar implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { SnackbarProps } from '../core/types';
import { useUIContext } from '../core/context';
import { Snackbar as InternalSnackbar } from '../feedback';
import { Snackbar as MUISnackbar } from '../providers/mui';

/**
 * Adaptive Snackbar Component
 * 
 * Automatically switches between internal and MUI implementations based on UIProvider.
 * 
 * @example
 * ```tsx
 * <Snackbar
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   message="Changes saved successfully"
 *   severity="success"
 *   position="bottom-right"
 * />
 * ```
 */
export const Snackbar: React.FC<SnackbarProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'mui') {
    return <MUISnackbar {...props} />;
  }
  
  return <InternalSnackbar {...props} />;
};

Snackbar.displayName = 'AdapterSnackbar';
