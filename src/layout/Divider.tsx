import React from 'react';
import './Divider.css';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  children?: React.ReactNode;
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  spacing = 'md',
  className = '',
  children,
}) => {
  const classes = [
    'divider',
    `divider-${orientation}`,
    `divider-spacing-${spacing}`,
    children ? 'divider-with-content' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (children) {
    return (
      <div className={classes} role="separator">
        <span className="divider-content">{children}</span>
      </div>
    );
  }

  return <hr className={classes} role="separator" />;
};
