/**
 * Adaptive Pagination Component
 * 
 * Uses MUI Pagination for all providers.
 */

import React from 'react';
import { Pagination as MUIPagination } from '../providers/mui';

export interface PaginationProps {
  count?: number;
  page?: number;
  currentPage?: number;
  totalPages?: number;
  onChange?: (page: number) => void;
  onPageChange?: (page: number) => void;
  disabled?: boolean;
  siblingCount?: number;
  boundaryCount?: number;
  showFirstButton?: boolean;
  showLastButton?: boolean;
  variant?: 'text' | 'outlined';
  shape?: 'circular' | 'rounded';
  size?: 'small' | 'medium' | 'large';
  testId?: string;
}

/**
 * Adaptive Pagination Component
 * 
 * @example
 * ```tsx
 * <Pagination count={10} page={currentPage} onChange={setPage} />
 * <Pagination currentPage={1} totalPages={10} onPageChange={setPage} />
 * ```
 */
export const Pagination: React.FC<PaginationProps> = ({ 
  currentPage,
  totalPages,
  onPageChange,
  count,
  page,
  onChange,
  testId,
  ...props 
}) => {
  // Support both APIs: (currentPage/totalPages/onPageChange) and (page/count/onChange)
  const actualPage = currentPage ?? page ?? 1;
  const actualCount = totalPages ?? count ?? 1;
  const actualOnChange = onPageChange ?? onChange;

  const handleChange = (newPage: number) => {
    actualOnChange?.(newPage);
  };

  return (
    <MUIPagination 
      {...props}
      count={actualCount}
      page={actualPage}
      onChange={handleChange}
      data-testid={testId}
    />
  );
};

Pagination.displayName = 'AdapterPagination';
