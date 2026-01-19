import type { Meta, StoryObj } from '@storybook/react';
import { XDataGridPro } from './XDataGridPro';
import React from 'react';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid-pro';
import { Box, Chip } from '@mui/material';

const meta: Meta<typeof XDataGridPro> = {
  title: 'Data Display/XDataGridPro',
  component: XDataGridPro,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'An advanced data grid with pro features like tree data, row grouping, and column pinning. Requires MUI X Pro license.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof XDataGridPro>;

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

export const WithPinnedColumns: Story = {
  args: {
    rows,
    columns,
    pinnedColumns: { left: ['id'], right: ['email'] },
    autoHeight: true,
  },
};

export const TreeDataExample: Story = {
  render: () => {
    const treeColumns: GridColDef[] = [
      { field: 'name', headerName: 'Name', width: 250 },
      { field: 'type', headerName: 'Type', width: 150 },
      { field: 'size', headerName: 'Size', width: 100 },
      { field: 'modified', headerName: 'Modified', width: 200 },
    ];

    const treeRows = [
      { id: 1, name: 'Documents', type: 'Folder', size: '-', modified: '2026-01-15', path: ['Documents'] },
      { id: 2, name: 'Work', type: 'Folder', size: '-', modified: '2026-01-18', path: ['Documents', 'Work'] },
      { id: 3, name: 'Project A', type: 'Folder', size: '-', modified: '2026-01-19', path: ['Documents', 'Work', 'Project A'] },
      { id: 4, name: 'report.pdf', type: 'PDF', size: '2.4 MB', modified: '2026-01-19 10:30', path: ['Documents', 'Work', 'Project A', 'report.pdf'] },
      { id: 5, name: 'data.xlsx', type: 'Excel', size: '1.8 MB', modified: '2026-01-19 11:45', path: ['Documents', 'Work', 'Project A', 'data.xlsx'] },
      { id: 6, name: 'Personal', type: 'Folder', size: '-', modified: '2026-01-10', path: ['Documents', 'Personal'] },
      { id: 7, name: 'photos.zip', type: 'Archive', size: '45 MB', modified: '2026-01-10 14:20', path: ['Documents', 'Personal', 'photos.zip'] },
      { id: 8, name: 'Downloads', type: 'Folder', size: '-', modified: '2026-01-19', path: ['Downloads'] },
      { id: 9, name: 'setup.exe', type: 'Application', size: '125 MB', modified: '2026-01-19 09:15', path: ['Downloads', 'setup.exe'] },
    ];

    return (
      <Box sx={{ height: 500, width: '100%' }}>
        <XDataGridPro
          rows={treeRows}
          columns={treeColumns}
          treeData
          getTreeDataPath={(row) => row.path}
          initialState={{
            pagination: { paginationModel: { pageSize: 25 } },
          }}
        />
      </Box>
    );
  },
};

export const ProjectManagement: Story = {
  render: () => {
    const projectColumns: GridColDef[] = [
      { field: 'task', headerName: 'Task', width: 250 },
      { field: 'assignee', headerName: 'Assignee', width: 150 },
      { 
        field: 'status', 
        headerName: 'Status', 
        width: 130,
        renderCell: (params) => {
          const colors: Record<string, 'success' | 'warning' | 'info' | 'error'> = {
            'Completed': 'success',
            'In Progress': 'info',
            'Pending': 'warning',
            'Blocked': 'error',
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
      { field: 'dueDate', headerName: 'Due Date', width: 120 },
      { field: 'progress', headerName: 'Progress', type: 'number', width: 100 },
    ];

    const projectRows = [
      { id: 1, task: 'Q1 Planning', assignee: 'Team Lead', status: 'Completed', dueDate: '2026-01-31', progress: 100, path: ['Q1 Planning'] },
      { id: 2, task: 'Frontend Development', assignee: 'Dev Team', status: 'In Progress', dueDate: '2026-02-28', progress: 65, path: ['Q1 Planning', 'Frontend Development'] },
      { id: 3, task: 'Component Library', assignee: 'John Doe', status: 'Completed', dueDate: '2026-02-15', progress: 100, path: ['Q1 Planning', 'Frontend Development', 'Component Library'] },
      { id: 4, task: 'Page Templates', assignee: 'Jane Smith', status: 'In Progress', dueDate: '2026-02-28', progress: 70, path: ['Q1 Planning', 'Frontend Development', 'Page Templates'] },
      { id: 5, task: 'Backend Development', assignee: 'Dev Team', status: 'In Progress', dueDate: '2026-03-15', progress: 45, path: ['Q1 Planning', 'Backend Development'] },
      { id: 6, task: 'API Endpoints', assignee: 'Bob Johnson', status: 'In Progress', dueDate: '2026-03-01', progress: 60, path: ['Q1 Planning', 'Backend Development', 'API Endpoints'] },
      { id: 7, task: 'Database Schema', assignee: 'Alice Brown', status: 'Completed', dueDate: '2026-02-10', progress: 100, path: ['Q1 Planning', 'Backend Development', 'Database Schema'] },
      { id: 8, task: 'Testing', assignee: 'QA Team', status: 'Pending', dueDate: '2026-03-20', progress: 0, path: ['Q1 Planning', 'Testing'] },
      { id: 9, task: 'Unit Tests', assignee: 'Charlie Wilson', status: 'Pending', dueDate: '2026-03-15', progress: 0, path: ['Q1 Planning', 'Testing', 'Unit Tests'] },
      { id: 10, task: 'Integration Tests', assignee: 'Diana Lee', status: 'Pending', dueDate: '2026-03-20', progress: 0, path: ['Q1 Planning', 'Testing', 'Integration Tests'] },
    ];

    return (
      <Box sx={{ height: 600, width: '100%' }}>
        <XDataGridPro
          rows={projectRows}
          columns={projectColumns}
          treeData
          getTreeDataPath={(row) => row.path}
          pinnedColumns={{ left: ['task'] }}
          initialState={{
            pagination: { paginationModel: { pageSize: 25 } },
          }}
          checkboxSelection
        />
      </Box>
    );
  },
};

export const SalesHierarchy: Story = {
  render: () => {
    const salesColumns: GridColDef[] = [
      { field: 'region', headerName: 'Region/Office', width: 200 },
      { field: 'manager', headerName: 'Manager', width: 150 },
      { field: 'employees', headerName: 'Employees', type: 'number', width: 100 },
      { 
        field: 'revenue', 
        headerName: 'Revenue', 
        type: 'number',
        width: 150,
        valueFormatter: (value) => `$${value?.toLocaleString() || '0'}`,
      },
      { 
        field: 'growth', 
        headerName: 'Growth', 
        width: 120,
        renderCell: (params) => {
          const value = params.value as number;
          const color = value >= 0 ? 'success' : 'error';
          return (
            <Chip 
              label={`${value >= 0 ? '+' : ''}${value}%`} 
              color={color}
              size="small"
            />
          );
        }
      },
    ];

    const salesRows = [
      { id: 1, region: 'North America', manager: 'Sarah Johnson', employees: 125, revenue: 5420000, growth: 12.5, path: ['North America'] },
      { id: 2, region: 'East Coast', manager: 'Michael Chen', employees: 45, revenue: 2100000, growth: 15.2, path: ['North America', 'East Coast'] },
      { id: 3, region: 'New York', manager: 'David Lee', employees: 25, revenue: 1350000, growth: 18.3, path: ['North America', 'East Coast', 'New York'] },
      { id: 4, region: 'Boston', manager: 'Emily Wang', employees: 20, revenue: 750000, growth: 10.5, path: ['North America', 'East Coast', 'Boston'] },
      { id: 5, region: 'West Coast', manager: 'Jennifer Martinez', employees: 50, revenue: 2200000, growth: 14.8, path: ['North America', 'West Coast'] },
      { id: 6, region: 'San Francisco', manager: 'Robert Kim', employees: 30, revenue: 1500000, growth: 16.2, path: ['North America', 'West Coast', 'San Francisco'] },
      { id: 7, region: 'Los Angeles', manager: 'Lisa Garcia', employees: 20, revenue: 700000, growth: 11.5, path: ['North America', 'West Coast', 'Los Angeles'] },
      { id: 8, region: 'Central', manager: 'James Wilson', employees: 30, revenue: 1120000, growth: 8.3, path: ['North America', 'Central'] },
      { id: 9, region: 'Europe', manager: 'Thomas Anderson', employees: 95, revenue: 3850000, growth: 9.7, path: ['Europe'] },
      { id: 10, region: 'UK', manager: 'Sophie Taylor', employees: 35, revenue: 1650000, growth: 11.2, path: ['Europe', 'UK'] },
      { id: 11, region: 'Germany', manager: 'Hans Mueller', employees: 40, revenue: 1500000, growth: 8.5, path: ['Europe', 'Germany'] },
      { id: 12, region: 'France', manager: 'Marie Dubois', employees: 20, revenue: 700000, growth: 7.8, path: ['Europe', 'France'] },
    ];

    return (
      <Box sx={{ height: 650, width: '100%' }}>
        <XDataGridPro
          rows={salesRows}
          columns={salesColumns}
          treeData
          getTreeDataPath={(row) => row.path}
          pinnedColumns={{ left: ['region'] }}
          initialState={{
            pagination: { paginationModel: { pageSize: 25 } },
          }}
        />
      </Box>
    );
  },
};
