/**
 * Adapter XDataGridPremium Component
 * 
 * Uses MUI X DataGridPremium for all providers.
 * Provides premium features like aggregation, pivoting, and cell selection.
 */

import React from 'react';
import { XDataGridPremium as MuiXDataGridPremium, XDataGridPremiumProps as MuiXDataGridPremiumProps } from '../providers/mui';
import { GridColDef, GridRowsProp, GridRowSelectionModel, GridCallbackDetails } from '@mui/x-data-grid-premium';

export interface XDataGridPremiumProps {
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
  rowGroupingColumnMode?: 'single' | 'multiple';
  pinnedColumns?: { left?: string[]; right?: string[] };
  // Premium features
  aggregationModel?: any;
  cellSelection?: boolean;
  sx?: any;
  className?: string;
  getRowId?: (row: any) => string | number;
}

/**
 * Adaptive XDataGridPremium Component
 * 
 * The most advanced data grid with premium features like aggregation, pivoting, and cell selection.
 * Requires MUI X Premium license.
 * 
 * @example
 * ```tsx
 * const columns = [
 *   { field: 'id', headerName: 'ID', width: 90 },
 *   { field: 'category', headerName: 'Category', width: 150 },
 *   { field: 'revenue', headerName: 'Revenue', width: 150, type: 'number' },
 * ];
 * 
 * const rows = [
 *   { id: 1, category: 'Electronics', revenue: 10000 },
 *   { id: 2, category: 'Clothing', revenue: 5000 },
 * ];
 * 
 * <XDataGridPremium 
 *   rows={rows} 
 *   columns={columns}
 *   aggregationModel={{
 *     revenue: 'sum'
 *   }}
 * />
 * ```
 */
export const XDataGridPremium: React.FC<XDataGridPremiumProps> = (props) => {
  return <MuiXDataGridPremium {...props} />;
};

XDataGridPremium.displayName = 'AdapterXDataGridPremium';
