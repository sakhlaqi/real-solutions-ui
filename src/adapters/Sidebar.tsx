/**
 * Adapter Sidebar Component
 * 
 * Uses MUI Drawer for all providers.
 * Internal implementation is deprecated in favor of MUI's Drawer component.
 */

import React from 'react';
import { Drawer, Box } from '@mui/material';

export interface SidebarProps {
  children?: React.ReactNode;
  position?: 'left' | 'right';
  width?: number | string;
  collapsible?: boolean;
  collapsed?: boolean;
  onToggle?: () => void;
  className?: string;
}

/**
 * Adaptive Sidebar Component
 * 
 * @example
 * ```tsx
 * <Sidebar position="left" width={250}>
 *   <nav>Navigation items</nav>
 * </Sidebar>
 * ```
 */
export const Sidebar: React.FC<SidebarProps> = ({
  children,
  position = 'left',
  width = 250,
  collapsible = false,
  collapsed = false,
  className,
}) => {
  return (
    <Drawer
      variant="permanent"
      anchor={position}
      className={className}
      sx={{
        width: collapsed ? 0 : width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: collapsed ? 0 : width,
          boxSizing: 'border-box',
          transition: 'width 0.3s',
          overflowX: 'hidden',
        },
      }}
    >
      <Box sx={{ width, overflow: 'auto' }}>
        {children}
      </Box>
    </Drawer>
  );
};

Sidebar.displayName = 'AdapterSidebar';
