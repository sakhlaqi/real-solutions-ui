/**
 * Adaptive ButtonGroup Component
 * 
 * Uses MUI ButtonGroup for all providers.
 */

import React from 'react';
import { ButtonGroup as MUIButtonGroup } from '../providers/mui';

export interface ButtonGroupProps {
  children: React.ReactNode;
  variant?: 'text' | 'outlined' | 'contained';
  size?: 'small' | 'medium' | 'large';
  orientation?: 'horizontal' | 'vertical';
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

/**
 * Adaptive ButtonGroup Component
 * 
 * @example
 * ```tsx
 * <ButtonGroup variant="contained">
 *   <Button>One</Button>
 *   <Button>Two</Button>
 *   <Button>Three</Button>
 * </ButtonGroup>
 * ```
 */
export const ButtonGroup: React.FC<ButtonGroupProps> = (props) => {
  return <MUIButtonGroup {...props} />;
};

ButtonGroup.displayName = 'AdapterButtonGroup';

ButtonGroup.displayName = 'AdapterButtonGroup';
