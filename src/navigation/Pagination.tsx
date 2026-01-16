import React from 'react';
import './Pagination.css';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  maxVisiblePages?: number;
  disabled?: boolean;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  showPrevNext = true,
  maxVisiblePages = 7,
  disabled = false,
  className = '',
}) => {
  const getVisiblePages = (): (number | string)[] => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);

    if (currentPage <= halfVisible + 1) {
      for (let i = 1; i <= maxVisiblePages - 2; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    } else if (currentPage >= totalPages - halfVisible) {
      pages.push(1);
      pages.push('...');
      for (let i = totalPages - (maxVisiblePages - 3); i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push('...');
      for (
        let i = currentPage - halfVisible + 2;
        i <= currentPage + halfVisible - 2;
        i++
      ) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <nav aria-label="Pagination" className={`pagination ${className}`}>
      <ul className="pagination-list">
        {showFirstLast && (
          <li key="first">
            <button
              className="pagination-button"
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1 || disabled}
              aria-label="Go to first page"
            >
              &#171;
            </button>
          </li>
        )}

        {showPrevNext && (
          <li key="prev">
            <button
              className="pagination-button"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1 || disabled}
              aria-label="Go to previous page"
            >
              &#8249;
            </button>
          </li>
        )}

        {visiblePages.map((page, index) =>
          page === '...' ? (
            <li key={`ellipsis-${index}`}>
              <span className="pagination-ellipsis">...</span>
            </li>
          ) : (
            <li key={`page-${page}`}>
              <button
                className={`pagination-button ${
                  currentPage === page ? 'pagination-button-active' : ''
                }`}
                onClick={() => onPageChange(page as number)}
                disabled={disabled}
                aria-label={`Go to page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            </li>
          )
        )}

        {showPrevNext && (
          <li key="next">
            <button
              className="pagination-button"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages || disabled}
              aria-label="Go to next page"
            >
              &#8250;
            </button>
          </li>
        )}

        {showFirstLast && (
          <li key="last">
            <button
              className="pagination-button"
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages || disabled}
              aria-label="Go to last page"
            >
              &#187;
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};
