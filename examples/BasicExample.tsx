/**
 * Example: Basic Usage with Internal Components
 */

import React from 'react';
import { UIProvider, Button, Input, Select } from '../src';

export function BasicExample() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [role, setRole] = React.useState('');

  const handleSubmit = () => {
    console.log({ name, email, role });
  };

  return (
    <UIProvider defaultProvider="internal">
      <div style={{ padding: '2rem', maxWidth: '400px' }}>
        <h2>User Registration (Internal Components)</h2>
        
        <Input
          label="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
          placeholder="John Doe"
        />
        
        <Input
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
          placeholder="john@example.com"
        />
        
        <Select
          label="Role"
          value={role}
          onChange={(value) => setRole(String(value))}
          options={[
            { value: 'admin', label: 'Administrator' },
            { value: 'user', label: 'User' },
            { value: 'guest', label: 'Guest' },
          ]}
          fullWidth
        />
        
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
        >
          Submit
        </Button>
      </div>
    </UIProvider>
  );
}
