import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from '../../src/adapters/IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'Buttons/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    children: <span>🔍</span>,
    'aria-label': 'search',
  },
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <IconButton aria-label="default">
        <span>⭐</span>
      </IconButton>
      <IconButton color="primary" aria-label="primary">
        <span>❤️</span>
      </IconButton>
      <IconButton color="secondary" aria-label="secondary">
        <span>🔔</span>
      </IconButton>
      <IconButton color="success" aria-label="success">
        <span>✓</span>
      </IconButton>
      <IconButton color="error" aria-label="error">
        <span>✕</span>
      </IconButton>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <IconButton size="small" aria-label="small">
        <span style={{ fontSize: '0.875rem' }}>🔍</span>
      </IconButton>
      <IconButton size="medium" aria-label="medium">
        <span>🔍</span>
      </IconButton>
      <IconButton size="large" aria-label="large">
        <span style={{ fontSize: '1.5rem' }}>🔍</span>
      </IconButton>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    children: <span>🔒</span>,
    disabled: true,
    'aria-label': 'locked',
  },
};

export const CommonActions: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <IconButton aria-label="search" onClick={() => alert('Search')}>
        <span>🔍</span>
      </IconButton>
      <IconButton aria-label="settings" onClick={() => alert('Settings')}>
        <span>⚙️</span>
      </IconButton>
      <IconButton aria-label="notifications" onClick={() => alert('Notifications')}>
        <span>🔔</span>
      </IconButton>
      <IconButton aria-label="favorite" onClick={() => alert('Favorite')}>
        <span>❤️</span>
      </IconButton>
      <IconButton aria-label="share" onClick={() => alert('Share')}>
        <span>🔗</span>
      </IconButton>
      <IconButton aria-label="delete" color="error" onClick={() => alert('Delete')}>
        <span>🗑️</span>
      </IconButton>
      <IconButton aria-label="edit" onClick={() => alert('Edit')}>
        <span>✏️</span>
      </IconButton>
      <IconButton aria-label="download" onClick={() => alert('Download')}>
        <span>⬇️</span>
      </IconButton>
    </div>
  ),
};

export const WithTooltip: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <div title="Search">
        <IconButton aria-label="search">
          <span>🔍</span>
        </IconButton>
      </div>
      <div title="Settings">
        <IconButton aria-label="settings">
          <span>⚙️</span>
        </IconButton>
      </div>
      <div title="Notifications">
        <IconButton aria-label="notifications">
          <span>🔔</span>
        </IconButton>
      </div>
    </div>
  ),
};

export const InAppBar: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.5rem 1rem',
        background: '#1976d2',
        color: 'white',
        borderRadius: '4px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <IconButton aria-label="menu" style={{ color: 'white' }}>
          <span>☰</span>
        </IconButton>
        <h2 style={{ margin: 0, fontSize: '1.25rem' }}>App Title</h2>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <IconButton aria-label="search" style={{ color: 'white' }}>
          <span>🔍</span>
        </IconButton>
        <IconButton aria-label="notifications" style={{ color: 'white' }}>
          <span>🔔</span>
        </IconButton>
        <IconButton aria-label="account" style={{ color: 'white' }}>
          <span>👤</span>
        </IconButton>
      </div>
    </div>
  ),
};

export const MediaControls: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        padding: '2rem',
        background: '#f5f5f5',
        borderRadius: '8px',
      }}
    >
      <IconButton aria-label="previous" size="large">
        <span>⏮️</span>
      </IconButton>
      <IconButton aria-label="rewind" size="large">
        <span>⏪</span>
      </IconButton>
      <IconButton
        aria-label="play"
        size="large"
        style={{
          background: '#1976d2',
          color: 'white',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
        }}
      >
        <span style={{ fontSize: '1.5rem' }}>▶️</span>
      </IconButton>
      <IconButton aria-label="forward" size="large">
        <span>⏩</span>
      </IconButton>
      <IconButton aria-label="next" size="large">
        <span>⏭️</span>
      </IconButton>
    </div>
  ),
};

export const WithBadge: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <div style={{ position: 'relative' }}>
        <IconButton aria-label="notifications">
          <span>🔔</span>
        </IconButton>
        <span
          style={{
            position: 'absolute',
            top: '0',
            right: '0',
            background: '#d32f2f',
            color: 'white',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem',
            fontWeight: 'bold',
          }}
        >
          5
        </span>
      </div>
      <div style={{ position: 'relative' }}>
        <IconButton aria-label="messages">
          <span>✉️</span>
        </IconButton>
        <span
          style={{
            position: 'absolute',
            top: '0',
            right: '0',
            background: '#1976d2',
            color: 'white',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem',
            fontWeight: 'bold',
          }}
        >
          12
        </span>
      </div>
    </div>
  ),
};

export const FloatingActions: Story = {
  render: () => (
    <div style={{ position: 'relative', height: '200px', background: '#f5f5f5', borderRadius: '8px' }}>
      <div
        style={{
          position: 'absolute',
          bottom: '1rem',
          right: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        <IconButton
          aria-label="add"
          style={{
            background: '#1976d2',
            color: 'white',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          }}
        >
          <span style={{ fontSize: '1.5rem' }}>+</span>
        </IconButton>
        <IconButton
          aria-label="edit"
          style={{
            background: '#fff',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          <span>✏️</span>
        </IconButton>
      </div>
    </div>
  ),
};
