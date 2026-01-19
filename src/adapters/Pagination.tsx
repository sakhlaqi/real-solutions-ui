/**
 * Adaptive Pagination Component
 * 
 * Uses MUI Pagination for all providers.
 */

import React from 'react';
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
  return <MUIPagination {...props} />;
};

Pagination.displayName = 'AdapterPagination';
