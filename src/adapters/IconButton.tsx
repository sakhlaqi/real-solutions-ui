/**
 * Adapter IconButton Component
 * 
 * Dynamically switches between internal and MUI icon button implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { IconButtonProps } from '../core/types';
import { useUIContext } from '../core/context';
import { IconButton as InternalIconButton } from '../buttons';
import { IconButton as MUIIconButton } from '../providers/mui';
import { IconButton as RadixIconButton } from '../providers/radix';

/**
 * Adaptive IconButton Component
 * 
 * Automatically switches between internal and MUI implementations based on UIProvider.
 * 
 * @example
 * ```tsx
 * <IconButton icon={<SearchIcon />} ariaLabel="Search" />
 * ```
 */
export const IconButton: React.FC<IconButtonProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'mui') {
    return <MUIIconButton {...props} />;
  }
  
  if (provider === 'radix') {
    return <RadixIconButton {...props} />;
  }
  
  // Transform props - internal uses 'icon' and 'ariaLabel', MUI uses children and aria-label
  const { children, 'aria-label': ariaLabel, ...restProps } = props as any;
  const icon = children || (props as any).icon;
  
  return <InternalIconButton {...restProps} icon={icon} ariaLabel={ariaLabel || 'icon button'} />;
};

IconButton.displayName = 'AdapterIconButton';
