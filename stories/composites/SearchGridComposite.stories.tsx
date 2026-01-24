import type { Meta, StoryObj } from '@storybook/react';
import React, { Suspense } from 'react';
import { useRenderContext } from '../../src/renderer/RenderContext';
import { resolveComponentAdapter } from '../../src/adapters';
import type { SearchGridCompositeProps } from '../../src/core/composites/SearchGrid/types';

/**
 * SearchGridComposite
 * 
 * A comprehensive data grid component with search, filtering, and pagination.
 * Combines multiple atomic UI components into a cohesive data management interface.
 * 
 * **Provider Support:**
 * - **MUI**: Uses Material-UI X DataGrid with full feature set
 * - **Internal**: Falls back to MUI implementation
 * 
 * **Features:**
 * - Search across all columns
 * - Multi-column sorting
 * - Custom filters (text, select, date, number, boolean)
 * - Pagination with configurable page sizes
 * - Row selection (single/multiple/none)
 * - Row actions
 * - Toolbar actions
 * - Custom cell renderers
 * - Loading states
 * - Empty states
 */

interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  role: string;
  salary: number;
  startDate: string;
  active: boolean;
}

const sampleData: Employee[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', department: 'Engineering', role: 'Senior Engineer', salary: 120000, startDate: '2020-01-15', active: true },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', department: 'Design', role: 'Lead Designer', salary: 110000, startDate: '2019-03-20', active: true },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', department: 'Engineering', role: 'Engineer', salary: 90000, startDate: '2021-06-10', active: true },
  { id: 4, name: 'Alice Williams', email: 'alice@example.com', department: 'Marketing', role: 'Marketing Manager', salary: 95000, startDate: '2020-09-01', active: true },
  { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', department: 'Sales', role: 'Sales Rep', salary: 75000, startDate: '2022-02-15', active: false },
  { id: 6, name: 'Diana Prince', email: 'diana@example.com', department: 'Engineering', role: 'Tech Lead', salary: 140000, startDate: '2018-11-30', active: true },
  { id: 7, name: 'Eve Adams', email: 'eve@example.com', department: 'HR', role: 'HR Manager', salary: 85000, startDate: '2021-01-05', active: true },
  { id: 8, name: 'Frank Miller', email: 'frank@example.com', department: 'Design', role: 'Designer', salary: 80000, startDate: '2022-07-20', active: true },
  { id: 9, name: 'Grace Lee', email: 'grace@example.com', department: 'Engineering', role: 'Engineer', salary: 95000, startDate: '2021-04-12', active: true },
  { id: 10, name: 'Henry Davis', email: 'henry@example.com', department: 'Sales', role: 'Sales Manager', salary: 105000, startDate: '2019-08-25', active: true },
];

const SearchGridWrapper = (props: SearchGridCompositeProps<Employee>) => {
  const context = useRenderContext();
  const provider = context.provider || 'mui';

  const GridAdapter = React.lazy(async () => {
    const adapter = await resolveComponentAdapter('SearchGridComposite', provider);
    if (!adapter) {
      throw new Error(`SearchGridComposite adapter not found for provider: ${provider}`);
    }
    return { default: adapter };
  });

  return (
    <Suspense fallback={<div>Loading SearchGrid...</div>}>
      <GridAdapter {...props} />
    </Suspense>
  );
};

const meta = {
  title: 'Composites/SearchGridComposite',
  component: SearchGridWrapper,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A feature-rich data grid composite component with built-in search, filtering, and pagination.

### Adapter Behavior
Use the **UI Provider** toolbar to switch between implementations:
- **MUI**: Material-UI X DataGrid with full features
- **Internal**: Fallback to MUI (can be customized)
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    dataSource: {
      control: 'text',
      description: 'Identifier for the data source',
    },
    searchEnabled: {
      control: 'boolean',
      description: 'Enable/disable search functionality',
    },
    searchPlaceholder: {
      control: 'text',
      description: 'Placeholder text for search input',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
    emptyMessage: {
      control: 'text',
      description: 'Message shown when no data',
    },
    selectionMode: {
      control: 'select',
      options: ['none', 'single', 'multiple'],
      description: 'Row selection mode',
    },
    defaultPageSize: {
      control: { type: 'select', options: [5, 10, 25, 50] },
      description: 'Initial page size',
    },
  },
} satisfies Meta<typeof SearchGridWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic grid with minimal configuration.
 */
export const Basic: Story = {
  args: {
    dataSource: 'employees',
    columns: [
      { id: 'name', label: 'Name', field: 'name', sortable: true },
      { id: 'email', label: 'Email', field: 'email' },
      { id: 'department', label: 'Department', field: 'department', sortable: true },
    ],
    data: sampleData,
    searchEnabled: false,
  },
};

/**
 * Complete grid with all features enabled.
 */
export const Complete: Story = {
  args: {
    dataSource: 'employees',
    columns: [
      { id: 'name', label: 'Name', field: 'name', sortable: true, width: 200 },
      { id: 'email', label: 'Email', field: 'email', width: 220 },
      { id: 'department', label: 'Department', field: 'department', sortable: true },
      { id: 'role', label: 'Role', field: 'role' },
      { id: 'salary', label: 'Salary', field: 'salary', sortable: true, render: (val) => `$${val.toLocaleString()}` },
      { id: 'active', label: 'Status', field: 'active', render: (val) => val ? '✅ Active' : '❌ Inactive' },
    ],
    data: sampleData,
    filters: [
      {
        id: 'department',
        label: 'Department',
        type: 'select',
        field: 'department',
        options: [
          { label: 'Engineering', value: 'Engineering' },
          { label: 'Design', value: 'Design' },
          { label: 'Marketing', value: 'Marketing' },
          { label: 'Sales', value: 'Sales' },
          { label: 'HR', value: 'HR' },
        ],
      },
      {
        id: 'active',
        label: 'Status',
        type: 'select',
        field: 'active',
        options: [
          { label: 'Active', value: true },
          { label: 'Inactive', value: false },
        ],
      },
    ],
    searchEnabled: true,
    searchPlaceholder: 'Search employees...',
    selectionMode: 'multiple',
    rowActions: [
      { id: 'edit', label: 'Edit', variant: 'primary' },
      { id: 'delete', label: 'Delete', variant: 'danger' },
    ],
    toolbarActions: [
      { id: 'add', label: 'Add Employee', variant: 'primary' },
      { id: 'export', label: 'Export', variant: 'secondary' },
    ],
    defaultPageSize: 5,
    pageSizeOptions: [5, 10, 25],
  },
};

