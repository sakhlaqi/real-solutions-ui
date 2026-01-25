/**
 * Adaptive Badge Component
 * 
 * Uses MUI Badge for all providers.
 * Internal implementation is deprecated in favor of MUI's production-ready component.
 */

import React from 'react';
import { Badge as MUIBadge } from '../providers/mui';
import { BadgeProps } from '../core/types';

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
export const Badge: React.FC<BadgeProps> = ({ content, testId, children, ...props }) => {
  // Support both 'content' and 'badgeContent' props
  const badgeContent = content ?? props.badgeContent;
  
  return (
    <MUIBadge 
      {...props}
      badgeContent={badgeContent}
      data-testid={testId}
    >
      {children}
    </MUIBadge>
  );
};

Badge.displayName = 'AdapterBadge';
