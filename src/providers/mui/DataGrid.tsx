/**
 * MUI Data Grid Adapter (Advanced Table)
 */

import React from 'react';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { BaseTableProps } from '../../core/types';

export function AdvancedTable<T extends Record<string, any>>({
  columns,
  rows,
  loading = false,
  error,
  onRowClick,
  pagination = true,
  pageSize = 10,
  rowsPerPageOptions = [5, 10, 25, 50],
  checkboxSelection = false,
  onSelectionChange,
  className,
}: BaseTableProps<T>) {
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: pageSize,
  });

  const gridColumns: GridColDef[] = columns.map((col) => ({
    field: String(col.field),
    headerName: col.headerName,
    width: col.width,
    flex: col.flex,
    sortable: col.sortable !== false,
    filterable: col.filterable !== false,
    align: col.align,
    headerAlign: col.align,
    renderCell: col.renderCell ? (params) => col.renderCell!(params.row) : undefined,
  }));

  const gridRows = rows.map((row, index) => ({
    id: (row as any).id ?? index,
    ...row,
  }));

  const handleSelectionChange = (selectionModel: GridRowSelectionModel) => {
    if (onSelectionChange) {
      const selectedRows = gridRows.filter((row) =>
        (selectionModel as unknown as any[]).includes(row.id)
      );
      onSelectionChange(selectedRows as T[]);
    }
  };

  return (
    <div style={{ height: 600, width: '100%' }} className={className}>
      <DataGrid
        rows={gridRows}
        columns={gridColumns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={rowsPerPageOptions}
        checkboxSelection={checkboxSelection}
        onRowSelectionModelChange={handleSelectionChange}
        onRowClick={(params) => onRowClick?.(params.row as T)}
        loading={loading}
        disableRowSelectionOnClick
        {...(pagination && { pagination: true })}
      />
      {error && (
        <div style={{ color: 'red', padding: '1rem', textAlign: 'center' }}>
          {error}
        </div>
      )}
    </div>
  );
}

AdvancedTable.displayName = 'MUIDataGrid';
