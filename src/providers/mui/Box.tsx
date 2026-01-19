/**
 * MUI Box Component
 * Material-UI Box wrapper - generic container with sx prop
 * @see https://mui.com/material-ui/react-box/
 */

import React from 'react';
import MuiBox from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';

export interface BoxProps {
  /** Box content */
  children: React.ReactNode;
  /** HTML element to render as */
  component?: React.ElementType;
  /** Display mode */
  display?: 'block' | 'inline' | 'flex' | 'inline-flex' | 'grid' | 'inline-grid' | 'none';
  /** Padding size */
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  /** Margin size */
  margin?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  /** Width */
  width?: string | number;
  /** Height */
  height?: string | number;
  /** Text alignment */
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  /** Additional CSS class */
  className?: string;
  /** Click handler */
  onClick?: () => void;
  /** MUI sx prop for custom styling */
  sx?: SxProps<Theme>;
}

/**
 * Box component using MUI Box
 * Generic container with access to theme and sx prop for styling
 */
export const Box: React.FC<BoxProps> = ({
  children,
  component = 'div',
  display,
  padding,
  margin,
  width,
  height,
  textAlign,
  className,
  onClick,
  sx,
}) => {
  // Map size names to MUI spacing units
  const sizeMap = {
    none: 0,
    xs: 0.5,
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4,
  };

  const getPadding = () => {
    if (typeof padding === 'number') return padding;
    if (padding && padding in sizeMap) return sizeMap[padding as keyof typeof sizeMap];
    return undefined;
  };

  const getMargin = () => {
    if (typeof margin === 'number') return margin;
    if (margin && margin in sizeMap) return sizeMap[margin as keyof typeof sizeMap];
    return undefined;
  };

  const boxSx: SxProps<Theme> = {
    ...(display && { display }),
    ...(getPadding() !== undefined && { p: getPadding() }),
    ...(getMargin() !== undefined && { m: getMargin() }),
    ...(width && { width }),
    ...(height && { height }),
    ...(textAlign && { textAlign }),
    ...sx,
  };

  return (
    <MuiBox
      component={component}
      className={className}
      onClick={onClick}
      sx={boxSx}
    >
      {children}
    </MuiBox>
  );
};

export default Box;
