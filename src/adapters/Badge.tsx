/**
 * Adaptive Badge Component
 * 
 * Automatically switches between internal and MUI implementations based on UIProvider.
 */

import React from 'react';
import { useUIContext } from '../core/context';
import { Badge as InternalBadge } from '../data-display';
import { Badge as MUIBadge } from '../providers/mui';

export interface BadgeProps {
  children: React.ReactElement;
  content?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  variant?: 'standard' | 'dot';
  max?: number;
  invisible?: boolean;
}

/**
 * Adaptive Badge Component
 * 
 * @example
 * ```tsx
 * <Badge content={5} color="error">
 *   <NotificationIcon />
 * </Badge>
 * ```
 */
export const Badge: React.FC<BadgeProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'mui') {
    return <MUIBadge {...props} />;
  }
  
  // Map variant to internal format and filter unsupported props
  const { variant, max, invisible, ...restProps } = props;
  const variantMap = { standard: 'default', dot: 'default' } as const;
  const internalVariant = variant ? variantMap[variant] : 'default';
  
  return <InternalBadge {...restProps} variant={internalVariant} />;
};

Badge.displayName = 'AdapterBadge';
