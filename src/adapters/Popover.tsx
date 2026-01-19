/**
 * Adaptive Popover Component
 * 
 * Uses MUI Popover for all providers.
 */

import React from 'react';
import { Popover as MUIPopover } from '../providers/mui';

export interface PopoverProps {
  open: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
  children: React.ReactNode;
  anchorOrigin?: {
    vertical: 'top' | 'center' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
  transformOrigin?: {
    vertical: 'top' | 'center' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
}

/**
 * Adaptive Popover Component
 * 
 * @example
 * ```tsx
 * <Popover
 *   open={open}
 *   onClose={handleClose}
 *   anchorEl={anchorEl}
 * >
 *   <div style={{ padding: '1rem' }}>
 *     Popover content
 *   </div>
 * </Popover>
 * ```
 */
export const Popover: React.FC<PopoverProps> = (props) => {
  return <MUIPopover {...props} />;
};

Popover.displayName = 'AdapterPopover';
