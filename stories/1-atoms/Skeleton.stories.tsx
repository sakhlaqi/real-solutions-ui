import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '../../src/adapters/Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Text: Story = {
  args: {
    variant: 'text',
    width: '100%',
  },
};

export const Rectangular: Story = {
  args: {
    variant: 'rectangular',
    width: 200,
    height: 100,
  },
};

export const Circular: Story = {
  args: {
    variant: 'circular',
    width: 40,
    height: 40,
  },
};

export const Animations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Pulse Animation</div>
        <Skeleton variant="rectangular" width={300} height={60} animation="pulse" />
      </div>
      <div>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Wave Animation</div>
        <Skeleton variant="rectangular" width={300} height={60} animation="wave" />
      </div>
      <div>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>No Animation</div>
        <Skeleton variant="rectangular" width={300} height={60} animation={false} />
      </div>
    </div>
  ),
};

export const CardSkeleton: Story = {
  render: () => (
    <div style={{ width: 300, border: '1px solid #e0e0e0', borderRadius: '8px', padding: '1rem' }}>
      <Skeleton variant="rectangular" width="100%" height={180} style={{ marginBottom: '1rem', borderRadius: '4px' }} />
      <Skeleton variant="text" width="60%" style={{ marginBottom: '0.5rem' }} />
      <Skeleton variant="text" width="100%" style={{ marginBottom: '0.5rem' }} />
      <Skeleton variant="text" width="80%" />
    </div>
  ),
};

export const UserProfileSkeleton: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem' }}>
      <Skeleton variant="circular" width={60} height={60} />
      <div style={{ flex: 1 }}>
        <Skeleton variant="text" width="40%" style={{ marginBottom: '0.5rem' }} />
        <Skeleton variant="text" width="60%" />
      </div>
    </div>
  ),
};

export const ListSkeleton: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #e0e0e0' }}>
          <Skeleton variant="circular" width={40} height={40} />
          <div style={{ flex: 1 }}>
            <Skeleton variant="text" width="70%" style={{ marginBottom: '0.5rem' }} />
            <Skeleton variant="text" width="40%" />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const BlogPostSkeleton: Story = {
  render: () => (
    <div style={{ maxWidth: 600 }}>
      <Skeleton variant="text" width="80%" height={40} style={{ marginBottom: '1rem' }} />
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <Skeleton variant="circular" width={32} height={32} />
        <div style={{ flex: 1 }}>
          <Skeleton variant="text" width="30%" />
        </div>
      </div>
      <Skeleton variant="rectangular" width="100%" height={300} style={{ marginBottom: '1rem', borderRadius: '4px' }} />
      <Skeleton variant="text" width="100%" style={{ marginBottom: '0.5rem' }} />
      <Skeleton variant="text" width="100%" style={{ marginBottom: '0.5rem' }} />
      <Skeleton variant="text" width="100%" style={{ marginBottom: '0.5rem' }} />
      <Skeleton variant="text" width="70%" />
    </div>
  ),
};

export const TableSkeleton: Story = {
  render: () => (
    <div style={{ width: 600 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', padding: '1rem', borderBottom: '2px solid #e0e0e0' }}>
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </div>
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', padding: '1rem', borderBottom: '1px solid #e0e0e0' }}>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </div>
      ))}
    </div>
  ),
};
