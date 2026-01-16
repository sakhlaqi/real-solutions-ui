/**
 * Example: Dynamic Provider Switching
 */

import React from 'react';
import { UIProvider, useUIContext, Button, Input, Table } from '../src';

function ProviderSwitchDemo() {
  const { provider, setProvider, theme, toggleThemeMode } = useUIContext();
  const [name, setName] = React.useState('');

  const tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Guest' },
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ 
        background: theme.mode === 'dark' ? '#333' : '#f5f5f5',
        padding: '1rem',
        marginBottom: '2rem',
        borderRadius: '8px'
      }}>
        <h3>Controls</h3>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <button onClick={() => setProvider('internal')}>
            Use Internal Components
          </button>
          <button onClick={() => setProvider('mui')}>
            Use Material-UI Components
          </button>
          <button onClick={toggleThemeMode}>
            Toggle {theme.mode === 'light' ? 'Dark' : 'Light'} Mode
          </button>
        </div>
        <p><strong>Current Provider:</strong> {provider}</p>
        <p><strong>Current Theme:</strong> {theme.mode}</p>
      </div>

      <h3>Interactive Components</h3>
      <p>These components switch implementation based on the provider!</p>

      <Input
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        fullWidth
      />

      <Button variant="contained" color="primary">
        This is a {provider} Button!
      </Button>

      <h3 style={{ marginTop: '2rem' }}>Data Table</h3>
      <Table
        columns={[
          { field: 'name', headerName: 'Name', width: 200 },
          { field: 'email', headerName: 'Email', flex: 1 },
          { field: 'role', headerName: 'Role', width: 150 },
        ]}
        rows={tableData}
        pagination
      />
    </div>
  );
}

export function DynamicSwitchingExample() {
  return (
    <UIProvider defaultProvider="internal">
      <ProviderSwitchDemo />
    </UIProvider>
  );
}
