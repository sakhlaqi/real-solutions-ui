import React from 'react';
import './Spinner.css';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color,
  className = '',
}) => {
  const style: React.CSSProperties = color ? { borderTopColor: color } : {};

  return (
    <div
      className={`spinner spinner-${size} ${className}`}
      style={style}
      role="status"
      aria-label="Loading"
    >
      <span className="spinner-sr-only">Loading...</span>
    </div>
  );
};
