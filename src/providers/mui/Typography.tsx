/**
 * MUI Typography Adapter
 * 
 * Wraps Material-UI Typography to conform to internal typography interface.
 */

import React from 'react';
import MuiTypography from '@mui/material/Typography';
import { TypographyProps } from '../../core/types';

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body1',
  color,
  align,
  gutterBottom = false,
  noWrap = false,
  className,
}) => {
  // Map our color values to MUI color values
  const muiColor = color === 'textPrimary' ? 'text.primary' :
                   color === 'textSecondary' ? 'text.secondary' :
                   color;

  return (
    <MuiTypography
      variant={variant}
      color={muiColor}
      align={align}
      gutterBottom={gutterBottom}
      noWrap={noWrap}
      className={className}
    >
      {children}
    </MuiTypography>
  );
};
