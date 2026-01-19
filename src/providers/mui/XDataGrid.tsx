/**
 * MUI X DataGrid Provider Component (Free)
 * 
 * A powerful data grid component for displaying and manipulating tabular data.
 * Uses MUI X Data Grid (free version).
 */

import React from 'react';
import {
  DataGrid as MuiDataGrid,
  GridColDef,
  GridRowsProp,
  GridRowSelectionModel,
  GridCallbackDetails,
} from '@mui/x-data-grid';

export interface XDataGridProps {
  rows: GridRowsProp;
  columns: GridColDef[];
  loading?: boolean;
  checkboxSelection?: boolean;
  disableRowSelectionOnClick?: boolean;
  pageSizeOptions?: number[];
  initialState?: any;
  autoHeight?: boolean;
  density?: 'compact' | 'standard' | 'comfortable';
  hideFooter?: boolean;
  hideFooterPagination?: boolean;
  hideFooterSelectedRowCount?: boolean;
  onRowClick?: (params: any) => void;
  onRowSelectionModelChange?: (rowSelectionModel: GridRowSelectionModel, details: GridCallbackDetails) => void;
  rowSelectionModel?: GridRowSelectionModel;
  sx?: any;
  className?: string;
  getRowId?: (row: any) => string | number;
}

export const XDataGrid: React.FC<XDataGridProps> = ({
  rows,
  columns,
  loading = false,
  checkboxSelection = false,
  disableRowSelectionOnClick = false,
  pageSizeOptions = [5, 10, 25, 50, 100],
  initialState,
  autoHeight = false,
  density = 'standard',
  hideFooter = false,
  hideFooterPagination = false,
  hideFooterSelectedRowCount = false,
  onRowClick,
  onRowSelectionModelChange,
  rowSelectionModel,
  sx,
  className,
  getRowId,
}) => {
  return (
    <MuiDataGrid
      rows={rows}
      columns={columns}
      loading={loading}
      checkboxSelection={checkboxSelection}
      disableRowSelectionOnClick={disableRowSelectionOnClick}
      pageSizeOptions={pageSizeOptions}
      initialState={initialState}
      autoHeight={autoHeight}
      density={density}
      hideFooter={hideFooter}
      hideFooterPagination={hideFooterPagination}
      hideFooterSelectedRowCount={hideFooterSelectedRowCount}
      onRowClick={onRowClick}
      onRowSelectionModelChange={onRowSelectionModelChange}
      rowSelectionModel={rowSelectionModel}
      sx={sx}
      className={className}
      getRowId={getRowId}
    />
  );
};

XDataGrid.displayName = 'MuiXDataGrid';
