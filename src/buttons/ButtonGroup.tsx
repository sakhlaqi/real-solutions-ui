import React from 'react';
import './ButtonGroup.css';

export interface ButtonGroupProps {
  children: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  spacing?: 'none' | 'sm' | 'md';
  className?: string;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  orientation = 'horizontal',
  spacing = 'none',
  className = '',
}) => {
  const classes = [
    'button-group',
    `button-group-${orientation}`,
    `button-group-spacing-${spacing}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} role="group">
      {children}
    </div>
  );
};
