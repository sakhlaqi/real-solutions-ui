/**
 * MUI Pagination Wrapper Component
 */

import React from 'react';
import { Pagination as MUIPagination } from '@mui/material';

export interface PaginationProps {
  count: number;
  page: number;
  onChange: (page: number) => void;
  disabled?: boolean;
  siblingCount?: number;
  boundaryCount?: number;
  showFirstButton?: boolean;
  showLastButton?: boolean;
  variant?: 'text' | 'outlined';
  shape?: 'circular' | 'rounded';
  size?: 'small' | 'medium' | 'large';
}

/**
 * MUI Pagination wrapper component
 */
export const Pagination: React.FC<PaginationProps> = ({
  count,
  page,
  onChange,
  disabled = false,
  siblingCount = 1,
  boundaryCount = 1,
  showFirstButton = false,
  showLastButton = false,
  variant = 'text',
  shape = 'circular',
  size = 'medium',
}) => {
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    onChange(value);
  };

  return (
    <MUIPagination
      count={count}
      page={page}
      onChange={handleChange}
      disabled={disabled}
      siblingCount={siblingCount}
      boundaryCount={boundaryCount}
      showFirstButton={showFirstButton}
      showLastButton={showLastButton}
      variant={variant}
      shape={shape}
      size={size}
    />
  );
};

Pagination.displayName = 'MUIPagination';
