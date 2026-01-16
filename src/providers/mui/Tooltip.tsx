/**
 * MUI Tooltip Wrapper Component
 */

import React from 'react';
import { Tooltip as MUITooltip } from '@mui/material';

export interface TooltipProps {
  title: string;
  children: React.ReactElement;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  arrow?: boolean;
}

/**
 * MUI Tooltip wrapper component
 */
export const Tooltip: React.FC<TooltipProps> = ({
  title,
  children,
  placement = 'top',
  arrow = true,
}) => {
  return (
    <MUITooltip title={title} placement={placement} arrow={arrow}>
      {children}
    </MUITooltip>
  );
};

Tooltip.displayName = 'MUITooltip';
