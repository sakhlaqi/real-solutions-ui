/**
 * Adapter Snackbar Component
 * 
 * Uses MUI Snackbar for all providers.
 */

import React from 'react';
import { SnackbarProps } from '../core/types';
import { Snackbar as MUISnackbar } from '../providers/mui';

/**
 * Adaptive Snackbar Component
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
  return <MUISnackbar {...props} />;
};

Snackbar.displayName = 'AdapterSnackbar';
