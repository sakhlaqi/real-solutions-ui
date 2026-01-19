import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../adapters/Checkbox';
import { useState } from 'react';

/**
 * Checkbox component that adapts to the selected UI provider.
 * 
 * ## Supported Providers
 * - **internal**: Custom in-house implementation
 * - **mui**: Material-UI Checkbox
 * - **radix**: Radix UI Checkbox
 * - **shadcn**: shadcn/ui Checkbox (Radix + Tailwind)
 */
const meta = {
  title: 'Forms/Checkbox',
  component: Checkbox,
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
    indeterminate: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked checkbox',
    checked: true,
  },
};

export const Unchecked: Story = {
  args: {
    label: 'Unchecked checkbox',
    checked: false,
  },
};

export const Disabled: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Checkbox {...args} label="Disabled unchecked" disabled checked={false} />
      <Checkbox {...args} label="Disabled checked" disabled checked={true} />
    </div>
  ),
};

export const Indeterminate: Story = {
  args: {
    label: 'Indeterminate state',
    indeterminate: true,
    checked: false,
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Checkbox {...args} size="small" label="Small checkbox" />
      <Checkbox {...args} size="medium" label="Medium checkbox" />
      <Checkbox {...args} size="large" label="Large checkbox" />
    </div>
  ),
};

export const Colors: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Checkbox {...args} color="primary" label="Primary" checked />
      <Checkbox {...args} color="secondary" label="Secondary" checked />
      <Checkbox {...args} color="error" label="Error" checked />
      <Checkbox {...args} color="warning" label="Warning" checked />
      <Checkbox {...args} color="info" label="Info" checked />
      <Checkbox {...args} color="success" label="Success" checked />
    </div>
  ),
};

export const WithoutLabel: Story = {
  args: {
    'aria-label': 'Checkbox without visible label',
  },
};

export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        label={`Checkbox is ${checked ? 'checked' : 'unchecked'}`}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
};
