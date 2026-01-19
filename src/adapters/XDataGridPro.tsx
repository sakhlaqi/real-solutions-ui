/**
 * Adapter XDataGridPro Component
 * 
 * Uses MUI X DataGridPro for all providers.
 * Provides advanced features like tree data, row grouping, and more.
 */

import React from 'react';
import { XDataGridPro as MuiXDataGridPro, XDataGridProProps as MuiXDataGridProProps } from '../providers/mui';
import { GridColDef, GridRowsProp, GridRowSelectionModel, GridCallbackDetails } from '@mui/x-data-grid-pro';

export interface XDataGridProProps {
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
  // Pro features
  treeData?: boolean;
  getTreeDataPath?: (row: any) => string[];
  groupingColDef?: GridColDef;
  pinnedColumns?: { left?: string[]; right?: string[] };
  sx?: any;
  className?: string;
  getRowId?: (row: any) => string | number;
}

/**
 * Adaptive XDataGridPro Component
 * 
 * An advanced data grid with pro features like tree data, row grouping, and column pinning.
 * Requires MUI X Pro license.
 * 
 * @example
 * ```tsx
 * const columns = [
 *   { field: 'id', headerName: 'ID', width: 90 },
 *   { field: 'category', headerName: 'Category', width: 150 },
 *   { field: 'name', headerName: 'Name', width: 150 },
 * ];
 * 
 * const rows = [
 *   { id: 1, category: 'Electronics', name: 'Laptop' },
 *   { id: 2, category: 'Electronics', name: 'Phone' },
 * ];
 * 
 * <XDataGridPro 
 *   rows={rows} 
 *   columns={columns}
 *   pinnedColumns={{ left: ['id'] }}
 * />
 * ```
 */
export const XDataGridPro: React.FC<XDataGridProProps> = (props) => {
  return <MuiXDataGridPro {...props} />;
};

XDataGridPro.displayName = 'AdapterXDataGridPro';
