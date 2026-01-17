/**
 * Radix UI Pagination Wrapper
 * Simple pagination implementation
 */

import React from 'react';
import { Flex, Button, Text } from '@radix-ui/themes';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import type { PaginationProps } from '../../core/types';

export const Pagination: React.FC<PaginationProps> = ({
  count,
  page = 1,
  onChange,
  disabled = false,
  siblingCount: _siblingCount = 1,
  showFirstButton = false,
  showLastButton = false,
  className,
}) => {
  const handlePageChange = (newPage: number) => {
    onChange?.(newPage);
  };

  return (
    <Flex gap="2" align="center" className={className}>
      {showFirstButton && (
        <Button
          variant="soft"
          onClick={() => handlePageChange(1)}
          disabled={disabled || page === 1}
        >
          First
        </Button>
      )}
      <Button
        variant="soft"
        onClick={() => handlePageChange(page - 1)}
        disabled={disabled || page === 1}
      >
        <ChevronLeftIcon />
      </Button>
      <Text size="2">
        Page {page} of {count}
      </Text>
      <Button
        variant="soft"
        onClick={() => handlePageChange(page + 1)}
        disabled={disabled || page === count}
      >
        <ChevronRightIcon />
      </Button>
      {showLastButton && (
        <Button
          variant="soft"
          onClick={() => handlePageChange(count)}
          disabled={disabled || page === count}
        >
          Last
        </Button>
      )}
    </Flex>
  );
};

export default Pagination;
