/**
 * Adaptive Backdrop Component
 * 
 * Uses MUI Backdrop for all providers.
 */

import React from 'react';
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
  return <MUIBackdrop {...props} />;
};

Backdrop.displayName = 'AdapterBackdrop';
