import React, { useState, useMemo } from 'react';
import {
  DataGrid,
  GridColDef,
  GridRowSelectionModel,
  GridSortModel,
  GridFilterModel,
  GridPaginationModel,
  GridRowParams,
} from '@mui/x-data-grid';
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import type { SearchGridCompositeProps } from '../../../core/composites/SearchGrid/types';

/**
 * MUI DataGrid Adapter for SearchGridComposite
 * 
 * Maps SearchGridComposite interface to MUI DataGrid implementation.
 * Handles prop conversion, state management, and event mapping.
 */
export const SearchGridCompositeAdapter = <T extends Record<string, any>>({
  dataSource,
  columns,
  data = [],
  filters = [],
  searchEnabled = true,
  searchPlaceholder = 'Search...',
  rowActions,
  toolbarActions = [],
  selectionMode = 'none',
  onSelectionChange,
  onRowClick,
  loading = false,
  emptyMessage = 'No data available',
  pageSizeOptions = [10, 25, 50, 100],
  defaultPageSize = 10,
  className = '',
  testId = 'search-grid-composite',
}: SearchGridCompositeProps<T>) => {
  // Ensure defaultPageSize is in pageSizeOptions
  const validPageSizeOptions = pageSizeOptions.includes(defaultPageSize) 
    ? pageSizeOptions 
    : [...pageSizeOptions, defaultPageSize].sort((a, b) => a - b);
  
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: defaultPageSize,
  });
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>([] as unknown as GridRowSelectionModel);

  // Convert columns to MUI DataGrid format
  const gridColumns: GridColDef[] = useMemo(() => {
    const cols: GridColDef[] = columns.map((col) => ({
      field: String(col.field),
      headerName: col.label,
      width: typeof col.width === 'number' ? col.width : 150,
      sortable: col.sortable ?? false,
      align: col.align || 'left',
      headerAlign: col.align || 'left',
      renderCell: col.render
        ? (params) => col.render!(params.value, params.row as T)
        : undefined,
    }));

    // Add actions column if row actions are defined
    if (rowActions) {
      cols.push({
        field: 'actions',
        headerName: 'Actions',
        width: 150,
        sortable: false,
        renderCell: (params) => {
          const actions = rowActions(params.row as T);
          return (
            <Stack direction="row" spacing={1}>
              {actions.map((action) => (
                <Button
                  key={action.id}
                  size="small"
                  variant={action.variant || 'outlined'}
                  color={action.color || 'primary'}
                  onClick={() => action.onClick?.()}
                  disabled={action.disabled}
                  startIcon={action.icon}
                >
                  {action.label}
                </Button>
              ))}
            </Stack>
          );
        },
      });
    }

    return cols;
  }, [columns, rowActions]);

  // Filter data based on search and filters
  const filteredData = useMemo(() => {
    let result = [...data];

    // Apply search
    if (searchEnabled && searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((row) =>
        columns.some((col) => {
          const value = row[col.field];
          return value?.toString().toLowerCase().includes(query);
        })
      );
    }

    // Apply filters
    filters.forEach((filter) => {
      const filterValue = filterValues[filter.id];
      if (filterValue !== undefined && filterValue !== '') {
        result = result.filter((row) => {
          const rowValue = row[filter.field];

          switch (filter.type) {
            case 'text':
              return rowValue
                ?.toString()
                .toLowerCase()
                .includes(filterValue.toLowerCase());
            case 'select':
              return rowValue === filterValue;
            case 'number':
              return Number(rowValue) === Number(filterValue);
            case 'boolean':
              return Boolean(rowValue) === Boolean(filterValue);
            case 'date':
              return new Date(rowValue).toDateString() === new Date(filterValue).toDateString();
            default:
              return true;
          }
        });
      }
    });

    return result;
  }, [data, searchQuery, filterValues, columns, filters, searchEnabled]);

  // Add unique IDs to rows if not present
  const rowsWithIds = useMemo(() => {
    return filteredData.map((row, index) => ({
      ...row,
      id: row.id ?? index,
    }));
  }, [filteredData]);

  // Handle selection change
  const handleSelectionChange = (newSelection: GridRowSelectionModel) => {
    setSelectionModel(newSelection);
    if (onSelectionChange) {
      // Convert GridRowSelectionModel to array
      const selectionArray = Array.isArray(newSelection) 
        ? newSelection 
        : Array.from(newSelection as unknown as Iterable<string | number>);
      const selectionSet = new Set(selectionArray);
      const selectedRows = rowsWithIds.filter((row) =>
        selectionSet.has(row.id)
      );
      onSelectionChange(selectedRows);
    }
  };

  // Handle row click
  const handleRowClick = (params: GridRowParams) => {
    if (onRowClick) {
      onRowClick(params.row as T);
    }
  };

  return (
    <Box className={className} data-testid={testId}>
      {/* Toolbar */}
      {(searchEnabled || filters.length > 0 || toolbarActions.length > 0) && (
        <Toolbar sx={{ gap: 2, flexWrap: 'wrap', px: 0 }}>
          {/* Search */}
          {searchEnabled && (
            <TextField
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="small"
              sx={{ minWidth: 200 }}
            />
          )}

          {/* Filters */}
          {filters.map((filter) => {
            if (filter.type === 'select') {
              return (
                <TextField
                  key={filter.id}
                  select
                  label={filter.label}
                  value={filterValues[filter.id] ?? filter.defaultValue ?? ''}
                  onChange={(e) =>
                    setFilterValues((prev) => ({
                      ...prev,
                      [filter.id]: e.target.value,
                    }))
                  }
                  size="small"
                  sx={{ minWidth: 150 }}
                >
                  <MenuItem value="">All</MenuItem>
                  {filter.options?.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </TextField>
              );
            }
            return (
              <TextField
                key={filter.id}
                label={filter.label}
                type={filter.type}
                value={filterValues[filter.id] ?? filter.defaultValue ?? ''}
                onChange={(e) =>
                  setFilterValues((prev) => ({
                    ...prev,
                    [filter.id]: e.target.value,
                  }))
                }
                size="small"
                sx={{ minWidth: 150 }}
              />
            );
          })}

          {/* Toolbar Actions */}
          <Box sx={{ ml: 'auto' }}>
            <Stack direction="row" spacing={1}>
              {toolbarActions.map((action) => (
                <Button
                  key={action.id}
                  variant={action.variant || 'outlined'}
                  color={action.color || 'primary'}
                  onClick={() => action.onClick?.()}
                  disabled={action.disabled}
                  startIcon={action.icon}
                >
                  {action.label}
                </Button>
              ))}
            </Stack>
          </Box>
        </Toolbar>
      )}

      {/* DataGrid */}
      <DataGrid
        rows={rowsWithIds}
        columns={gridColumns}
        loading={loading}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={validPageSizeOptions}
        sortModel={sortModel}
        onSortModelChange={setSortModel}
        checkboxSelection={selectionMode === 'multiple'}
        disableRowSelectionOnClick={selectionMode === 'none'}
        rowSelectionModel={selectionModel}
        onRowSelectionModelChange={handleSelectionChange}
        onRowClick={handleRowClick}
        pagination
        autoHeight
        disableColumnMenu
        hideFooter={rowsWithIds.length === 0 && loading} // Hide footer when loading with no data to avoid state errors
        slots={{
          noRowsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              <Typography color="text.secondary">{emptyMessage}</Typography>
            </Stack>
          ),
        }}
        sx={{
          border: 'none',
          '& .MuiDataGrid-cell:focus': {
            outline: 'none',
          },
          '& .MuiDataGrid-row:hover': {
            cursor: onRowClick ? 'pointer' : 'default',
          },
        }}
      />
    </Box>
  );
};

export default SearchGridCompositeAdapter;
