import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from '../../src/adapters/Spinner';

/**
 * Spinner component that adapts to the selected UI provider.
 * 
 * ## Supported Providers
 * - **internal**: Custom in-house implementation
 * - **mui**: Material-UI CircularProgress
 * - **radix**: Radix UI Spinner
 * - **shadcn**: shadcn/ui Spinner
 */
const meta = {
  title: 'Feedback/Spinner',
  component: Spinner,
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
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Spinner size="small" />
      <Spinner size="medium" />
      <Spinner size="large" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <Spinner color="primary" />
      <Spinner color="secondary" />
      <Spinner color="error" />
      <Spinner color="warning" />
      <Spinner color="info" />
      <Spinner color="success" />
    </div>
  ),
};

export const WithText: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <Spinner />
      <div>Loading...</div>
    </div>
  ),
};

export const InButton: Story = {
  render: () => (
    <button
      style={{
        padding: '0.75rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        cursor: 'not-allowed',
        opacity: 0.7,
      }}
      disabled
    >
      <Spinner size="small" />
      Loading...
    </button>
  ),
};

export const Overlay: Story = {
  render: () => (
    <div
      style={{
        position: 'relative',
        width: '400px',
        height: '300px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          borderRadius: '8px',
        }}
      >
        <Spinner size="large" />
        <div>Loading content...</div>
      </div>
      <div style={{ color: '#999' }}>Content beneath overlay</div>
    </div>
  ),
};

export const CenteredInCard: Story = {
  render: () => (
    <div
      style={{
        width: '300px',
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      <Spinner />
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontWeight: 'bold' }}>Loading your data</div>
        <div style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.25rem' }}>
          Please wait...
        </div>
      </div>
    </div>
  ),
};
