/**
 * Radix UI List Wrapper
 * Simple list implementation
 */

import React from 'react';
import { Flex } from '@radix-ui/themes';
import type { ListProps } from '../../core/types';

export const List: React.FC<ListProps> = ({
  items,
  dense = false,
  disablePadding = false,
  className,
}) => {
  return (
    <Flex
      direction="column"
      gap={dense ? '1' : '2'}
      className={className}
      style={{
        padding: disablePadding ? 0 : '8px 0',
        listStyle: 'none',
      }}
      as="ul"
    >
      {items?.map((item, index) => (
        <li
          key={index}
          onClick={item.onClick}
          style={{
            padding: dense ? '4px 16px' : '8px 16px',
            cursor: item.onClick ? 'pointer' : 'default',
            borderRadius: '6px',
          }}
        >
          {item.primary}
          {item.secondary && (
            <div style={{ fontSize: '0.875rem', color: 'var(--gray-11)', marginTop: '4px' }}>
              {item.secondary}
            </div>
          )}
        </li>
      ))}
    </Flex>
  );
};

export default List;
