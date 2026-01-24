import type { Meta, StoryObj } from '@storybook/react';
import { XDataGrid } from '../../src/adapters/XDataGrid';
import React from 'react';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Chip, Box } from '@mui/material';

const meta: Meta<typeof XDataGrid> = {
  title: 'Data Display/XDataGrid',
  component: XDataGrid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A powerful data grid component for displaying and manipulating tabular data. Free version with essential features including sorting, filtering, and pagination.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof XDataGrid>;

// Basic user data
const userColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'age', headerName: 'Age', type: 'number', width: 90 },
  { field: 'email', headerName: 'Email', width: 200 },
];

const userRows: GridRowsProp = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, email: 'jon.snow@example.com' },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, email: 'cersei@example.com' },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, email: 'jaime@example.com' },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, email: 'arya@example.com' },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null, email: 'dany@example.com' },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150, email: 'melisandre@example.com' },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, email: 'ferrara@example.com' },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, email: 'rossini@example.com' },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, email: 'harvey@example.com' },
];

export const Default: Story = {
  args: {
    rows: userRows,
    columns: userColumns,
    autoHeight: true,
  },
};

export const WithCheckboxSelection: Story = {
  args: {
    rows: userRows,
    columns: userColumns,
    checkboxSelection: true,
    autoHeight: true,
  },
};

export const WithDensity: Story = {
  args: {
    rows: userRows,
    columns: userColumns,
    density: 'compact',
    autoHeight: true,
  },
};

export const Loading: Story = {
  args: {
    rows: [],
    columns: userColumns,
    loading: true,
    autoHeight: true,
  },
};

export const CustomPagination: Story = {
  args: {
    rows: userRows,
    columns: userColumns,
    pageSizeOptions: [5, 10, 25],
    initialState: {
      pagination: { paginationModel: { pageSize: 5 } },
    },
    autoHeight: true,
  },
};

// Time Off Calendar Story
export const TimeOffCalendar: Story = {
  render: () => {
    const columns: GridColDef[] = [
      { field: 'employee', headerName: 'Employee', width: 150 },
      { field: 'department', headerName: 'Department', width: 130 },
      { field: 'startDate', headerName: 'Start Date', width: 120 },
      { field: 'endDate', headerName: 'End Date', width: 120 },
      { field: 'days', headerName: 'Days', type: 'number', width: 80 },
      { 
        field: 'type', 
        headerName: 'Type', 
        width: 130,
        renderCell: (params) => {
          const colors: Record<string, 'primary' | 'success' | 'warning' | 'error'> = {
            'Vacation': 'primary',
            'Sick Leave': 'error',
            'Personal': 'warning',
            'Public Holiday': 'success',
          };
          return (
            <Chip 
              label={params.value} 
              color={colors[params.value as string] || 'default'}
              size="small"
            />
          );
        }
      },
      { 
        field: 'status', 
        headerName: 'Status', 
        width: 120,
        renderCell: (params) => {
          const colors: Record<string, 'success' | 'warning' | 'error'> = {
            'Approved': 'success',
            'Pending': 'warning',
            'Rejected': 'error',
          };
          return (
            <Chip 
              label={params.value} 
              color={colors[params.value as string] || 'default'}
              size="small"
              variant="outlined"
            />
          );
        }
      },
    ];

    const rows: GridRowsProp = [
      { id: 1, employee: 'John Doe', department: 'Engineering', startDate: '2026-01-20', endDate: '2026-01-24', days: 5, type: 'Vacation', status: 'Approved' },
      { id: 2, employee: 'Jane Smith', department: 'Marketing', startDate: '2026-01-22', endDate: '2026-01-22', days: 1, type: 'Sick Leave', status: 'Approved' },
      { id: 3, employee: 'Bob Johnson', department: 'Sales', startDate: '2026-02-01', endDate: '2026-02-05', days: 5, type: 'Vacation', status: 'Pending' },
      { id: 4, employee: 'Alice Brown', department: 'HR', startDate: '2026-01-25', endDate: '2026-01-26', days: 2, type: 'Personal', status: 'Approved' },
      { id: 5, employee: 'Charlie Wilson', department: 'Engineering', startDate: '2026-02-10', endDate: '2026-02-14', days: 5, type: 'Vacation', status: 'Pending' },
      { id: 6, employee: 'Diana Lee', department: 'Design', startDate: '2026-01-27', endDate: '2026-01-27', days: 1, type: 'Sick Leave', status: 'Approved' },
      { id: 7, employee: 'Eve Martinez', department: 'Finance', startDate: '2026-02-15', endDate: '2026-02-21', days: 7, type: 'Vacation', status: 'Pending' },
      { id: 8, employee: 'Frank Davis', department: 'Operations', startDate: '2026-01-28', endDate: '2026-01-30', days: 3, type: 'Personal', status: 'Approved' },
      { id: 9, employee: 'Grace Taylor', department: 'Marketing', startDate: '2026-03-01', endDate: '2026-03-07', days: 7, type: 'Vacation', status: 'Pending' },
      { id: 10, employee: 'Henry Anderson', department: 'Sales', startDate: '2026-01-29', endDate: '2026-01-29', days: 1, type: 'Sick Leave', status: 'Approved' },
    ];

    return (
      <Box sx={{ height: 600, width: '100%' }}>
        <XDataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[5, 10, 25]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    );
  },
};

