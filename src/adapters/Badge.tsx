/**
 * Adaptive Badge Component
 * 
 * Uses MUI Badge for all providers.
 * Internal implementation is deprecated in favor of MUI's production-ready component.
 */

import React from 'react';
import { Badge as MUIBadge, MUIBadgeProps as BadgeProps } from '../providers/mui';

export type { BadgeProps };

/**
 * Adaptive Badge Component
 * 
 * Note: This component now uses MUI implementation for all providers.
 * 
 * @example
 * ```tsx
 * <Badge badgeContent={5} color="error">
 *   <NotificationIcon />
 * </Badge>
 * ```
 */
export const Badge: React.FC<BadgeProps> = (props) => {
  return <MUIBadge {...props} />;
};

Badge.displayName = 'AdapterBadge';
