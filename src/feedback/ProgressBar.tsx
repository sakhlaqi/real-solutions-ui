import React from 'react';
import './ProgressBar.css';

export interface ProgressBarProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'error';
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
  striped?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  size = 'md',
  variant = 'default',
  showLabel = false,
  label,
  animated = false,
  striped = false,
  className = '',
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const classes = [
    'progress-bar',
    `progress-bar-${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const fillClasses = [
    'progress-fill',
    `progress-fill-${variant}`,
    striped ? 'progress-fill-striped' : '',
    animated ? 'progress-fill-animated' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}>
      <div className={fillClasses} style={{ width: `${percentage}%` }}>
        {showLabel && (
          <span className="progress-label">
            {label || `${Math.round(percentage)}%`}
          </span>
        )}
      </div>
    </div>
  );
};
