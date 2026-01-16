/**
 * Radix UI Button Wrapper
 * Adapts Radix UI Button to match internal Button API
 */

import React from 'react';
import { Button as RadixButton } from '@radix-ui/themes';
import type { BaseButtonProps } from '../../core/types';

export const Button: React.FC<BaseButtonProps> = ({
  children,
  onClick,
  disabled = false,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  fullWidth = false,
  startIcon,
  endIcon,
  className,
  type = 'button',
}) => {
  // Map our variant to Radix variant
  const radixVariant = variant === 'contained' ? 'solid' : variant === 'outlined' ? 'outline' : 'soft';
  
  // Map our size to Radix size
  const radixSize = size === 'small' ? '1' : size === 'medium' ? '2' : '3';
  
  // Map our color to Radix color
  const radixColor = color === 'error' ? 'red' : 
                     color === 'warning' ? 'orange' :
                     color === 'info' ? 'blue' :
                     color === 'success' ? 'green' :
                     color === 'secondary' ? 'gray' : 'blue';

  return (
    <RadixButton
      onClick={onClick}
      disabled={disabled}
      variant={radixVariant}
      color={radixColor as any}
      size={radixSize as any}
      className={className}
      type={type}
      style={{ width: fullWidth ? '100%' : undefined }}
    >
      {startIcon && <span style={{ marginRight: '0.5rem' }}>{startIcon}</span>}
      {children}
      {endIcon && <span style={{ marginLeft: '0.5rem' }}>{endIcon}</span>}
    </RadixButton>
  );
};

export default Button;