/**
 * Grid with search enabled.
 */
export const WithSearch: Story = {
  args: {
    dataSource: 'employees',
    columns: [
      { id: 'name', label: 'Name', field: 'name', sortable: true },
      { id: 'email', label: 'Email', field: 'email' },
      { id: 'department', label: 'Department', field: 'department' },
      { id: 'role', label: 'Role', field: 'role' },
    ],
    data: sampleData,
    searchEnabled: true,
    searchPlaceholder: 'Search by name, email, or department...',
  },
};

/**
 * Grid with filters only (no search).
 */
export const WithFilters: Story = {
  args: {
    dataSource: 'employees',
    columns: [
      { id: 'name', label: 'Name', field: 'name' },
      { id: 'department', label: 'Department', field: 'department' },
      { id: 'role', label: 'Role', field: 'role' },
    ],
    data: sampleData,
    filters: [
      {
        id: 'department',
        label: 'Department',
        type: 'select',
        field: 'department',
        options: [
          { label: 'Engineering', value: 'Engineering' },
          { label: 'Design', value: 'Design' },
          { label: 'Marketing', value: 'Marketing' },
        ],
      },
    ],
    searchEnabled: false,
  },
};

/**
 * Grid with row actions.
 */
export const WithRowActions: Story = {
  args: {
    dataSource: 'employees',
    columns: [
      { id: 'name', label: 'Name', field: 'name' },
      { id: 'email', label: 'Email', field: 'email' },
      { id: 'department', label: 'Department', field: 'department' },
    ],
    data: sampleData,
    rowActions: [
      { id: 'view', label: 'View', variant: 'secondary' },
      { id: 'edit', label: 'Edit', variant: 'primary' },
      { id: 'delete', label: 'Delete', variant: 'danger' },
    ],
  },
};

/**
 * Grid with toolbar actions.
 */
export const WithToolbarActions: Story = {
  args: {
    dataSource: 'employees',
    columns: [
      { id: 'name', label: 'Name', field: 'name' },
      { id: 'email', label: 'Email', field: 'email' },
      { id: 'department', label: 'Department', field: 'department' },
    ],
    data: sampleData,
    toolbarActions: [
      { id: 'add', label: 'Add New', variant: 'primary' },
      { id: 'import', label: 'Import', variant: 'secondary' },
      { id: 'export', label: 'Export', variant: 'secondary' },
    ],
    searchEnabled: true,
  },
};

/**
 * Empty grid with no data.
 */
export const Empty: Story = {
  args: {
    dataSource: 'employees',
    columns: [
      { id: 'name', label: 'Name', field: 'name' },
      { id: 'email', label: 'Email', field: 'email' },
      { id: 'department', label: 'Department', field: 'department' },
    ],
    data: [],
    emptyMessage: 'No employees found. Add your first employee to get started.',
    searchEnabled: true,
  },
};

/**
 * Loading state.
 */
export const Loading: Story = {
  args: {
    dataSource: 'employees',
    columns: [
      { id: 'name', label: 'Name', field: 'name' },
      { id: 'email', label: 'Email', field: 'email' },
      { id: 'department', label: 'Department', field: 'department' },
    ],
    data: sampleData,
    loading: true,
  },
};

/**
 * Grid with multiple selection enabled.
 */
export const MultipleSelection: Story = {
  args: {
    dataSource: 'employees',
    columns: [
      { id: 'name', label: 'Name', field: 'name' },
      { id: 'email', label: 'Email', field: 'email' },
      { id: 'department', label: 'Department', field: 'department' },
    ],
    data: sampleData,
    selectionMode: 'multiple',
    toolbarActions: [
      { id: 'delete-selected', label: 'Delete Selected', variant: 'danger' },
    ],
  },
};

/**
 * Grid with custom cell renderers.
 */
export const CustomRenderers: Story = {
  args: {
    dataSource: 'employees',
    columns: [
      { id: 'name', label: 'Name', field: 'name', render: (val) => <strong>{val}</strong> },
      { id: 'email', label: 'Email', field: 'email', render: (val) => <a href={`mailto:${val}`}>{val}</a> },
      { 
        id: 'salary', 
        label: 'Salary', 
        field: 'salary', 
        render: (val) => (
          <span style={{ 
            color: val > 100000 ? 'green' : 'inherit',
            fontWeight: val > 100000 ? 'bold' : 'normal'
          }}>
            ${val.toLocaleString()}
          </span>
        )
      },
      {
        id: 'active',
        label: 'Status',
        field: 'active',
        render: (val) => (
          <span style={{
            padding: '4px 8px',
            borderRadius: '4px',
            backgroundColor: val ? '#e8f5e9' : '#ffebee',
            color: val ? '#2e7d32' : '#c62828',
            fontSize: '12px'
          }}>
            {val ? 'Active' : 'Inactive'}
          </span>
        )
      },
    ],
    data: sampleData,
  },
};
