/**
 * Adapter Button Component
 * 
 * Uses MUI Button for all providers.
 * Internal implementation is deprecated in favor of MUI's production-ready component.
 */

import React from 'react';
import { BaseButtonProps } from '../core/types';
import { Button as MUIButton } from '../providers/mui';

/**
 * Adaptive Button Component
 * 
 * Note: This component now uses MUI implementation for all providers.
 * 
 * @example
 * ```tsx
 * <Button variant="contained">Click Me</Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, BaseButtonProps>((props, ref) => {
  return <MUIButton {...props} ref={ref} />;
});

Button.displayName = 'AdapterButton';
