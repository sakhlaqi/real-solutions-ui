import React from 'react';
import { Box, Container } from '@mui/material';
import type { TwoColumnLayoutProps } from '../../../core/templates/TwoColumnLayout/types';

/**
 * MUI TwoColumnLayout Adapter
 * 
 * Maps TwoColumnLayout template to MUI Box/Grid implementation.
 * Provides responsive two-column layout with optional header and footer.
 */
export const TwoColumnLayoutAdapter: React.FC<TwoColumnLayoutProps> = ({
  slots,
  leftWidth = 0.5,
  gap = 16,
  className = '',
  style,
  testId = 'two-column-layout',
}) => {
  // Convert ratio to flex-basis percentage
  const leftFlexBasis = `${leftWidth * 100}%`;
  const rightFlexBasis = `${(1 - leftWidth) * 100}%`;

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
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          {slots.header}
        </Box>
      )}

      {/* Two Column Content */}
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          gap: `${gap}px`,
          overflow: 'hidden',
        }}
      >
        {/* Left Column */}
        <Box
          sx={{
            flexBasis: leftFlexBasis,
            flexShrink: 0,
            overflow: 'auto',
            p: 3,
          }}
        >
          {slots.left}
        </Box>

        {/* Right Column */}
        <Box
          sx={{
            flexBasis: rightFlexBasis,
            flexShrink: 0,
            overflow: 'auto',
            p: 3,
          }}
        >
          {slots.right}
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

export default TwoColumnLayoutAdapter;