// Inventory Dashboard Story
export const InventoryDashboard: Story = {
  render: () => {
    const columns: GridColDef[] = [
      { field: 'sku', headerName: 'SKU', width: 100 },
      { field: 'product', headerName: 'Product', width: 200 },
      { field: 'category', headerName: 'Category', width: 120 },
      { field: 'quantity', headerName: 'Quantity', type: 'number', width: 100 },
      { 
        field: 'stockStatus', 
        headerName: 'Stock Status', 
        width: 130,
        renderCell: (params) => {
          const colors: Record<string, 'success' | 'warning' | 'error'> = {
            'In Stock': 'success',
            'Low Stock': 'warning',
            'Out of Stock': 'error',
          };
          return (
            <Chip 
              label={params.value} 
              color={colors[params.value as string] || 'default'}
              size="small"
            />
          );
        }
      },
      { field: 'location', headerName: 'Location', width: 120 },
      { field: 'supplier', headerName: 'Supplier', width: 150 },
      { 
        field: 'price', 
        headerName: 'Unit Price', 
        type: 'number',
        width: 120,
        valueFormatter: (value) => `$${value?.toFixed(2) || '0.00'}`,
      },
      { 
        field: 'totalValue', 
        headerName: 'Total Value', 
        type: 'number',
        width: 130,
        valueFormatter: (value) => `$${value?.toFixed(2) || '0.00'}`,
      },
    ];

    const rows: GridRowsProp = [
      { id: 1, sku: 'LAP-001', product: 'Dell Latitude 5420', category: 'Laptops', quantity: 45, stockStatus: 'In Stock', location: 'Warehouse A', supplier: 'Dell Inc.', price: 1299.99, totalValue: 58499.55 },
      { id: 2, sku: 'MON-002', product: 'LG 27" Monitor', category: 'Monitors', quantity: 8, stockStatus: 'Low Stock', location: 'Warehouse A', supplier: 'LG Electronics', price: 349.99, totalValue: 2799.92 },
      { id: 3, sku: 'KEY-003', product: 'Logitech MX Keys', category: 'Keyboards', quantity: 120, stockStatus: 'In Stock', location: 'Warehouse B', supplier: 'Logitech', price: 99.99, totalValue: 11998.80 },
      { id: 4, sku: 'MOU-004', product: 'Logitech MX Master 3', category: 'Mice', quantity: 0, stockStatus: 'Out of Stock', location: 'Warehouse B', supplier: 'Logitech', price: 99.99, totalValue: 0 },
      { id: 5, sku: 'HEA-005', product: 'Sony WH-1000XM5', category: 'Headphones', quantity: 25, stockStatus: 'In Stock', location: 'Warehouse A', supplier: 'Sony', price: 399.99, totalValue: 9999.75 },
      { id: 6, sku: 'DOC-006', product: 'Dell Dock WD19', category: 'Docking Stations', quantity: 12, stockStatus: 'Low Stock', location: 'Warehouse A', supplier: 'Dell Inc.', price: 249.99, totalValue: 2999.88 },
      { id: 7, sku: 'CAB-007', product: 'USB-C Cable 6ft', category: 'Cables', quantity: 500, stockStatus: 'In Stock', location: 'Warehouse C', supplier: 'Anker', price: 14.99, totalValue: 7495.00 },
      { id: 8, sku: 'CHA-008', product: 'Anker PowerPort', category: 'Chargers', quantity: 75, stockStatus: 'In Stock', location: 'Warehouse C', supplier: 'Anker', price: 29.99, totalValue: 2249.25 },
      { id: 9, sku: 'WEB-009', product: 'Logitech C920 Webcam', category: 'Webcams', quantity: 5, stockStatus: 'Low Stock', location: 'Warehouse B', supplier: 'Logitech', price: 79.99, totalValue: 399.95 },
      { id: 10, sku: 'SPE-010', product: 'Jabra Speak 510', category: 'Speakers', quantity: 30, stockStatus: 'In Stock', location: 'Warehouse B', supplier: 'Jabra', price: 149.99, totalValue: 4499.70 },
    ];

    return (
      <Box sx={{ height: 650, width: '100%' }}>
        <XDataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[5, 10, 25, 50]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    );
  },
};

