/**
 * Radix UI IconButton Wrapper
 * Adapts Radix UI IconButton to match internal IconButton API
 */

import React from 'react';
import { IconButton as RadixIconButton } from '@radix-ui/themes';
import type { IconButtonProps } from '../../core/types';

export const IconButton: React.FC<IconButtonProps> = ({
  children,
  onClick,
  disabled = false,
  color = 'primary',
  size = 'medium',
  className,
  'aria-label': ariaLabel,
}) => {
  // Map our size to Radix size
  const radixSize = size === 'small' ? '1' : size === 'medium' ? '2' : '3';
  
  // Map our color to Radix color
  const radixColor = color === 'error' ? 'red' : 
                     color === 'warning' ? 'orange' :
                     color === 'info' ? 'blue' :
                     color === 'success' ? 'green' :
                     color === 'secondary' ? 'gray' : 'blue';

  return (
    <RadixIconButton
      onClick={onClick}
      disabled={disabled}
      color={radixColor as any}
      size={radixSize as any}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </RadixIconButton>
  );
};

export default IconButton;
