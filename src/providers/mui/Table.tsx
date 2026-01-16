/**
 * MUI Table Adapter
 */

import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { BaseTableProps } from '../../core/types';

export function DataTable<T extends Record<string, any>>({
  columns,
  rows,
  loading = false,
  error,
  onRowClick,
  checkboxSelection = false,
  onSelectionChange,
  className,
}: BaseTableProps<T>) {
  const [selected, setSelected] = React.useState<T[]>([]);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(rows);
      onSelectionChange?.(rows);
    } else {
      setSelected([]);
      onSelectionChange?.([]);
    }
  };

  const handleSelectRow = (row: T) => {
    const isSelected = selected.some((r) => r === row);
    let newSelected: T[];

    if (isSelected) {
      newSelected = selected.filter((r) => r !== row);
    } else {
      newSelected = [...selected, row];
    }

    setSelected(newSelected);
    onSelectionChange?.(newSelected);
  };

  const isRowSelected = (row: T) => selected.some((r) => r === row);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <TableContainer component={Paper} className={className}>
      <Table>
        <TableHead>
          <TableRow>
            {checkboxSelection && (
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < rows.length}
                  checked={rows.length > 0 && selected.length === rows.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
            )}
            {columns.map((column) => (
              <TableCell
                key={String(column.field)}
                align={column.align || 'left'}
                style={{ width: column.width }}
              >
                {column.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => {
            const isSelected = isRowSelected(row);
            return (
              <TableRow
                key={rowIndex}
                hover
                selected={isSelected}
                onClick={() => onRowClick?.(row)}
                style={{ cursor: onRowClick ? 'pointer' : 'default' }}
              >
                {checkboxSelection && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={() => handleSelectRow(row)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </TableCell>
                )}
                {columns.map((column) => (
                  <TableCell key={String(column.field)} align={column.align || 'left'}>
                    {column.renderCell
                      ? column.renderCell(row)
                      : String(row[column.field] ?? '')}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

DataTable.displayName = 'MUIDataTable';
