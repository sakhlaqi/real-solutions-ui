/**
 * Adapter Button Component
 * 
 * Dynamically switches between internal and MUI button implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { BaseButtonProps } from '../core/types';
import { useUIContext } from '../core/context';
import { Button as InternalButton } from '../base';
import { Button as MUIButton } from '../providers/mui';

/**
 * Adaptive Button Component
 * 
 * Automatically switches between internal and MUI implementations based on UIProvider.
 * 
 * @example
 * ```tsx
 * <Button variant="contained">Click Me</Button>
 * ```
 */
export const Button: React.FC<BaseButtonProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'mui') {
    return <MUIButton {...props} />;
  }
  
  // Map MUI props to internal props
  const { variant, size, ...restProps } = props as any;
  let internalVariant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' = 'primary';
  
  if (variant === 'contained') internalVariant = 'primary';
  else if (variant === 'outlined') internalVariant = 'outline';
  else if (variant === 'text') internalVariant = 'ghost';
  
  // Map size - MUI uses small/medium/large, internal uses xs/sm/md/lg
  let internalSize: 'xs' | 'sm' | 'md' | 'lg' | undefined;
  if (size === 'small') internalSize = 'sm';
  else if (size === 'medium') internalSize = 'md';
  else if (size === 'large') internalSize = 'lg';
  
  return <InternalButton {...restProps} variant={internalVariant} size={internalSize} />;
};

Button.displayName = 'AdapterButton';
