import React from 'react';
import './Box.css';

export interface BoxProps {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  display?: 'block' | 'inline' | 'flex' | 'inline-flex' | 'grid' | 'inline-grid';
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  margin?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  width?: string | number;
  height?: string | number;
  textAlign?: 'left' | 'center' | 'right';
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const Box: React.FC<BoxProps> = ({
  children,
  as: Component = 'div',
  display,
  padding,
  margin,
  width,
  height,
  textAlign,
  className = '',
  style = {},
  onClick,
}) => {
  const boxStyle: React.CSSProperties = {
    ...style,
    ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
    ...(height && { height: typeof height === 'number' ? `${height}px` : height }),
  };

  return (
    <Component
      className={`box ${display ? `display-${display}` : ''} ${
        padding ? `padding-${padding}` : ''
      } ${margin ? `margin-${margin}` : ''} ${textAlign ? `text-${textAlign}` : ''} ${className}`}
      style={boxStyle}
      onClick={onClick}
    >
      {children}
    </Component>
  );
};
