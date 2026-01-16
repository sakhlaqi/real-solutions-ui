import React from 'react';
import './Flex.css';

export interface FlexProps {
  children: React.ReactNode;
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: number | string;
  className?: string;
}

export const Flex: React.FC<FlexProps> = ({
  children,
  direction = 'row',
  align = 'start',
  justify = 'start',
  wrap = 'nowrap',
  gap,
  className = '',
}) => {
  const classes = [
    'flex',
    `flex-${direction}`,
    `flex-align-${align}`,
    `flex-justify-${justify}`,
    `flex-${wrap}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const style: React.CSSProperties = gap ? { gap } : {};

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
};
