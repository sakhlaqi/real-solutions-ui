/**
 * Adaptive Rating Component
 * 
 * Automatically switches between internal and MUI implementations based on UIProvider.
 */

import React from 'react';
import { useUIContext } from '../core/context';
import { Rating as InternalRating } from '../forms';
import { Rating as MUIRating } from '../providers/mui';
import { Rating as RadixRating } from '../providers/radix';

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
  const { provider } = useUIContext();
  
  if (provider === 'mui') {
    return <MUIRating {...props} />;
  }
  
  if (provider === 'radix') {
    return <RadixRating {...props as any} />;
  }
  
  // Filter MUI-specific props for internal
  const { precision, size, icon, emptyIcon, ...internalProps } = props;
  return <InternalRating {...internalProps} />;
};

Rating.displayName = 'AdapterRating';
