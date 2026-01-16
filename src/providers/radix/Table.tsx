/**
 * Radix UI Table Wrapper
 * Simple table implementation using Radix Themes Table
 */

import React from 'react';
import { Table as RadixTable } from '@radix-ui/themes';
import type { TableProps } from '../../core/types';

export const Table: React.FC<TableProps> = ({
  columns,
  rows,
  stickyHeader = false,
  size = 'medium',
  className,
}) => {
  return (
    <RadixTable.Root size={size === 'small' ? '1' : size === 'medium' ? '2' : '3'} className={className}>
      <RadixTable.Header>
        <RadixTable.Row>
          {columns?.map((column, index) => (
            <RadixTable.ColumnHeaderCell key={index}>
              {column.label || column.field}
            </RadixTable.ColumnHeaderCell>
          ))}
        </RadixTable.Row>
      </RadixTable.Header>
      <RadixTable.Body>
        {rows?.map((row, rowIndex) => (
          <RadixTable.Row key={rowIndex}>
            {columns?.map((column, colIndex) => (
              <RadixTable.Cell key={colIndex}>
                {row[column.field]}
              </RadixTable.Cell>
            ))}
          </RadixTable.Row>
        ))}
      </RadixTable.Body>
    </RadixTable.Root>
  );
};

export default Table;
