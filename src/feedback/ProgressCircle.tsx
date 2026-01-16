import React from 'react';
import './ProgressCircle.css';

export interface ProgressCircleProps {
  value: number; // 0-100
  size?: 'sm' | 'md' | 'lg' | 'xl';
  thickness?: number;
  color?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  showLabel?: boolean;
  label?: string;
  variant?: 'determinate' | 'indeterminate';
  className?: string;
}

export const ProgressCircle: React.FC<ProgressCircleProps> = ({
  value,
  size = 'md',
  thickness = 4,
  color = 'primary',
  showLabel = true,
  label,
  variant = 'determinate',
  className = '',
}) => {
  const sizeMap = {
    sm: 40,
    md: 60,
    lg: 80,
    xl: 120,
  };

  const radius = (sizeMap[size] - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = variant === 'determinate' ? circumference - (value / 100) * circumference : 0;

  return (
    <div className={`progress-circle ${size} ${className}`}>
      <svg
        className={`progress-circle-svg ${variant}`}
        width={sizeMap[size]}
        height={sizeMap[size]}
        role="progressbar"
        aria-valuenow={variant === 'determinate' ? value : undefined}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {/* Background circle */}
        <circle
          className="progress-circle-bg"
          cx={sizeMap[size] / 2}
          cy={sizeMap[size] / 2}
          r={radius}
          strokeWidth={thickness}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          className={`progress-circle-fill ${color}`}
          cx={sizeMap[size] / 2}
          cy={sizeMap[size] / 2}
          r={radius}
          strokeWidth={thickness}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={variant === 'determinate' ? offset : 0}
          strokeLinecap="round"
        />
      </svg>
      {showLabel && (
        <div className="progress-circle-label">
          {label || (variant === 'determinate' ? `${Math.round(value)}%` : '')}
        </div>
      )}
    </div>
  );
};
