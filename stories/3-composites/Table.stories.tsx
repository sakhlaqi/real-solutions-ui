import type { Meta, StoryObj } from '@storybook/react';
import { Table } from '../../src/adapters/Table';

const meta: Meta<typeof Table> = {
  title: 'Data Display/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Manager' },
];

export const Default: Story = {
  args: {
    data: users,
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'role', label: 'Role' },
    ],
  },
};

export const WithSorting: Story = {
  args: {
    data: users,
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'role', label: 'Role' },
    ],
  },
};

export const ProductsTable: Story = {
  render: () => {
    interface Product {
      id: number;
      name: string;
      category: string;
      price: number;
      stock: number;
      status: string;
    }

    const products: Product[] = [
      { id: 1, name: 'Laptop', category: 'Electronics', price: 999, stock: 15, status: 'In Stock' },
      { id: 2, name: 'Mouse', category: 'Accessories', price: 25, stock: 50, status: 'In Stock' },
      { id: 3, name: 'Keyboard', category: 'Accessories', price: 75, stock: 30, status: 'In Stock' },
      { id: 4, name: 'Monitor', category: 'Electronics', price: 299, stock: 0, status: 'Out of Stock' },
      { id: 5, name: 'Webcam', category: 'Electronics', price: 89, stock: 8, status: 'Low Stock' },
    ];

    return (
      <Table
        data={products}
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'name', label: 'Product' },
          { key: 'category', label: 'Category' },
          {
            key: 'price',
            label: 'Price',
            render: (row: Product) => `$${row.price}`,
          },
          { key: 'stock', label: 'Stock' },
          {
            key: 'status',
            label: 'Status',
            render: (row: Product) => (
              <span
                style={{
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  background: row.status === 'In Stock' ? '#d4edda' : row.status === 'Low Stock' ? '#fff3cd' : '#f8d7da',
                  color: row.status === 'In Stock' ? '#155724' : row.status === 'Low Stock' ? '#856404' : '#721c24',
                }}
              >
                {row.status}
              </span>
            ),
          },
        ]}
      />
    );
  },
};

export const WithActions: Story = {
  render: () => {
    const handleEdit = (user: User) => {
      alert(`Edit user: ${user.name}`);
    };

    const handleDelete = (user: User) => {
      alert(`Delete user: ${user.name}`);
    };

    return (
      <Table
        data={users}
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'role', label: 'Role' },
          {
            key: 'actions',
            label: 'Actions',
            render: (row: User) => (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => handleEdit(row)}
                  style={{
                    padding: '0.25rem 0.75rem',
                    border: '1px solid #1976d2',
                    background: 'transparent',
                    color: '#1976d2',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(row)}
                  style={{
                    padding: '0.25rem 0.75rem',
                    border: '1px solid #d32f2f',
                    background: 'transparent',
                    color: '#d32f2f',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </div>
            ),
          },
        ]}
      />
    );
  },
};

export const DenseTable: Story = {
  render: () => {
    const manyUsers = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: i % 3 === 0 ? 'Admin' : i % 3 === 1 ? 'Manager' : 'User',
    }));

    return (
      <div style={{ maxHeight: '400px', overflow: 'auto' }}>
        <Table
          data={manyUsers}
          columns={[
            { key: 'id', label: 'ID' },
            { key: 'name', label: 'Name' },
            { key: 'email', label: 'Email' },
            { key: 'role', label: 'Role' },
          ]}
        />
      </div>
    );
  },
};

export const EmptyTable: Story = {
  args: {
    data: [],
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'role', label: 'Role' },
    ],
  },
};

export const StripedRows: Story = {
  render: () => {
    return (
      <div>
        <style>{`
          .striped-table tbody tr:nth-child(even) {
            background-color: #f5f5f5;
          }
          .striped-table tbody tr:hover {
            background-color: #e3f2fd;
          }
        `}</style>
        <div className="striped-table">
          <Table
            data={users}
            columns={[
              { key: 'id', label: 'ID' },
              { key: 'name', label: 'Name' },
              { key: 'email', label: 'Email' },
              { key: 'role', label: 'Role' },
            ]}
          />
        </div>
      </div>
    );
  },
};

export const WithCustomWidth: Story = {
  render: () => {
    return (
      <Table
        data={users}
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'role', label: 'Role' },
        ]}
      />
    );
  },
};

/**
 * Table with comprehensive business data.
 */
