import React from 'react';
import MUIStack from '@mui/material/Stack';
import type { StackProps as MUIStackProps } from '@mui/material/Stack';

export interface StackProps extends Omit<MUIStackProps, 'direction'> {
  children: React.ReactNode;
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  spacing?: number | string;
  divider?: React.ReactNode;
  className?: string;
}

export const Stack: React.FC<StackProps> = ({
  children,
  direction = 'column',
  spacing = 2,
  divider,
  className,
  ...rest
}) => {
  return (
    <MUIStack
      direction={direction}
      spacing={spacing}
      divider={divider}
      className={className}
      {...rest}
    >
      {children}
    </MUIStack>
  );
};
