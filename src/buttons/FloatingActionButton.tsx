import React, { ButtonHTMLAttributes } from 'react';
import './FloatingActionButton.css';

export interface FloatingActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning';
  label?: string;
  extended?: boolean;
  children?: React.ReactNode;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon,
  position = 'bottom-right',
  size = 'md',
  color = 'primary',
  label,
  extended = false,
  className = '',
  children,
  ...props
}) => {
  return (
    <button
      className={`fab ${position} ${size} ${color} ${extended ? 'extended' : ''} ${className}`}
      aria-label={label || props['aria-label']}
      {...props}
    >
      <span className="fab-icon">{icon}</span>
      {extended && children && <span className="fab-label">{children}</span>}
    </button>
  );
};
