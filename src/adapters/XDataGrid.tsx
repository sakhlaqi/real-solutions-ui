/**
 * Adapter XDataGrid Component (Free)
 * 
 * Uses MUI X DataGrid for all providers.
 * Provides a powerful data grid for displaying and manipulating tabular data.
 */

import React from 'react';
import { XDataGrid as MuiXDataGrid, XDataGridProps as MuiXDataGridProps } from '../providers/mui';
import { GridColDef, GridRowsProp, GridRowSelectionModel, GridCallbackDetails } from '@mui/x-data-grid';

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

/**
 * Adaptive XDataGrid Component
 * 
 * A powerful data grid for displaying and manipulating tabular data.
 * Free version with essential features.
 * 
 * @example
 * ```tsx
 * const columns = [
 *   { field: 'id', headerName: 'ID', width: 90 },
 *   { field: 'name', headerName: 'Name', width: 150 },
 *   { field: 'age', headerName: 'Age', width: 110 },
 * ];
 * 
 * const rows = [
 *   { id: 1, name: 'John Doe', age: 35 },
 *   { id: 2, name: 'Jane Smith', age: 42 },
 * ];
 * 
 * <XDataGrid rows={rows} columns={columns} />
 * ```
 */
export const XDataGrid: React.FC<XDataGridProps> = (props) => {
  return <MuiXDataGrid {...props} />;
};

XDataGrid.displayName = 'AdapterXDataGrid';
