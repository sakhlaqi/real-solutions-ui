/**
 * Radix UI Rating Wrapper
 * Simple star rating implementation
 */

import React from 'react';
import { Flex } from '@radix-ui/themes';
import { StarIcon, StarFilledIcon } from '@radix-ui/react-icons';
import type { RatingProps } from '../../core/types';

export const Rating: React.FC<RatingProps> = ({
  value = 0,
  onChange,
  max = 5,
  precision = 1,
  disabled = false,
  readOnly = false,
  size = 'medium',
  className,
}) => {
  const sizeMap = { small: 16, medium: 20, large: 24 };
  const iconSize = sizeMap[size];

  const handleClick = (rating: number) => {
    if (!disabled && !readOnly && onChange) {
      onChange({} as any, rating);
    }
  };

  return (
    <Flex gap="1" className={className}>
      {Array.from({ length: max }, (_, index) => {
        const rating = index + 1;
        const isFilled = rating <= value;
        
        return (
          <button
            key={index}
            type="button"
            onClick={() => handleClick(rating)}
            disabled={disabled || readOnly}
            style={{
              border: 'none',
              background: 'none',
              cursor: disabled || readOnly ? 'default' : 'pointer',
              padding: '2px',
              display: 'flex',
            }}
          >
            {isFilled ? (
              <StarFilledIcon width={iconSize} height={iconSize} color="var(--orange-9)" />
            ) : (
              <StarIcon width={iconSize} height={iconSize} color="var(--gray-9)" />
            )}
          </button>
        );
      })}
    </Flex>
  );
};

export default Rating;
