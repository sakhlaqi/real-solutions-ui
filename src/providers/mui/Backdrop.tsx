/**
 * MUI Backdrop Wrapper
 */

import React from 'react';
import { Backdrop as MUIBackdropBase } from '@mui/material';

export interface BackdropProps {
  open: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  invisible?: boolean;
  className?: string;
}

export const Backdrop: React.FC<BackdropProps> = ({
  open,
  onClick,
  children,
  invisible = false,
  className,
}) => {
  return (
    <MUIBackdropBase
      open={open}
      onClick={onClick}
      invisible={invisible}
      className={className}
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      {children}
    </MUIBackdropBase>
  );
};

Backdrop.displayName = 'MUIBackdrop';
