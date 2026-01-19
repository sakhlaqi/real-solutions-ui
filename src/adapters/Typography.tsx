/**
 * Adapter Typography Component
 * 
 * Uses MUI Typography for all providers.
 */

import React from 'react';
import { TypographyProps } from '../core/types';
import { Typography as MUITypography } from '../providers/mui';

/**
 * Adaptive Typography Component
 * 
 * @example
 * ```tsx
 * <Typography variant="h1">Page Title</Typography>
 * <Typography variant="body1" color="textSecondary">
 *   This is some body text.
 * </Typography>
 * ```
 */

export const Typography: React.FC<TypographyProps> = ({ variant = 'body1', children, ...props }) => {
  return <MUITypography variant={variant} {...props}>{children}</MUITypography>;
};

Typography.displayName = 'AdapterTypography';
