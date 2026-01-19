/**
 * Adaptive Rating Component
 * 
 * Uses MUI Rating for all providers.
 * Internal implementation is deprecated in favor of MUI's production-ready component.
 */

import React from 'react';
import { Rating as MUIRating } from '../providers/mui';

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

/**
 * Adaptive Rating Component
 * 
 * Note: This component now uses MUI implementation for all providers.
 * 
 * @example
 * ```tsx
 * <Rating
 *   value={rating}
 *   onChange={setRating}
 *   max={5}
 * />
 * ```
 */
export const Rating: React.FC<RatingProps> = (props) => {
  return <MUIRating {...props} />;
};

Rating.displayName = 'AdapterRating';
