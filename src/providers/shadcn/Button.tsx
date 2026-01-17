import React from 'react';
import type { BaseButtonProps } from '../../core/types';
import { Button as ShadcnButton } from './ui/button';
import { cn } from './utils';

/**
 * Shadcn Button Adapter
 * Maps library's BaseButtonProps to shadcn/ui Button
 */
export const Button: React.FC<BaseButtonProps> = ({
  children,
  onClick,
  disabled,
  variant: libraryVariant,
  color,
  size,
  fullWidth,
  startIcon,
  endIcon,
  className,
  type = 'button',
}) => {
  // Map library variant to shadcn variant
  let shadcnVariant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' = 'default';
  
  if (libraryVariant === 'contained') {
    shadcnVariant = 'default';
  } else if (libraryVariant === 'outlined') {
    shadcnVariant = 'outline';
  } else if (libraryVariant === 'text') {
    shadcnVariant = 'ghost';
  }

  // Map color to variant if specified
  if (color === 'error') {
    shadcnVariant = 'destructive';
  } else if (color === 'secondary') {
    shadcnVariant = 'secondary';
  }

  // Map library size to shadcn size
  let shadcnSize: 'default' | 'sm' | 'lg' | 'icon' = 'default';
  if (size === 'small') shadcnSize = 'sm';
  else if (size === 'large') shadcnSize = 'lg';

  return (
    <ShadcnButton
      onClick={onClick}
      disabled={disabled}
      variant={shadcnVariant}
      size={shadcnSize}
      type={type}
      className={cn(fullWidth && 'w-full', className)}
    >
      {startIcon && <span className="mr-2">{startIcon}</span>}
      {children}
      {endIcon && <span className="ml-2">{endIcon}</span>}
    </ShadcnButton>
  );
};

Button.displayName = 'ShadcnButton';
