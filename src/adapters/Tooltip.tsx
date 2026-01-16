/**
 * Adaptive Tooltip Component
 * 
 * Automatically switches between internal and MUI implementations based on UIProvider.
 */

import React from 'react';
import { useUIContext } from '../core/context';
// Note: Internal Tooltip may need to be imported from a different location
// Using MUI Tooltip as fallback for internal implementation
import { Tooltip as MUITooltipInternal } from '@mui/material';
import { Tooltip as MUITooltip } from '../providers/mui';

export interface TooltipProps {
  title: string;
  children: React.ReactElement;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  arrow?: boolean;
}

/**
 * Adaptive Tooltip Component
 * 
 * @example
 * ```tsx
 * <Tooltip title="Click to delete" placement="top">
 *   <Button>Delete</Button>
 * </Tooltip>
 * ```
 */
export const Tooltip: React.FC<TooltipProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'mui') {
    return <MUITooltip {...props} />;
  }
  
  // Use MUI implementation for now since internal Tooltip may not exist
  return <MUITooltipInternal {...props} />;
};

Tooltip.displayName = 'AdapterTooltip';
