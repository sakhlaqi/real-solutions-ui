/**
 * MUI Drawer Wrapper Component
 */

import React from 'react';
import { Drawer as MUIDrawer } from '@mui/material';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  anchor?: 'left' | 'right' | 'top' | 'bottom';
  variant?: 'temporary' | 'permanent' | 'persistent';
  width?: string | number;
}

/**
 * MUI Drawer wrapper component
 */
export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  children,
  anchor = 'left',
  variant = 'temporary',
  width = 250,
}) => {
  return (
    <MUIDrawer
      open={open}
      onClose={onClose}
      anchor={anchor}
      variant={variant}
      sx={{
        width: width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: width,
          boxSizing: 'border-box',
        },
      }}
    >
      {children}
    </MUIDrawer>
  );
};

Drawer.displayName = 'MUIDrawer';
