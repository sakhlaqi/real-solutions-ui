/**
 * MUI Badge Component
 * Material-UI Badge wrapper for displaying notifications or status
 * @see https://mui.com/material-ui/react-badge/
 */

import React from 'react';
import MuiBadge from '@mui/material/Badge';
import { SxProps, Theme } from '@mui/material/styles';

export interface BadgeProps {
  /** Content to display inside the badge */
  children: React.ReactNode;
  /** Badge variant style */
  variant?: 'standard' | 'dot';
  /** Badge color theme */
  color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  /** Content to show in the badge (alias for badgeContent) */
  content?: React.ReactNode;
  /** Content to show in the badge */
  badgeContent?: React.ReactNode;
  /** Maximum value to show (e.g., 99+) */
  max?: number;
  /** Show badge even when content is zero */
  showZero?: boolean;
  /** Whether badge is visible */
  invisible?: boolean;
  /** Badge position anchor */
  anchorOrigin?: {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'right';
  };
  /** Badge overlap mode */
  overlap?: 'rectangular' | 'circular';
  /** Additional CSS class */
  className?: string;
  /** MUI sx prop for custom styling */
  sx?: SxProps<Theme>;
}

/**
 * Badge component using MUI Badge
 * Displays a badge with content or dot indicator on children
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'standard',
  color = 'default',
  content,
  badgeContent,
  max = 99,
  showZero = false,
  invisible = false,
  anchorOrigin,
  overlap = 'rectangular',
  className,
  sx,
}) => {
  // Support both content and badgeContent props
  const displayContent = badgeContent !== undefined ? badgeContent : content;

  return (
    <MuiBadge
      badgeContent={displayContent}
      variant={variant}
      color={color}
      max={max}
      showZero={showZero}
      invisible={invisible}
      anchorOrigin={anchorOrigin}
      overlap={overlap}
      className={className}
      sx={sx}
    >
      {children}
    </MuiBadge>
  );
};

Badge.displayName = 'MUIBadge';
