import React from 'react';
import MUIPaper from '@mui/material/Paper';
import type { PaperProps as MUIPaperProps } from '@mui/material/Paper';

export interface PaperProps extends MUIPaperProps {
  children: React.ReactNode;
  elevation?: number;
  variant?: 'elevation' | 'outlined';
  square?: boolean;
  className?: string;
}

export const Paper: React.FC<PaperProps> = ({
  children,
  elevation = 1,
  variant = 'elevation',
  square = false,
  className,
  ...rest
}) => {
  return (
    <MUIPaper
      elevation={elevation}
      variant={variant}
      square={square}
      className={className}
      {...rest}
    >
      {children}
    </MUIPaper>
  );
};
