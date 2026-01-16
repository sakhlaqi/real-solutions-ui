/**
 * MUI Popover Wrapper
 */

import React from 'react';
import { Popover as MUIPopoverBase } from '@mui/material';

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

export const Popover: React.FC<PopoverProps> = ({
  open,
  onClose,
  anchorEl,
  children,
  anchorOrigin = { vertical: 'bottom', horizontal: 'left' },
  transformOrigin = { vertical: 'top', horizontal: 'left' },
}) => {
  return (
    <MUIPopoverBase
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
    >
      {children}
    </MUIPopoverBase>
  );
};

Popover.displayName = 'MUIPopover';
