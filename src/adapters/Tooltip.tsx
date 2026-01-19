/**
 * Adaptive Tooltip Component
 * 
 * Uses MUI Tooltip for all providers.
 */

import React from 'react';
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
  const { children, title, placement, arrow } = props;
  
  // Wrap children in a span to ensure refs can be attached for MUI
  const wrappedChildren = (
    <span style={{ display: 'inline-block', maxWidth: '100%' }}>
      {children}
    </span>
  );

  return <MUITooltip title={title} placement={placement} arrow={arrow}>{wrappedChildren}</MUITooltip>;
};

Tooltip.displayName = 'AdapterTooltip';
