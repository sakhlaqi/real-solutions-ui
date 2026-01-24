import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../../src/adapters/Badge';

/**
 * Badge component that adapts to the selected UI provider.
 * 
 * ## Supported Providers
 * - **internal**: Custom in-house implementation
 * - **mui**: Material-UI Badge

 */
const meta = {
  title: 'Data Display/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'warning', 'info', 'success'],
    },
    variant: {
      control: 'select',
      options: ['standard', 'dot'],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    badgeContent: 4,
    children: <div style={{ 
      width: '40px', 
      height: '40px', 
      backgroundColor: '#e0e0e0', 
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>📧</div>,
  },
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      <Badge badgeContent={4} color="primary">
        <div style={{ width: '40px', height: '40px', backgroundColor: '#e0e0e0', borderRadius: '4px' }} />
      </Badge>
      <Badge badgeContent={4} color="secondary">
        <div style={{ width: '40px', height: '40px', backgroundColor: '#e0e0e0', borderRadius: '4px' }} />
      </Badge>
      <Badge badgeContent={4} color="error">
        <div style={{ width: '40px', height: '40px', backgroundColor: '#e0e0e0', borderRadius: '4px' }} />
      </Badge>
      <Badge badgeContent={4} color="warning">
        <div style={{ width: '40px', height: '40px', backgroundColor: '#e0e0e0', borderRadius: '4px' }} />
      </Badge>
      <Badge badgeContent={4} color="info">
        <div style={{ width: '40px', height: '40px', backgroundColor: '#e0e0e0', borderRadius: '4px' }} />
      </Badge>
      <Badge badgeContent={4} color="success">
        <div style={{ width: '40px', height: '40px', backgroundColor: '#e0e0e0', borderRadius: '4px' }} />
      </Badge>
    </div>
  ),
};

export const DotVariant: Story = {
  args: {
    variant: 'dot',
    color: 'error',
    children: <div style={{ 
      width: '40px', 
      height: '40px', 
      backgroundColor: '#e0e0e0', 
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>🔔</div>,
  },
};

export const Numbers: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      <Badge badgeContent={1} color="error">
        <div style={{ width: '40px', height: '40px', backgroundColor: '#e0e0e0', borderRadius: '4px' }} />
      </Badge>
      <Badge badgeContent={9} color="error">
        <div style={{ width: '40px', height: '40px', backgroundColor: '#e0e0e0', borderRadius: '4px' }} />
      </Badge>
      <Badge badgeContent={99} color="error">
        <div style={{ width: '40px', height: '40px', backgroundColor: '#e0e0e0', borderRadius: '4px' }} />
      </Badge>
      <Badge badgeContent={999} color="error">
        <div style={{ width: '40px', height: '40px', backgroundColor: '#e0e0e0', borderRadius: '4px' }} />
      </Badge>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      <Badge badgeContent={4} color="error">
        <span style={{ fontSize: '2rem' }}>📧</span>
      </Badge>
      <Badge badgeContent={12} color="primary">
        <span style={{ fontSize: '2rem' }}>🔔</span>
      </Badge>
      <Badge variant="dot" color="success">
        <span style={{ fontSize: '2rem' }}>👤</span>
      </Badge>
    </div>
  ),
};

export const MaxBadgeContent: Story = {
  args: {
    badgeContent: 1000,
    max: 99,
    color: 'error',
    children: <div style={{ 
      width: '40px', 
      height: '40px', 
      backgroundColor: '#e0e0e0', 
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>📧</div>,
  },
};