export const ProductCatalog: Story = {
  render: () => {
    const columns: GridColDef[] = [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'name', headerName: 'Product Name', width: 200 },
      { field: 'category', headerName: 'Category', width: 130 },
      { 
        field: 'price', 
        headerName: 'Price', 
        type: 'number',
        width: 120,
        valueFormatter: (value) => `$${value?.toFixed(2)}`,
      },
      { field: 'stock', headerName: 'Stock', type: 'number', width: 100 },
      { 
        field: 'available', 
        headerName: 'Available', 
        width: 120,
        renderCell: (params) => (
          <Chip 
            label={params.value ? 'Yes' : 'No'} 
            color={params.value ? 'success' : 'error'}
            size="small"
          />
        )
      },
    ];

    const rows: GridRowsProp = [
      { id: 1, name: 'Laptop Pro 15"', category: 'Electronics', price: 1299.99, stock: 45, available: true },
      { id: 2, name: 'Wireless Mouse', category: 'Accessories', price: 29.99, stock: 150, available: true },
      { id: 3, name: 'USB-C Hub', category: 'Accessories', price: 49.99, stock: 0, available: false },
      { id: 4, name: 'Monitor 27"', category: 'Electronics', price: 399.99, stock: 23, available: true },
      { id: 5, name: 'Mechanical Keyboard', category: 'Accessories', price: 129.99, stock: 67, available: true },
      { id: 6, name: 'Webcam HD', category: 'Electronics', price: 79.99, stock: 12, available: true },
      { id: 7, name: 'Headphones Wireless', category: 'Audio', price: 199.99, stock: 0, available: false },
      { id: 8, name: 'Desk Lamp LED', category: 'Office', price: 39.99, stock: 89, available: true },
    ];

    return (
      <Box sx={{ height: 500, width: '100%' }}>
        <XDataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[5, 10, 25]}
          checkboxSelection
        />
      </Box>
    );
  },
};

export const ControlledSelection: Story = {
  render: () => {
    const [selectionModel, setSelectionModel] = React.useState<any>([]);

    return (
      <Box>
        <Box sx={{ mb: 2 }}>
          <strong>Selected IDs:</strong> {selectionModel.join(', ') || 'None'}
        </Box>
        <Box sx={{ height: 400, width: '100%' }}>
          <XDataGrid
            rows={userRows}
            columns={userColumns}
            checkboxSelection
            rowSelectionModel={selectionModel}
            onRowSelectionModelChange={(newSelection) => setSelectionModel(newSelection)}
          />
        </Box>
      </Box>
    );
  },
};

/**
 * XDataGrid with comprehensive business data.
 */
export const WithData: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates a fully featured data grid with realistic business data, custom renderers, and interactions.',
      },
    },
  },
  render: () => {
    const columns: GridColDef[] = [
      { field: 'id', headerName: 'Order ID', width: 100 },
      { field: 'customer', headerName: 'Customer', width: 180 },
      { field: 'product', headerName: 'Product', width: 200 },
      { 
        field: 'amount', 
        headerName: 'Amount', 
        type: 'number', 
        width: 120,
        valueFormatter: (value) => `$${value.toLocaleString()}`,
      },
      { field: 'date', headerName: 'Order Date', width: 130 },
      { 
        field: 'status', 
        headerName: 'Status', 
        width: 130,
        renderCell: (params) => {
          const colors: Record<string, any> = {
            Completed: { bg: '#e8f5e9', color: '#2e7d32' },
            Pending: { bg: '#fff3e0', color: '#ef6c00' },
            Cancelled: { bg: '#ffebee', color: '#c62828' },
          };
          const style = colors[params.value];
          return (
            <span style={{
              padding: '4px 8px',
              borderRadius: '4px',
              backgroundColor: style.bg,
              color: style.color,
              fontSize: '12px',
              fontWeight: 'bold',
            }}>
              {params.value}
            </span>
          );
        }
      },
    ];

    const rows: GridRowsProp = [
      { id: 1001, customer: 'John Smith', product: 'Premium Subscription', amount: 299, date: '2024-01-15', status: 'Completed' },
      { id: 1002, customer: 'Sarah Johnson', product: 'Enterprise License', amount: 1499, date: '2024-01-16', status: 'Completed' },
      { id: 1003, customer: 'Michael Brown', product: 'Starter Package', amount: 99, date: '2024-01-17', status: 'Pending' },
      { id: 1004, customer: 'Emily Davis', product: 'Professional Plan', amount: 499, date: '2024-01-18', status: 'Completed' },
      { id: 1005, customer: 'David Wilson', product: 'Team License', amount: 799, date: '2024-01-19', status: 'Cancelled' },
      { id: 1006, customer: 'Jessica Martinez', product: 'Premium Subscription', amount: 299, date: '2024-01-20', status: 'Completed' },
      { id: 1007, customer: 'Christopher Lee', product: 'Enterprise License', amount: 1499, date: '2024-01-21', status: 'Pending' },
      { id: 1008, customer: 'Amanda Taylor', product: 'Starter Package', amount: 99, date: '2024-01-22', status: 'Completed' },
    ];

    return (
      <Box sx={{ height: 500, width: '100%' }}>
        <XDataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[5, 10, 25]}
          checkboxSelection
        />
      </Box>
    );
  },
};

