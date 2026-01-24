import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '../../src/adapters/Select';
import { useState } from 'react';

/**
 * Select component that adapts to the selected UI provider.
 * 
 * ## Supported Providers
 * - **internal**: Custom in-house implementation
 * - **mui**: Material-UI Select
 * - **radix**: Radix UI Select
 * - **shadcn**: shadcn/ui Select (Radix + Tailwind)
 */
const meta = {
  title: 'Forms/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
    multiple: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const basicOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'mx', label: 'Mexico' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
];

export const Default: Story = {
  args: {
    options: basicOptions,
    placeholder: 'Select an option',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    placeholder: 'Select a country',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    value: 'us',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Select',
    options: basicOptions,
    value: 'option1',
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    error: 'Please select a country',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    helperText: 'Select your country of residence',
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <Select {...args} size="small" label="Small" />
      <Select {...args} size="medium" label="Medium" />
      <Select {...args} size="large" label="Large" />
    </div>
  ),
  args: {
    options: basicOptions,
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Full Width Select',
    options: countryOptions,
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Required: Story = {
  args: {
    label: 'Required Field',
    options: basicOptions,
    required: true,
  },
};

export const WithDisabledOption: Story = {
  args: {
    label: 'Select with disabled option',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2 (disabled)', disabled: true },
      { value: 'option3', label: 'Option 3' },
    ],
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: '300px' }}>
        <Select
          label="Select a country"
          options={countryOptions}
          value={value}
          onChange={(val) => setValue(val as string)}
        />
        {value && <p style={{ marginTop: '1rem' }}>Selected: {value}</p>}
      </div>
    );
  },
};
