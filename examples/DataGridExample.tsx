/**
 * Example: Advanced Data Grid (MUI X DataGrid)
 */

import React from 'react';
import { UIProvider } from '../src/core';
import { AdvancedTable } from '../src/providers/mui';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

export function DataGridExample() {
  const users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', joinDate: '2023-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active', joinDate: '2023-02-20' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'inactive', joinDate: '2023-03-10' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Manager', status: 'active', joinDate: '2023-01-05' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'active', joinDate: '2023-04-12' },
    { id: 6, name: 'Diana Davis', email: 'diana@example.com', role: 'Admin', status: 'active', joinDate: '2023-02-28' },
    { id: 7, name: 'Eve Martinez', email: 'eve@example.com', role: 'User', status: 'inactive', joinDate: '2023-03-15' },
    { id: 8, name: 'Frank Garcia', email: 'frank@example.com', role: 'Manager', status: 'active', joinDate: '2023-01-20' },
  ];

  const [selected, setSelected] = React.useState<User[]>([]);

  return (
    <UIProvider defaultProvider="mui">
      <div style={{ padding: '2rem' }}>
        <h2>User Management (MUI X DataGrid)</h2>
        <p>Advanced table with sorting, filtering, pagination, and selection</p>
        
        {selected.length > 0 && (
          <div style={{ 
            background: '#e3f2fd', 
            padding: '1rem', 
            marginBottom: '1rem',
            borderRadius: '4px'
          }}>
            <strong>{selected.length} users selected:</strong>{' '}
            {selected.map(u => u.name).join(', ')}
          </div>
        )}

        <AdvancedTable
          columns={[
            { field: 'name', headerName: 'Name', width: 200, sortable: true },
            { field: 'email', headerName: 'Email', flex: 1, sortable: true },
            { field: 'role', headerName: 'Role', width: 150, sortable: true, filterable: true },
            { 
              field: 'status', 
              headerName: 'Status', 
              width: 120,
              renderCell: (row: User) => (
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  background: row.status === 'active' ? '#4caf50' : '#f44336',
                  color: 'white',
                  fontSize: '12px'
                }}>
                  {row.status}
                </span>
              )
            },
            { field: 'joinDate', headerName: 'Join Date', width: 150, sortable: true },
          ]}
          rows={users}
          pagination
          pageSize={5}
          rowsPerPageOptions={[5, 10, 25]}
          checkboxSelection
          onSelectionChange={setSelected}
          onRowClick={(row) => console.log('Clicked:', row)}
        />
      </div>
    </UIProvider>
  );
}
