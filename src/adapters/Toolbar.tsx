/**
 * Adaptive Toolbar Component
 * 
 * Automatically switches between internal and MUI implementations based on UIProvider.
 */

import React from 'react';
import { useUIContext } from '../core/context';
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
  const { provider } = useUIContext();
  
  if (provider === 'mui') {
    return <MUIToolbar {...props} />;
  }
  
  // For internal, just render a div with flexbox styling
  const { children, className = '', variant, disableGutters } = props;
  return (
    <div 
      className={`toolbar ${variant === 'dense' ? 'toolbar-dense' : ''} ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: disableGutters ? 0 : variant === 'dense' ? '0 8px' : '0 16px',
        minHeight: variant === 'dense' ? 48 : 64,
      }}
    >
      {children}
    </div>
  );
};

Toolbar.displayName = 'AdapterToolbar';
