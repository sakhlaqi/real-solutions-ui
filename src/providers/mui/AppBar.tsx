/**
 * MUI AppBar Wrapper
 */

import React from 'react';
import { AppBar as MUIAppBarBase } from '@mui/material';

export interface AppBarProps {
  children: React.ReactNode;
  position?: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative';
  color?: 'default' | 'primary' | 'secondary' | 'transparent';
  elevation?: number;
}

export const AppBar: React.FC<AppBarProps> = ({
  children,
  position = 'static',
  color = 'primary',
  elevation,
}) => {
  return (
    <MUIAppBarBase position={position} color={color} elevation={elevation}>
      {children}
    </MUIAppBarBase>
  );
};

AppBar.displayName = 'MUIAppBar';
