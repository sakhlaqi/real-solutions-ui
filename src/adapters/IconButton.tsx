/**
 * Adapter IconButton Component
 * 
 * Uses MUI IconButton for all providers.
 * Internal implementation is deprecated in favor of MUI's production-ready component.
 */

import React from 'react';
import { IconButtonProps } from '../core/types';
import { IconButton as MUIIconButton } from '../providers/mui';

/**
 * Adaptive IconButton Component
 * 
 * Note: This component now uses MUI implementation for all providers.
 * 
 * @example
 * ```tsx
 * <IconButton icon={<SearchIcon />} ariaLabel="Search" />
 * ```
 */
export const IconButton: React.FC<IconButtonProps> = (props) => {
  return <MUIIconButton {...props} />;
};

IconButton.displayName = 'AdapterIconButton';
