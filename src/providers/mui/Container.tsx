/**
 * MUI Container Component
 * Material-UI Container wrapper for centering content
 * @see https://mui.com/material-ui/react-container/
 */

import React from 'react';
import MuiContainer from '@mui/material/Container';
import { SxProps, Theme } from '@mui/material/styles';

export interface ContainerProps {
  /** Container content */
  children: React.ReactNode;
  /** Maximum width breakpoint */
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  /** Disable horizontal padding */
  disableGutters?: boolean;
  /** Use fixed width instead of fluid */
  fixed?: boolean;
  /** Additional CSS class */
  className?: string;
  /** MUI sx prop for custom styling */
  sx?: SxProps<Theme>;
}

/**
 * Container component using MUI Container
 * Centers content horizontally and provides responsive max-width
 */
export const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = 'lg',
  disableGutters = false,
  fixed = false,
  className,
  sx,
}) => {
  return (
    <MuiContainer
      maxWidth={maxWidth}
      disableGutters={disableGutters}
      fixed={fixed}
      className={className}
      sx={sx}
    >
      {children}
    </MuiContainer>
  );
};

export default Container;
