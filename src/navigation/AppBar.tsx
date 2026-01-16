import React from 'react';
import './AppBar.css';

export interface AppBarProps {
  children: React.ReactNode;
  position?: 'fixed' | 'absolute' | 'sticky' | 'static';
  color?: 'default' | 'primary' | 'secondary' | 'transparent';
  elevation?: boolean;
  className?: string;
}

export const AppBar: React.FC<AppBarProps> = ({
  children,
  position = 'static',
  color = 'default',
  elevation = true,
  className = '',
}) => {
  return (
    <header
      className={`appbar position-${position} color-${color} ${elevation ? 'elevated' : ''} ${className}`}
    >
      <div className="appbar-content">{children}</div>
    </header>
  );
};
