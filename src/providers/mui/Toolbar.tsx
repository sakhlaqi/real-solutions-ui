/**
 * MUI Toolbar Wrapper
 */

import React from 'react';
import { Toolbar as MUIToolbarBase } from '@mui/material';

export interface ToolbarProps {
  children: React.ReactNode;
  variant?: 'regular' | 'dense';
  disableGutters?: boolean;
  className?: string;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  children,
  variant = 'regular',
  disableGutters = false,
  className,
}) => {
  return (
    <MUIToolbarBase
      variant={variant}
      disableGutters={disableGutters}
      className={className}
    >
      {children}
    </MUIToolbarBase>
  );
};

Toolbar.displayName = 'MUIToolbar';
