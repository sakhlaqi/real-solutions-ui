/**
 * Adaptive Backdrop Component
 * 
 * Automatically switches between internal and MUI implementations based on UIProvider.
 */

import React from 'react';
import { useUIContext } from '../core/context';
import { Backdrop as InternalBackdrop } from '../overlay';
import { Backdrop as MUIBackdrop } from '../providers/mui';

export interface BackdropProps {
  open: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  invisible?: boolean;
  className?: string;
}

/**
 * Adaptive Backdrop Component
 * 
 * @example
 * ```tsx
 * <Backdrop open={loading} onClick={handleClose}>
 *   <Spinner />
 * </Backdrop>
 * ```
 */
export const Backdrop: React.FC<BackdropProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'mui') {
    return <MUIBackdrop {...props} />;
  }
  
  return <InternalBackdrop {...props} />;
};

Backdrop.displayName = 'AdapterBackdrop';