export const WithData: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates a table with realistic business data including formatted values and status indicators.',
      },
    },
  },
  render: () => {
    interface Employee {
      id: number;
      name: string;
      department: string;
      position: string;
      salary: number;
      startDate: string;
      status: 'Active' | 'On Leave' | 'Inactive';
    }

    const employees: Employee[] = [
      { id: 1001, name: 'Sarah Johnson', department: 'Engineering', position: 'Senior Developer', salary: 125000, startDate: '2019-03-15', status: 'Active' },
      { id: 1002, name: 'Michael Chen', department: 'Design', position: 'Lead Designer', salary: 115000, startDate: '2020-06-01', status: 'Active' },
      { id: 1003, name: 'Emily Rodriguez', department: 'Marketing', position: 'Marketing Manager', salary: 105000, startDate: '2018-11-20', status: 'Active' },
      { id: 1004, name: 'David Kim', department: 'Sales', position: 'Sales Director', salary: 140000, startDate: '2017-02-10', status: 'On Leave' },
      { id: 1005, name: 'Jessica Taylor', department: 'HR', position: 'HR Specialist', salary: 85000, startDate: '2021-09-05', status: 'Active' },
      { id: 1006, name: 'Robert Wilson', department: 'Engineering', position: 'DevOps Engineer', salary: 120000, startDate: '2019-07-12', status: 'Active' },
      { id: 1007, name: 'Amanda Brown', department: 'Finance', position: 'Financial Analyst', salary: 95000, startDate: '2020-01-08', status: 'Inactive' },
    ];

    return (
      <Table
        data={employees}
        columns={[
          { key: 'id', label: 'Employee ID' },
          { key: 'name', label: 'Name' },
          { key: 'department', label: 'Department' },
          { key: 'position', label: 'Position' },
          {
            key: 'salary',
            label: 'Annual Salary',
            render: (value) => `$${(value as number).toLocaleString()}`,
          },
          { key: 'startDate', label: 'Start Date' },
          {
            key: 'status',
            label: 'Status',
            render: (value) => {
              const status = value as string;
              const colors = {
                Active: { bg: '#e8f5e9', color: '#2e7d32' },
                'On Leave': { bg: '#fff3e0', color: '#ef6c00' },
                Inactive: { bg: '#ffebee', color: '#c62828' },
              };
              const style = colors[status as keyof typeof colors];
              return (
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  backgroundColor: style.bg,
                  color: style.color,
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}>
                  {status}
                </span>
              );
            },
          },
        ]}
      />
    );
  },
};

/**
 * Table in loading state.
 */
export const Loading: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Shows table with loading skeleton rows.',
      },
    },
  },
  render: () => {
    const loadingData = Array(5).fill(null).map((_, i) => ({
      id: i,
      name: 'Loading...',
      email: 'Loading...',
      role: 'Loading...',
    }));

    return (
      <div style={{ opacity: 0.6 }}>
        <Table
          data={loadingData}
          columns={[
            { key: 'id', label: 'ID' },
            { key: 'name', label: 'Name' },
            { key: 'email', label: 'Email' },
            { key: 'role', label: 'Role' },
          ]}
        />
      </div>
    );
  },
};

/**
 * Empty table state - already exists as EmptyTable, keeping for consistency.
 */
export const Empty: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Table with no data rows, showing column headers only.',
      },
    },
  },
  args: {
    data: [],
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'department', label: 'Department' },
      { key: 'role', label: 'Role' },
    ],
  },
};

/**
 * Table showing error state.
 */
export const Error: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Table displaying error message when data fails to load.',
      },
    },
  },
  render: () => {
    return (
      <div>
        <div style={{ 
          padding: '2rem', 
          textAlign: 'center', 
          backgroundColor: '#ffebee',
          borderRadius: '4px',
          marginBottom: '1rem',
          color: '#c62828'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '0.5rem' }}>⚠️</div>
          <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Failed to Load Table Data</div>
          <div style={{ fontSize: '14px' }}>Unable to fetch records. Please try again later.</div>
        </div>
        <Table
          data={[]}
          columns={[
            { key: 'id', label: 'ID' },
            { key: 'name', label: 'Name' },
            { key: 'email', label: 'Email' },
            { key: 'role', label: 'Role' },
          ]}
        />
      </div>
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
This story tests how Table handles provider switching.

**Testing Instructions:**
1. Use the **UI Provider** toolbar control to switch between providers
2. Verify the table renders consistently across providers
3. Check that column headers are properly styled
4. Test row hover states
5. Verify custom cell renderers work correctly

**Expected Behavior:**
- All providers should render table structure consistently
- Headers, rows, and cells should align properly
- Hover states should work (if supported by provider)
- Custom cell renderers should display identically
- Table styling should adapt to provider theme
        `,
      },
    },
  },
  render: () => {
    interface TestData {
      id: number;
      text: string;
      number: number;
      status: string;
    }

    const testData: TestData[] = [
      { id: 1, text: 'Test Row 1', number: 100, status: 'Active' },
      { id: 2, text: 'Test Row 2', number: 200, status: 'Inactive' },
      { id: 3, text: 'Test Row 3', number: 300, status: 'Active' },
    ];

    return (
      <Table
        data={testData}
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'text', label: 'Text' },
          {
            key: 'number',
            label: 'Number',
            render: (value) => <strong>${(value as number).toLocaleString()}</strong>,
          },
          {
            key: 'status',
            label: 'Status',
            render: (value) => (
              <span style={{
                padding: '4px 8px',
                borderRadius: '4px',
                backgroundColor: value === 'Active' ? '#e8f5e9' : '#ffebee',
                color: value === 'Active' ? '#2e7d32' : '#c62828',
                fontSize: '12px',
              }}>
                {value as string}
              </span>
            ),
          },
        ]}
      />
    );
  },
};