/**
 * Empty XDataGrid state - already exists as Loading with empty rows.
 */
export const Empty: Story = {
  parameters: {
    docs: {
      description: {
        story: 'XDataGrid with no data rows, showing column headers and empty message.',
      },
    },
  },
  args: {
    rows: [],
    columns: userColumns,
    autoHeight: true,
  },
};

/**
 * XDataGrid showing error state.
 */
export const Error: Story = {
  parameters: {
    docs: {
      description: {
        story: 'XDataGrid displaying error message when data fails to load.',
      },
    },
  },
  render: () => {
    return (
      <Box>
        <Box sx={{ 
          padding: '2rem', 
          textAlign: 'center', 
          backgroundColor: '#ffebee',
          borderRadius: '4px',
          marginBottom: '1rem',
          color: '#c62828'
        }}>
          <Box sx={{ fontSize: '32px', marginBottom: '0.5rem' }}>⚠️</Box>
          <Box sx={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Failed to Load Data</Box>
          <Box sx={{ fontSize: '14px' }}>Unable to fetch grid data. Please try again later.</Box>
        </Box>
        <Box sx={{ height: 400, width: '100%' }}>
          <XDataGrid
            rows={[]}
            columns={userColumns}
          />
        </Box>
      </Box>
    );
  },
};

/**
 * Tests adapter fallback behavior across providers.
 */
export const AdapterFallback: Story = {
  parameters: {
    docs: {
      description: {
        story: `
This story tests how XDataGrid handles provider switching.

**Testing Instructions:**
1. Use the **UI Provider** toolbar control to switch between providers
2. Verify the grid renders consistently across providers
3. Test sorting by clicking column headers
4. Test filtering if available
5. Test pagination controls
6. Test row selection with checkboxes
7. Verify custom cell renderers work correctly

**Expected Behavior:**
- MUI provider: Uses MUI X DataGrid with full feature set
- Internal/other providers: May fall back to MUI or use alternative implementations
- Core functionality (sorting, pagination, selection) should work consistently
- Custom cell renderers should display identically
- Grid styling should adapt to provider theme

**Note:** XDataGrid is tightly coupled to MUI X DataGrid. Some providers may not have equivalent implementations.
        `,
      },
    },
  },
  render: () => {
    const columns: GridColDef[] = [
      { field: 'id', headerName: 'ID', width: 80 },
      { field: 'name', headerName: 'Name', width: 150 },
      { 
        field: 'value', 
        headerName: 'Value', 
        type: 'number', 
        width: 120,
        valueFormatter: (value) => `$${value}`,
      },
      { 
        field: 'active', 
        headerName: 'Active', 
        width: 100,
        renderCell: (params) => (
          <Chip 
            label={params.value ? 'Yes' : 'No'} 
            color={params.value ? 'success' : 'default'}
            size="small"
          />
        )
      },
    ];

    const rows: GridRowsProp = [
      { id: 1, name: 'Test Item 1', value: 100, active: true },
      { id: 2, name: 'Test Item 2', value: 200, active: false },
      { id: 3, name: 'Test Item 3', value: 300, active: true },
      { id: 4, name: 'Test Item 4', value: 400, active: true },
      { id: 5, name: 'Test Item 5', value: 500, active: false },
    ];

    return (
      <Box sx={{ height: 400, width: '100%' }}>
        <XDataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </Box>
    );
  },
};

