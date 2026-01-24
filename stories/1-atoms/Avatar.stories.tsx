import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '../../src/adapters/Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Data Display/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    children: 'JD',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    alt: 'User Avatar',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Avatar size="small">S</Avatar>
      <Avatar size="medium">M</Avatar>
      <Avatar size="large">L</Avatar>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Avatar variant="circular">C</Avatar>
      <Avatar variant="rounded">R</Avatar>
      <Avatar variant="square">S</Avatar>
    </div>
  ),
};

export const WithImages: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Avatar src="https://i.pravatar.cc/150?img=1" alt="User 1" size="small" />
      <Avatar src="https://i.pravatar.cc/150?img=2" alt="User 2" size="medium" />
      <Avatar src="https://i.pravatar.cc/150?img=3" alt="User 3" size="large" />
    </div>
  ),
};

export const WithInitials: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Avatar>AB</Avatar>
      <Avatar>CD</Avatar>
      <Avatar>EF</Avatar>
      <Avatar>GH</Avatar>
    </div>
  ),
};

export const FallbackImage: Story = {
  args: {
    src: 'https://broken-url.com/image.jpg',
    alt: 'Broken Image',
    children: 'FB',
  },
};

export const AvatarGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', marginLeft: '1rem' }}>
      <Avatar src="https://i.pravatar.cc/150?img=1" style={{ marginLeft: '-0.5rem' }} />
      <Avatar src="https://i.pravatar.cc/150?img=2" style={{ marginLeft: '-0.5rem' }} />
      <Avatar src="https://i.pravatar.cc/150?img=3" style={{ marginLeft: '-0.5rem' }} />
      <Avatar style={{ marginLeft: '-0.5rem' }}>+3</Avatar>
    </div>
  ),
};
