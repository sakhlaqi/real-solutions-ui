/**
 * Adaptive Pagination Component
 * 
 * Automatically switches between internal and MUI implementations based on UIProvider.
 */

import React from 'react';
import { useUIContext } from '../core/context';
import { Pagination as InternalPagination } from '../navigation';
import { Pagination as MUIPagination } from '../providers/mui';

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
 * Adaptive Pagination Component
 * 
 * @example
 * ```tsx
 * <Pagination count={10} page={currentPage} onChange={setPage} />
 * ```
 */
export const Pagination: React.FC<PaginationProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'mui') {
    return <MUIPagination {...props} />;
  }
  
  // Transform props to internal API (page/count -> currentPage/totalPages)
  const { page, count, onChange, variant, shape, size, siblingCount, boundaryCount, ...restProps } = props;
  
  const handlePageChange = (newPage: number) => {
    onChange(newPage);
  };
  
  return (
    <InternalPagination
      {...restProps}
      currentPage={page}
      totalPages={count}
      onPageChange={handlePageChange}
    />
  );
};

Pagination.displayName = 'AdapterPagination';
