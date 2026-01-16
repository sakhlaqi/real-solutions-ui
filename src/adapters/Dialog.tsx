/**
 * Adaptive Dialog Component
 * 
 * Automatically switches between internal and MUI implementations based on UIProvider.
 */

import React from 'react';
import { useUIContext } from '../core/context';
import { Dialog as InternalDialog } from '../overlay';
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
  const { provider } = useUIContext();
  
  if (provider === 'mui') {
    return <MUIDialog {...props} />;
  }
  
  // Transform for internal Dialog
  const { maxWidth, fullWidth, fullScreen, ...internalProps } = props;
  return <InternalDialog {...internalProps} />;
};

Dialog.displayName = 'AdapterDialog';
