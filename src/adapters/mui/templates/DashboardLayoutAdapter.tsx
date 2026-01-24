import React from 'react';
import { Box, Container } from '@mui/material';
import type { DashboardLayoutProps } from '../../../core/templates/DashboardLayout/types';

/**
 * MUI DashboardLayout Adapter
 * 
 * Maps DashboardLayout template to MUI Box/Container implementation.
 * Provides flexible dashboard layout with header, sidebar, main, and footer slots.
 */
export const DashboardLayoutAdapter: React.FC<DashboardLayoutProps> = ({
  slots,
  sidebarVisible = true,
  sidebarWidth = 280,
  className = '',
  style,
  testId = 'dashboard-layout',
}) => {
  return (
    <Box
      className={className}
      data-testid={testId}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        ...style,
      }}
    >
      {/* Header */}
      {slots.header && (
        <Box
          component="header"
          sx={{
            flexShrink: 0,
            zIndex: 1000,
          }}
        >
          {slots.header}
        </Box>
      )}

      {/* Main Content Area */}
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          overflow: 'hidden',
        }}
      >
        {/* Sidebar */}
        {sidebarVisible && slots.sidebar && (
          <Box
            component="aside"
            sx={{
              width: sidebarWidth,
              flexShrink: 0,
              overflow: 'auto',
            }}
          >
            {slots.sidebar}
          </Box>
        )}

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flex: 1,
            overflow: 'auto',
            p: 3,
          }}
        >
          {slots.main}
        </Box>
      </Box>

      {/* Footer */}
      {slots.footer && (
        <Box
          component="footer"
          sx={{
            flexShrink: 0,
            borderTop: 1,
            borderColor: 'divider',
          }}
        >
          {slots.footer}
        </Box>
      )}
    </Box>
  );
};

export default DashboardLayoutAdapter;
