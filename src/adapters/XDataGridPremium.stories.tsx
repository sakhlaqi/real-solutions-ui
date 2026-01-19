import type { Meta, StoryObj } from '@storybook/react';
import { XDataGridPremium } from './XDataGridPremium';
import React from 'react';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid-premium';
import { Box, Chip } from '@mui/material';

const meta: Meta<typeof XDataGridPremium> = {
  title: 'Data Display/XDataGridPremium',
  component: XDataGridPremium,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'The most advanced data grid with premium features like aggregation, pivoting, and cell selection. Requires MUI X Premium license.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof XDataGridPremium>;

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'age', headerName: 'Age', type: 'number', width: 90 },
  { field: 'email', headerName: 'Email', width: 200 },
];

const rows: GridRowsProp = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, email: 'jon@example.com' },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, email: 'cersei@example.com' },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, email: 'jaime@example.com' },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, email: 'arya@example.com' },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 28, email: 'dany@example.com' },
];

export const Default: Story = {
  args: {
    rows,
    columns,
    autoHeight: true,
  },
};

export const WithCellSelection: Story = {
  args: {
    rows,
    columns,
    cellSelection: true,
    autoHeight: true,
  },
};

export const SalesAnalytics: Story = {
  render: () => {
    const salesColumns: GridColDef[] = [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'region', headerName: 'Region', width: 120 },
      { field: 'product', headerName: 'Product', width: 150 },
      { field: 'category', headerName: 'Category', width: 120 },
      { 
        field: 'revenue', 
        headerName: 'Revenue', 
        type: 'number',
        width: 130,
        valueFormatter: (value) => `$${value?.toLocaleString() || '0'}`,
      },
      { field: 'quantity', headerName: 'Quantity', type: 'number', width: 100 },
      { 
        field: 'profit', 
        headerName: 'Profit', 
        type: 'number',
        width: 130,
        valueFormatter: (value) => `$${value?.toLocaleString() || '0'}`,
      },
      { field: 'quarter', headerName: 'Quarter', width: 100 },
    ];

    const salesRows: GridRowsProp = [
      { id: 1, region: 'North', product: 'Laptop Pro', category: 'Electronics', revenue: 125000, quantity: 100, profit: 25000, quarter: 'Q1' },
      { id: 2, region: 'North', product: 'Monitor 27"', category: 'Electronics', revenue: 45000, quantity: 150, profit: 9000, quarter: 'Q1' },
      { id: 3, region: 'North', product: 'Keyboard', category: 'Accessories', revenue: 15000, quantity: 300, profit: 4500, quarter: 'Q1' },
      { id: 4, region: 'South', product: 'Laptop Pro', category: 'Electronics', revenue: 98000, quantity: 80, profit: 19600, quarter: 'Q1' },
      { id: 5, region: 'South', product: 'Mouse', category: 'Accessories', revenue: 8000, quantity: 400, profit: 2400, quarter: 'Q1' },
      { id: 6, region: 'East', product: 'Tablet', category: 'Electronics', revenue: 156000, quantity: 200, profit: 31200, quarter: 'Q1' },
      { id: 7, region: 'East', product: 'Headphones', category: 'Audio', revenue: 42000, quantity: 250, profit: 12600, quarter: 'Q1' },
      { id: 8, region: 'West', product: 'Laptop Pro', category: 'Electronics', revenue: 187000, quantity: 150, profit: 37400, quarter: 'Q1' },
      { id: 9, region: 'West', product: 'Webcam', category: 'Electronics', revenue: 28000, quantity: 350, profit: 8400, quarter: 'Q1' },
      { id: 10, region: 'North', product: 'Laptop Pro', category: 'Electronics', revenue: 142000, quantity: 115, profit: 28400, quarter: 'Q2' },
      { id: 11, region: 'North', product: 'Monitor 27"', category: 'Electronics', revenue: 52000, quantity: 175, profit: 10400, quarter: 'Q2' },
      { id: 12, region: 'South', product: 'Tablet', category: 'Electronics', revenue: 118000, quantity: 150, profit: 23600, quarter: 'Q2' },
      { id: 13, region: 'East', product: 'Headphones', category: 'Audio', revenue: 48000, quantity: 280, profit: 14400, quarter: 'Q2' },
      { id: 14, region: 'West', product: 'Keyboard', category: 'Accessories', revenue: 22000, quantity: 450, profit: 6600, quarter: 'Q2' },
    ];

    return (
      <Box sx={{ height: 650, width: '100%' }}>
        <XDataGridPremium
          rows={salesRows}
          columns={salesColumns}
          initialState={{
            pagination: { paginationModel: { pageSize: 25 } },
            aggregation: {
              model: {
                revenue: 'sum',
                quantity: 'sum',
                profit: 'sum',
              },
            },
          }}
          pinnedColumns={{ left: ['region', 'product'] }}
        />
      </Box>
    );
  },
};

