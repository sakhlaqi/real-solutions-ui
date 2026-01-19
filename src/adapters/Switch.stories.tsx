import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '../adapters/Switch';
import { useState } from 'react';

/**
 * Switch component that adapts to the selected UI provider.
 * 
 * ## Supported Providers
 * - **internal**: Custom in-house implementation
 * - **mui**: Material-UI Switch
 * - **radix**: Radix UI Switch
 * - **shadcn**: shadcn/ui Switch (Radix + Tailwind)
 */
const meta = {
  title: 'Forms/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'warning', 'info', 'success'],
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Enable notifications',
  },
};

export const Checked: Story = {
  args: {
    label: 'Enabled',
    checked: true,
  },
};

export const Unchecked: Story = {
  args: {
    label: 'Disabled',
    checked: false,
  },
};

export const Disabled: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Switch {...args} label="Disabled off" disabled checked={false} />
      <Switch {...args} label="Disabled on" disabled checked={true} />
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Switch {...args} size="small" label="Small switch" checked />
      <Switch {...args} size="medium" label="Medium switch" checked />
      <Switch {...args} size="large" label="Large switch" checked />
    </div>
  ),
};

export const Colors: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Switch {...args} color="primary" label="Primary" checked />
      <Switch {...args} color="secondary" label="Secondary" checked />
      <Switch {...args} color="error" label="Error" checked />
      <Switch {...args} color="warning" label="Warning" checked />
      <Switch {...args} color="info" label="Info" checked />
      <Switch {...args} color="success" label="Success" checked />
    </div>
  ),
};

export const WithoutLabel: Story = {
  args: {
    'aria-label': 'Toggle feature',
  },
};

export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Switch
        label={`Feature is ${checked ? 'enabled' : 'disabled'}`}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
};
