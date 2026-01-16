/**
 * Example: Material-UI Provider
 */

import React from 'react';
import { UIProvider, Button, Input, Checkbox, DatePicker } from '../src';

export function MUIExample() {
  const [formData, setFormData] = React.useState({
    name: '',
    date: null as Date | null,
    newsletter: false,
  });

  return (
    <UIProvider defaultProvider="mui">
      <div style={{ padding: '2rem', maxWidth: '400px' }}>
        <h2>Contact Form (Material-UI Components)</h2>
        
        <Input
          label="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          fullWidth
        />
        
        <DatePicker
          label="Preferred Date"
          value={formData.date}
          onChange={(date) => setFormData({ ...formData, date })}
          fullWidth
        />
        
        <Checkbox
          label="Subscribe to newsletter"
          checked={formData.newsletter}
          onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })}
        />
        
        <Button variant="contained" color="primary" fullWidth>
          Submit (MUI Button!)
        </Button>
      </div>
    </UIProvider>
  );
}
