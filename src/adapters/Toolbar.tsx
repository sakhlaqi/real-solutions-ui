/**
 * Adaptive Toolbar Component
 * 
 * Uses MUI Toolbar for all providers.
 */

import React from 'react';
import { Toolbar as MUIToolbar } from '../providers/mui';

export interface ToolbarProps {
  children: React.ReactNode;
  variant?: 'regular' | 'dense';
  disableGutters?: boolean;
  className?: string;
}

/**
 * Adaptive Toolbar Component
 * 
 * @example
 * ```tsx
 * <AppBar>
 *   <Toolbar>
 *     <Typography variant="h6">My App</Typography>
 *   </Toolbar>
 * </AppBar>
 * ```
 */
export const Toolbar: React.FC<ToolbarProps> = (props) => {
  return <MUIToolbar {...props} />;
};

Toolbar.displayName = 'AdapterToolbar';
