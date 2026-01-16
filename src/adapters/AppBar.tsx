/**
 * Adaptive AppBar Component
 * 
 * Automatically switches between internal and MUI implementations based on UIProvider.
 */

import React from 'react';
import { useUIContext } from '../core/context';
import { AppBar as InternalAppBar } from '../navigation';
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
  const { provider } = useUIContext();
  
  if (provider === 'mui') {
    return <MUIAppBar {...props} />;
  }
  
  // Filter props not supported by internal (including 'relative' position)
  const { elevation, position, ...internalProps } = props;
  const internalPosition = position === 'relative' ? 'static' : position;
  return <InternalAppBar {...internalProps} position={internalPosition} />;
};

AppBar.displayName = 'AdapterAppBar';
