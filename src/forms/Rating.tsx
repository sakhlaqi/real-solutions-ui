import React, { useState } from 'react';
import './Rating.css';

export interface RatingProps {
  value?: number;
  onChange?: (value: number) => void;
  max?: number;
  precision?: number; // 0.5 for half stars, 1 for full stars
  size?: 'sm' | 'md' | 'lg';
  readonly?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  emptyIcon?: React.ReactNode;
  label?: string;
  showValue?: boolean;
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({
  value = 0,
  onChange,
  max = 5,
  precision = 1,
  size = 'md',
  readonly = false,
  disabled = false,
  icon,
  emptyIcon,
  label,
  showValue = false,
  className = '',
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const handleClick = (rating: number) => {
    if (readonly || disabled) return;
    onChange?.(rating);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    if (readonly || disabled) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    
    let rating = index + 1;
    if (precision === 0.5 && percent < 0.5) {
      rating = index + 0.5;
    }
    
    setHoverValue(rating);
  };

  const handleMouseLeave = () => {
    setHoverValue(null);
  };

  const getStarFill = (index: number): 'full' | 'half' | 'empty' => {
    const displayValue = hoverValue ?? value;
    
    if (displayValue >= index + 1) return 'full';
    if (displayValue > index && displayValue < index + 1) return 'half';
    return 'empty';
  };

  const renderStar = (fill: 'full' | 'half' | 'empty') => {
    if (icon && fill === 'full') return icon;
    if (emptyIcon && fill === 'empty') return emptyIcon;

    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`rating-star-icon ${fill}`}
      >
        <defs>
          <linearGradient id={`half-${fill}`}>
            <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <path
          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
          fill={fill === 'half' ? `url(#half-${fill})` : 'currentColor'}
          fillOpacity={fill === 'empty' ? '0.3' : '1'}
        />
      </svg>
    );
  };

  return (
    <div className={`rating-wrapper ${className}`}>
      {label && <label className="rating-label">{label}</label>}
      <div
        className={`rating ${size} ${readonly ? 'readonly' : ''} ${disabled ? 'disabled' : ''}`}
        onMouseLeave={handleMouseLeave}
      >
        {Array.from({ length: max }, (_, i) => (
          <button
            key={i}
            type="button"
            className="rating-star"
            onClick={() => handleClick(i + 1)}
            onMouseMove={(e) => handleMouseMove(e, i)}
            disabled={disabled || readonly}
            aria-label={`Rate ${i + 1} out of ${max}`}
          >
            {renderStar(getStarFill(i))}
          </button>
        ))}
        {showValue && (
          <span className="rating-value">
            {value.toFixed(precision === 0.5 ? 1 : 0)} / {max}
          </span>
        )}
      </div>
    </div>
  );
};
