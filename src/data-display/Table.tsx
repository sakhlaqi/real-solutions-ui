import React from 'react';
import './Table.css';

export interface TableColumn<T = any> {
  key: string;
  header: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: T, index: number) => React.ReactNode;
  sortable?: boolean;
}

export interface TableProps<T = any> {
  columns: TableColumn<T>[];
  data: T[];
  keyExtractor?: (row: T, index: number) => string;
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  compact?: boolean;
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T, index: number) => void;
  className?: string;
}

export function Table<T = any>({
  columns,
  data,
  keyExtractor = (_, index) => String(index),
  striped = false,
  hoverable = true,
  bordered = false,
  compact = false,
  loading = false,
  emptyMessage = 'No data available',
  onRowClick,
  className = '',
}: TableProps<T>) {
  const classes = [
    'table',
    striped ? 'table-striped' : '',
    hoverable ? 'table-hoverable' : '',
    bordered ? 'table-bordered' : '',
    compact ? 'table-compact' : '',
    onRowClick ? 'table-clickable' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const getCellValue = (row: T, column: TableColumn<T>) => {
    const value = (row as any)[column.key];
    return column.render ? column.render(value, row, data.indexOf(row)) : value;
  };

  if (loading) {
    return (
      <div className="table-loading">
        <div className="table-spinner" />
        <p>Loading...</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="table-empty">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className={classes}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                style={{
                  width: column.width,
                  textAlign: column.align || 'left',
                }}
                className={column.sortable ? 'table-th-sortable' : ''}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={keyExtractor(row, index)}
              onClick={() => onRowClick?.(row, index)}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  style={{ textAlign: column.align || 'left' }}
                >
                  {getCellValue(row, column)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
