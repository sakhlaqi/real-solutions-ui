/**
 * Adaptive Popover Component
 * 
 * Automatically switches between internal and MUI implementations based on UIProvider.
 */

import React from 'react';
import { useUIContext } from '../core/context';
import { Popover as InternalPopover } from '../overlay';
import { Popover as MUIPopover } from '../providers/mui';
import { Popover as RadixPopover } from '../providers/radix';

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
  const { provider } = useUIContext();
  
  if (provider === 'mui') {
    return <MUIPopover {...props} />;
  }
  
  if (provider === 'radix') {
    return <RadixPopover {...props} />;
  }
  
  // For internal, filter MUI-specific props
  const { anchorOrigin, transformOrigin, ...internalProps } = props;
  return <InternalPopover {...internalProps} />;
};

Popover.displayName = 'AdapterPopover';
