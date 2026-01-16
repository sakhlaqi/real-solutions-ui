/**
 * MUI Rating Wrapper
 */

import React from 'react';
import { Rating as MUIRatingBase } from '@mui/material';

export interface RatingProps {
  value: number;
  onChange?: (value: number) => void;
  max?: number;
  readOnly?: boolean;
  disabled?: boolean;
  precision?: number;
  size?: 'small' | 'medium' | 'large';
  icon?: React.ReactElement;
  emptyIcon?: React.ReactElement;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  onChange,
  max = 5,
  readOnly = false,
  disabled = false,
  precision = 1,
  size = 'medium',
  icon,
  emptyIcon,
}) => {
  const handleChange = (_event: React.SyntheticEvent, newValue: number | null) => {
    if (onChange && newValue !== null) {
      onChange(newValue);
    }
  };

  return (
    <MUIRatingBase
      value={value}
      onChange={handleChange}
      max={max}
      readOnly={readOnly}
      disabled={disabled}
      precision={precision}
      size={size}
      icon={icon}
      emptyIcon={emptyIcon}
    />
  );
};

Rating.displayName = 'MUIRating';
