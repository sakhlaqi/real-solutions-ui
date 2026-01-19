/**
 * MUI X DataGridPro Provider Component
 * 
 * An advanced data grid with pro features like tree data, row grouping, and more.
 * Uses MUI X Data Grid Pro (requires license).
 */

import React from 'react';
import {
  DataGridPro as MuiDataGridPro,
  GridColDef,
  GridRowsProp,
  GridRowSelectionModel,
  GridCallbackDetails,
} from '@mui/x-data-grid-pro';

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

export const XDataGridPro: React.FC<XDataGridProProps> = ({
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
  pinnedColumns,
  sx,
  className,
  getRowId,
}) => {
  return (
    <MuiDataGridPro
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
      pinnedColumns={pinnedColumns}
      sx={sx}
      className={className}
      getRowId={getRowId}
    />
  );
};

XDataGridPro.displayName = 'MuiXDataGridPro';
