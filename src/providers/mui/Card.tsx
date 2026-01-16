/**
 * MUI Card Wrapper Component
 */

import React from 'react';
import { Card as MUICard } from '@mui/material';

export interface CardProps {
  children: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  elevation?: number;
  variant?: 'outlined' | 'elevation';
  className?: string;
  onClick?: () => void;
}

/**
 * MUI Card wrapper component
 */
export const Card: React.FC<CardProps> = ({
  children,
  padding = 'md',
  elevation = 1,
  variant = 'elevation',
  className,
  onClick,
}) => {
  // Map padding values to MUI sx prop
  const paddingMap = {
    none: 0,
    sm: 1,
    md: 2,
    lg: 3,
  };

  return (
    <MUICard
      elevation={variant === 'elevation' ? elevation : 0}
      variant={variant}
      className={className}
      onClick={onClick}
      sx={{ p: paddingMap[padding], cursor: onClick ? 'pointer' : 'default' }}
    >
      {children}
    </MUICard>
  );
};

Card.displayName = 'MUICard';
