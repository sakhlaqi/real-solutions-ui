/**
 * Adaptive AppBar Component
 * 
 * Uses MUI AppBar for all providers.
 */

import React from 'react';
import { AppBar as MUIAppBar } from '../providers/mui';

export interface AppBarProps {
  children: React.ReactNode;
  position?: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative';
  color?: 'default' | 'primary' | 'secondary' | 'transparent';
  elevation?: number;
}

/**
 * Adaptive AppBar Component
 * 
 * @example
 * ```tsx
 * <AppBar position="fixed" color="primary">
 *   <Toolbar>
 *     <Typography variant="h6">My App</Typography>
 *   </Toolbar>
 * </AppBar>
 * ```
 */
export const AppBar: React.FC<AppBarProps> = (props) => {
  return <MUIAppBar {...props} />;
};

AppBar.displayName = 'AdapterAppBar';
