import React from 'react';
import './Paper.css';

export interface PaperProps {
  children: React.ReactNode;
  elevation?: 0 | 1 | 2 | 3 | 4;
  variant?: 'elevation' | 'outlined';
  square?: boolean;
  className?: string;
}

export const Paper: React.FC<PaperProps> = ({
  children,
  elevation = 1,
  variant = 'elevation',
  square = false,
  className = '',
}) => {
  return (
    <div
      className={`paper ${variant} elevation-${elevation} ${square ? 'square' : ''} ${className}`}
    >
      {children}
    </div>
  );
};
