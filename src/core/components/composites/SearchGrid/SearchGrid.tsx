import React, { useState, useMemo } from 'react';
import { SearchGridCompositeProps, FilterDefinition } from './types';
import { useUIContext } from '../../../context';
import { Input, Select, Button, Table, Pagination, Box, Stack } from '../../../../index';

/**
 * Search Grid Composite
 * 
 * A comprehensive data grid component with search, filtering, and pagination.
 * Combines multiple atomic UI components into a cohesive data management interface.
 * 
 * @example
 * ```tsx
 * <SearchGridComposite
 *   dataSource="employees"
 *   columns={[
 *     { id: 'name', label: 'Name', field: 'name', sortable: true },
 *     { id: 'email', label: 'Email', field: 'email' },
 *     { id: 'role', label: 'Role', field: 'role' }
 *   ]}
 *   data={employees}
 *   searchEnabled={true}
 *   onRowClick={(row) => console.log('Clicked:', row)}
 * />
 * ```
 */
export const SearchGridComposite = <T extends Record<string, any>>({
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
  const { theme } = useUIContext();
  const tokens = theme.tokens;

  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  // Filter and search data
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
              return rowValue?.toString().toLowerCase().includes(filterValue.toLowerCase());
            case 'select':
              return rowValue === filterValue;
            case 'boolean':
              return rowValue === filterValue;
            default:
              return true;
          }
        });
      }
    });

    // Apply sorting
    if (sortColumn) {
      result.sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];
        
        if (aValue === bValue) return 0;
        
        const comparison = aValue > bValue ? 1 : -1;
        return sortDirection === 'asc' ? comparison : -comparison;
      });
    }

    return result;
  }, [data, searchQuery, filterValues, sortColumn, sortDirection, columns, filters, searchEnabled]);

  // Paginated data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  // Handlers
  const handleFilterChange = (filterId: string, value: any) => {
    setFilterValues((prev) => ({ ...prev, [filterId]: value }));
    setCurrentPage(1); // Reset to first page
  };

  const handleSort = (columnId: string) => {
    if (sortColumn === columnId) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(columnId);
      setSortDirection('asc');
    }
  };

  const handleSelectionChange = (rows: T[]) => {
    setSelectedRows(rows);
    onSelectionChange?.(rows);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing.md,
    backgroundColor: tokens.colors.background.paper,
    borderRadius: tokens.shape.borderRadius,
    padding: tokens.spacing.md,
  };

  const toolbarStyle: React.CSSProperties = {
    display: 'flex',
    gap: tokens.spacing.md,
    alignItems: 'center',
    flexWrap: 'wrap',
  };

  const filtersStyle: React.CSSProperties = {
    display: 'flex',
    gap: tokens.spacing.sm,
    flexWrap: 'wrap',
  };

  const actionsStyle: React.CSSProperties = {
    display: 'flex',
    gap: tokens.spacing.sm,
    marginLeft: 'auto',
  };

  const paginationContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: tokens.spacing.md,
  };

  return (
    <div style={containerStyle} className={className} data-testid={testId}>
      {/* Toolbar */}
      <div style={toolbarStyle} data-testid={`${testId}-toolbar`}>
        {/* Search */}
        {searchEnabled && (
          <Input
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={searchPlaceholder}
            style={{ minWidth: '250px' }}
            testId={`${testId}-search`}
          />
        )}

        {/* Filters */}
        {filters.length > 0 && (
          <div style={filtersStyle}>
            {filters.map((filter) => {
              if (filter.type === 'select') {
                return (
                  <Select
                    key={filter.id}
                    value={filterValues[filter.id] || ''}
                    onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                    options={[
                      { label: `All ${filter.label}`, value: '' },
                      ...(filter.options || []),
                    ]}
                    placeholder={filter.label}
                    style={{ minWidth: '150px' }}
                    testId={`${testId}-filter-${filter.id}`}
                  />
                );
              }
              
              if (filter.type === 'text') {
                return (
                  <Input
                    key={filter.id}
                    value={filterValues[filter.id] || ''}
                    onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                    placeholder={filter.label}
                    style={{ minWidth: '150px' }}
                    testId={`${testId}-filter-${filter.id}`}
                  />
                );
              }
              
              return null;
            })}
          </div>
        )}

        {/* Toolbar Actions */}
        {toolbarActions.length > 0 && (
          <div style={actionsStyle}>
            {toolbarActions.map((action) => (
              <Button
                key={action.id}
                onClick={action.onClick}
                disabled={action.disabled}
                variant={action.variant || 'outlined'}
                testId={`${testId}-action-${action.id}`}
              >
                {action.icon}
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Data Grid */}
      <Table
        columns={columns.map((col) => ({
          ...col,
          id: col.id,
          label: col.label,
          width: col.width,
        }))}
        data={paginatedData}
        loading={loading}
        onRowClick={onRowClick}
        emptyMessage={emptyMessage}
        testId={`${testId}-table`}
      />

      {/* Pagination */}
      {filteredData.length > 0 && (
        <div style={paginationContainerStyle} data-testid={`${testId}-pagination-container`}>
          <div style={{ color: tokens.colors.text.secondary, fontSize: tokens.typography.fontSize.sm }}>
            Showing {Math.min((currentPage - 1) * pageSize + 1, filteredData.length)} to{' '}
            {Math.min(currentPage * pageSize, filteredData.length)} of {filteredData.length} results
          </div>
          
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              testId={`${testId}-pagination`}
            />
          )}
        </div>
      )}
    </div>
  );
};

SearchGridComposite.displayName = 'SearchGridComposite';
