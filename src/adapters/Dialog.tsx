/**
 * Adaptive Dialog Component
 * 
 * Uses MUI Dialog for all providers.
 */

import React from 'react';
import { Dialog as MUIDialog } from '../providers/mui';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  fullScreen?: boolean;
}

/**
 * Adaptive Dialog Component
 * 
 * @example
 * ```tsx
 * <Dialog
 *   open={isOpen}
 *   onClose={handleClose}
 *   title="Confirm Action"
 *   actions={
 *     <>
 *       <Button onClick={handleClose}>Cancel</Button>
 *       <Button onClick={handleConfirm}>Confirm</Button>
 *     </>
 *   }
 * >
 *   <p>Are you sure?</p>
 * </Dialog>
 * ```
 */
export const Dialog: React.FC<DialogProps> = (props) => {
  return <MUIDialog {...props} />;
};

Dialog.displayName = 'AdapterDialog';
