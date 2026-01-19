import type { Meta, StoryObj } from '@storybook/react';
import { Table } from './Table';

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
    rows: users,
    columns: [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Name' },
      { field: 'email', header: 'Email' },
      { field: 'role', header: 'Role' },
    ],
  },
};

export const WithSorting: Story = {
  args: {
    rows: users,
    columns: [
      { field: 'id', header: 'ID', sortable: true },
      { field: 'name', header: 'Name', sortable: true },
      { field: 'email', header: 'Email', sortable: true },
      { field: 'role', header: 'Role', sortable: true },
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
        rows={products}
        columns={[
          { field: 'id', header: 'ID' },
          { field: 'name', header: 'Product' },
          { field: 'category', header: 'Category' },
          {
            field: 'price',
            header: 'Price',
            render: (row: Product) => `$${row.price}`,
          },
          { field: 'stock', header: 'Stock' },
          {
            field: 'status',
            header: 'Status',
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
        rows={users}
        columns={[
          { field: 'id', header: 'ID' },
          { field: 'name', header: 'Name' },
          { field: 'email', header: 'Email' },
          { field: 'role', header: 'Role' },
          {
            field: 'actions',
            header: 'Actions',
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
          rows={manyUsers}
          columns={[
            { field: 'id', header: 'ID' },
            { field: 'name', header: 'Name' },
            { field: 'email', header: 'Email' },
            { field: 'role', header: 'Role' },
          ]}
        />
      </div>
    );
  },
};

export const EmptyTable: Story = {
  args: {
    rows: [],
    columns: [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Name' },
      { field: 'email', header: 'Email' },
      { field: 'role', header: 'Role' },
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
            rows={users}
            columns={[
              { field: 'id', header: 'ID' },
              { field: 'name', header: 'Name' },
              { field: 'email', header: 'Email' },
              { field: 'role', header: 'Role' },
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
        rows={users}
        columns={[
          { field: 'id', header: 'ID', width: '60px' },
          { field: 'name', header: 'Name', width: '200px' },
          { field: 'email', header: 'Email', width: '250px' },
          { field: 'role', header: 'Role', width: '120px' },
        ]}
      />
    );
  },
};
