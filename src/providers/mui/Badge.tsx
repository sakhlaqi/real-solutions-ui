/**
 * MUI Badge Wrapper Component
 */

import React from 'react';
import { Badge as MUIBadge } from '@mui/material';

export interface BadgeProps {
  children: React.ReactElement;
  content?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  variant?: 'standard' | 'dot';
  max?: number;
  invisible?: boolean;
}

/**
 * MUI Badge wrapper component
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  content,
  color = 'primary',
  variant = 'standard',
  max = 99,
  invisible = false,
}) => {
  return (
    <MUIBadge
      badgeContent={content}
      color={color}
      variant={variant}
      max={max}
      invisible={invisible}
    >
      {children}
    </MUIBadge>
  );
};

Badge.displayName = 'MUIBadge';