export const FinancialReport: Story = {
  render: () => {
    const financialColumns: GridColDef[] = [
      { field: 'department', headerName: 'Department', width: 150 },
      { field: 'category', headerName: 'Category', width: 150 },
      { 
        field: 'budget', 
        headerName: 'Budget', 
        type: 'number',
        width: 130,
        valueFormatter: (value) => `$${value?.toLocaleString() || '0'}`,
      },
      { 
        field: 'actual', 
        headerName: 'Actual', 
        type: 'number',
        width: 130,
        valueFormatter: (value) => `$${value?.toLocaleString() || '0'}`,
      },
      { 
        field: 'variance', 
        headerName: 'Variance', 
        type: 'number',
        width: 130,
        valueFormatter: (value) => `$${value?.toLocaleString() || '0'}`,
        renderCell: (params) => {
          const value = params.value as number;
          const color = value >= 0 ? 'success' : 'error';
          return (
            <Chip 
              label={`$${value?.toLocaleString()}`} 
              color={color}
              size="small"
            />
          );
        }
      },
      { field: 'month', headerName: 'Month', width: 100 },
    ];

    const financialRows: GridRowsProp = [
      { id: 1, department: 'Engineering', category: 'Salaries', budget: 250000, actual: 245000, variance: 5000, month: 'January' },
      { id: 2, department: 'Engineering', category: 'Equipment', budget: 50000, actual: 52000, variance: -2000, month: 'January' },
      { id: 3, department: 'Engineering', category: 'Software', budget: 30000, actual: 28000, variance: 2000, month: 'January' },
      { id: 4, department: 'Marketing', category: 'Advertising', budget: 100000, actual: 105000, variance: -5000, month: 'January' },
      { id: 5, department: 'Marketing', category: 'Events', budget: 40000, actual: 38000, variance: 2000, month: 'January' },
      { id: 6, department: 'Sales', category: 'Salaries', budget: 180000, actual: 180000, variance: 0, month: 'January' },
      { id: 7, department: 'Sales', category: 'Travel', budget: 25000, actual: 28000, variance: -3000, month: 'January' },
      { id: 8, department: 'Operations', category: 'Facilities', budget: 60000, actual: 58000, variance: 2000, month: 'January' },
      { id: 9, department: 'Operations', category: 'Utilities', budget: 15000, actual: 16000, variance: -1000, month: 'January' },
      { id: 10, department: 'Engineering', category: 'Salaries', budget: 250000, actual: 248000, variance: 2000, month: 'February' },
      { id: 11, department: 'Engineering', category: 'Equipment', budget: 45000, actual: 43000, variance: 2000, month: 'February' },
      { id: 12, department: 'Marketing', category: 'Advertising', budget: 95000, actual: 98000, variance: -3000, month: 'February' },
      { id: 13, department: 'Sales', category: 'Travel', budget: 22000, actual: 25000, variance: -3000, month: 'February' },
    ];

    return (
      <Box sx={{ height: 650, width: '100%' }}>
        <XDataGridPremium
          rows={financialRows}
          columns={financialColumns}
          initialState={{
            pagination: { paginationModel: { pageSize: 25 } },
            aggregation: {
              model: {
                budget: 'sum',
                actual: 'sum',
                variance: 'sum',
              },
            },
          }}
          pinnedColumns={{ left: ['department'] }}
          cellSelection
        />
      </Box>
    );
  },
};

export const EmployeePerformance: Story = {
  render: () => {
    const performanceColumns: GridColDef[] = [
      { field: 'employee', headerName: 'Employee', width: 150 },
      { field: 'department', headerName: 'Department', width: 130 },
      { field: 'role', headerName: 'Role', width: 150 },
      { field: 'projects', headerName: 'Projects', type: 'number', width: 100 },
      { field: 'completionRate', headerName: 'Completion %', type: 'number', width: 130 },
      { 
        field: 'rating', 
        headerName: 'Rating', 
        width: 120,
        renderCell: (params) => {
          const value = params.value as number;
          let color: 'success' | 'info' | 'warning' | 'error' = 'success';
          if (value < 3) color = 'error';
          else if (value < 4) color = 'warning';
          else if (value < 4.5) color = 'info';
          return (
            <Chip 
              label={`${value}/5`} 
              color={color}
              size="small"
            />
          );
        }
      },
      { field: 'quarter', headerName: 'Quarter', width: 100 },
    ];

    const performanceRows: GridRowsProp = [
      { id: 1, employee: 'John Doe', department: 'Engineering', role: 'Senior Developer', projects: 8, completionRate: 95, rating: 4.8, quarter: 'Q1' },
      { id: 2, employee: 'Jane Smith', department: 'Engineering', role: 'Lead Developer', projects: 6, completionRate: 92, rating: 4.7, quarter: 'Q1' },
      { id: 3, employee: 'Bob Johnson', department: 'Design', role: 'UI Designer', projects: 12, completionRate: 88, rating: 4.5, quarter: 'Q1' },
      { id: 4, employee: 'Alice Brown', department: 'Marketing', role: 'Marketing Manager', projects: 10, completionRate: 90, rating: 4.6, quarter: 'Q1' },
      { id: 5, employee: 'Charlie Wilson', department: 'Sales', role: 'Sales Executive', projects: 15, completionRate: 85, rating: 4.2, quarter: 'Q1' },
      { id: 6, employee: 'Diana Lee', department: 'Engineering', role: 'Developer', projects: 7, completionRate: 82, rating: 4.0, quarter: 'Q1' },
      { id: 7, employee: 'Eve Martinez', department: 'Design', role: 'UX Designer', projects: 9, completionRate: 91, rating: 4.6, quarter: 'Q1' },
      { id: 8, employee: 'Frank Davis', department: 'Operations', role: 'Operations Manager', projects: 11, completionRate: 87, rating: 4.4, quarter: 'Q1' },
    ];

    return (
      <Box sx={{ height: 500, width: '100%' }}>
        <XDataGridPremium
          rows={performanceRows}
          columns={performanceColumns}
          initialState={{
            pagination: { paginationModel: { pageSize: 25 } },
            aggregation: {
              model: {
                projects: 'sum',
                completionRate: 'avg',
                rating: 'avg',
              },
            },
          }}
          checkboxSelection
          cellSelection
        />
      </Box>
    );
  },
};
