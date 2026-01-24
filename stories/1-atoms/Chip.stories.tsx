import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from '../../src/adapters/Chip';

const meta: Meta<typeof Chip> = {
  title: 'Data Display/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    label: 'Chip',
  },
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Chip label="Default" color="default" />
      <Chip label="Primary" color="primary" />
      <Chip label="Secondary" color="secondary" />
      <Chip label="Success" color="success" />
      <Chip label="Error" color="error" />
      <Chip label="Warning" color="warning" />
      <Chip label="Info" color="info" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <Chip label="Filled" variant="filled" color="primary" />
      <Chip label="Outlined" variant="outlined" color="primary" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <Chip label="Small" size="small" color="primary" />
      <Chip label="Medium" size="medium" color="primary" />
    </div>
  ),
};

export const Clickable: Story = {
  args: {
    label: 'Click Me',
    color: 'primary',
    onClick: () => alert('Chip clicked!'),
  },
};

export const Deletable: Story = {
  args: {
    label: 'Delete Me',
    color: 'secondary',
    onDelete: () => alert('Delete clicked!'),
  },
};

export const ClickableAndDeletable: Story = {
  args: {
    label: 'Click or Delete',
    color: 'primary',
    onClick: () => alert('Chip clicked!'),
    onDelete: () => alert('Delete clicked!'),
  },
};

export const TagsExample: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Chip label="React" color="primary" onDelete={() => {}} />
      <Chip label="TypeScript" color="info" onDelete={() => {}} />
      <Chip label="Vite" color="secondary" onDelete={() => {}} />
      <Chip label="Storybook" color="success" onDelete={() => {}} />
      <Chip label="Tailwind" color="warning" onDelete={() => {}} />
    </div>
  ),
};

export const StatusChips: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      <Chip label="Active" color="success" variant="filled" />
      <Chip label="Pending" color="warning" variant="filled" />
      <Chip label="Inactive" color="default" variant="outlined" />
      <Chip label="Error" color="error" variant="filled" />
    </div>
  ),
};
