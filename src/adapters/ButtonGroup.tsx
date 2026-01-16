/**
 * Adaptive ButtonGroup Component
 * 
 * Automatically switches between internal and MUI implementations based on UIProvider.
 */

import React from 'react';
import { useUIContext } from '../core/context';
import { ButtonGroup as InternalButtonGroup } from '../buttons';
import { ButtonGroup as MUIButtonGroup } from '../providers/mui';
import { ButtonGroup as RadixButtonGroup } from '../providers/radix';

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
  const { provider } = useUIContext();
  
  if (provider === 'mui') {
    return <MUIButtonGroup {...props} />;
  }
  
  if (provider === 'radix') {
    return <RadixButtonGroup {...props} />;
  }
  
  // Filter MUI-specific props for internal
  const { variant, size, ...internalProps } = props;
  return <InternalButtonGroup {...internalProps} />;
};

ButtonGroup.displayName = 'AdapterButtonGroup';
