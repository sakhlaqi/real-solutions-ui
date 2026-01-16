import React from 'react';
import './Stack.css';

export interface StackProps {
  children: React.ReactNode;
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
  wrap?: boolean;
  divider?: React.ReactNode;
  className?: string;
}

export const Stack: React.FC<StackProps> = ({
  children,
  direction = 'column',
  spacing = 'md',
  align = 'stretch',
  justify = 'start',
  wrap = false,
  divider,
  className = '',
}) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <div
      className={`stack direction-${direction} spacing-${spacing} align-${align} justify-${justify} ${
        wrap ? 'wrap' : ''
      } ${className}`}
    >
      {divider
        ? childrenArray.map((child, index) => (
            <React.Fragment key={index}>
              {child}
              {index < childrenArray.length - 1 && (
                <div className="stack-divider">{divider}</div>
              )}
            </React.Fragment>
          ))
        : children}
    </div>
  );
};
