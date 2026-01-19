/**
 * MUI X DataGridPremium Provider Component
 * 
 * The most advanced data grid with premium features like aggregation, pivoting, and more.
 * Uses MUI X Data Grid Premium (requires license).
 */

import React from 'react';
import {
  DataGridPremium as MuiDataGridPremium,
  GridColDef,
  GridRowsProp,
  GridRowSelectionModel,
  GridCallbackDetails,
} from '@mui/x-data-grid-premium';

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

export const XDataGridPremium: React.FC<XDataGridPremiumProps> = ({
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
  treeData,
  getTreeDataPath,
  groupingColDef,
  rowGroupingColumnMode,
  pinnedColumns,
  aggregationModel,
  cellSelection,
  sx,
  className,
  getRowId,
}) => {
  return (
    <MuiDataGridPremium
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
      treeData={treeData}
      getTreeDataPath={getTreeDataPath}
      groupingColDef={groupingColDef}
      rowGroupingColumnMode={rowGroupingColumnMode}
      pinnedColumns={pinnedColumns}
      aggregationModel={aggregationModel}
      cellSelection={cellSelection}
      sx={sx}
      className={className}
      getRowId={getRowId}
    />
  );
};

XDataGridPremium.displayName = 'MuiXDataGridPremium';
