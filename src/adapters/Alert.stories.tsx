import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from '../adapters/Alert';

/**
 * Alert component that adapts to the selected UI provider.
 * 
 * ## Supported Providers
 * - **internal**: Custom in-house implementation
 * - **mui**: Material-UI Alert
 * - **radix**: Radix UI Alert (via Callout)
 * - **shadcn**: shadcn/ui Alert (Radix + Tailwind)
 */
const meta = {
  title: 'Feedback/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    severity: {
      control: 'select',
      options: ['success', 'info', 'warning', 'error'],
    },
    variant: {
      control: 'select',
      options: ['standard', 'filled', 'outlined'],
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is a default alert message.',
  },
};

export const Success: Story = {
  args: {
    severity: 'success',
    children: 'Your changes have been saved successfully!',
  },
};

export const Info: Story = {
  args: {
    severity: 'info',
    children: 'This is an informational message.',
  },
};

export const Warning: Story = {
  args: {
    severity: 'warning',
    children: 'Please review your input before submitting.',
  },
};

export const Error: Story = {
  args: {
    severity: 'error',
    children: 'An error occurred while processing your request.',
  },
};

export const AllSeverities: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '400px' }}>
      <Alert severity="success">Success: Operation completed!</Alert>
      <Alert severity="info">Info: Here's something you should know.</Alert>
      <Alert severity="warning">Warning: Please be careful.</Alert>
      <Alert severity="error">Error: Something went wrong.</Alert>
    </div>
  ),
};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '400px' }}>
      <Alert severity="success" variant="standard">Standard variant</Alert>
      <Alert severity="success" variant="filled">Filled variant</Alert>
      <Alert severity="success" variant="outlined">Outlined variant</Alert>
    </div>
  ),
};

export const WithTitle: Story = {
  args: {
    severity: 'info',
    title: 'Important Information',
    children: 'This alert has both a title and a message.',
  },
};

export const LongMessage: Story = {
  args: {
    severity: 'warning',
    title: 'Data Loss Warning',
    children: 'If you proceed with this action, all unsaved changes will be permanently lost. This operation cannot be undone. Please make sure to save your work before continuing. Consider backing up your data if this is an important operation.',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px', maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithCloseButton: Story = {
  args: {
    severity: 'info',
    children: 'You can close this alert.',
    onClose: () => alert('Alert closed'),
  },
};
