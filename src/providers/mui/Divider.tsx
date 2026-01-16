/**
 * MUI Divider Wrapper
 */

import React from 'react';
import { Divider as MUIDividerBase } from '@mui/material';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'fullWidth' | 'inset' | 'middle';
  flexItem?: boolean;
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  variant = 'fullWidth',
  flexItem = false,
  className,
}) => {
  return (
    <MUIDividerBase
      orientation={orientation}
      variant={variant}
      flexItem={flexItem}
      className={className}
    />
  );
};

Divider.displayName = 'MUIDivider';
