import type { Meta, StoryObj } from '@storybook/react';
import { SpeedDial } from './SpeedDial';

/**
 * SpeedDial component for floating action buttons with expandable actions.
 * 
 * ## Features
 * - Expandable action menu
 * - Multiple directions
 * - Icon support
 * - Adapts to UI provider
 */
const meta = {
  title: 'Navigation/SpeedDial',
  component: SpeedDial,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SpeedDial>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Speed dial expanding upward
 */
export const Default: Story = {
  render: (args) => (
    <div style={{ width: '400px', height: '300px', position: 'relative', border: '1px solid #ddd', padding: '1rem' }}>
      <h3>Speed Dial Example</h3>
      <p>Click the button in the bottom-right corner</p>
      <div style={{ position: 'absolute', bottom: '16px', right: '16px' }}>
        <SpeedDial
          {...args}
          icon={<span style={{ fontSize: '1.5rem' }}>➕</span>}
          ariaLabel="Actions"
          actions={[
            { 
              icon: <span>💾</span>, 
              name: 'Save', 
              onClick: () => alert('Save clicked') 
            },
            { 
              icon: <span>📋</span>, 
              name: 'Copy', 
              onClick: () => alert('Copy clicked') 
            },
            { 
              icon: <span>🖨️</span>, 
              name: 'Print', 
              onClick: () => alert('Print clicked') 
            },
          ]}
        />
      </div>
    </div>
  ),
  args: {
    icon: <span>➕</span>,
    ariaLabel: 'Actions',
    actions: [],
  },
};

/**
 * Speed dial expanding to the left
 */
export const DirectionLeft: Story = {
  render: (args) => (
    <div style={{ width: '400px', height: '300px', position: 'relative', border: '1px solid #ddd', padding: '1rem' }}>
      <h3>Speed Dial - Left Direction</h3>
      <p>Actions expand to the left</p>
      <div style={{ position: 'absolute', bottom: '16px', right: '16px' }}>
        <SpeedDial
          {...args}
          icon={<span style={{ fontSize: '1.5rem' }}>⚙️</span>}
          ariaLabel="Settings"
          direction="left"
          actions={[
            { 
              icon: <span>🌙</span>, 
              name: 'Dark Mode', 
              onClick: () => alert('Dark Mode toggled') 
            },
            { 
              icon: <span>🔔</span>, 
              name: 'Notifications', 
              onClick: () => alert('Notifications clicked') 
            },
            { 
              icon: <span>👤</span>, 
              name: 'Profile', 
              onClick: () => alert('Profile clicked') 
            },
          ]}
        />
      </div>
    </div>
  ),
  args: {
    icon: <span>⚙️</span>,
    ariaLabel: 'Settings',
    direction: 'left',
    actions: [],
  },
};

/**
 * Speed dial with many actions
 */
export const ManyActions: Story = {
  render: (args) => (
    <div style={{ width: '400px', height: '400px', position: 'relative', border: '1px solid #ddd', padding: '1rem' }}>
      <h3>Speed Dial - Many Actions</h3>
      <p>Multiple action items</p>
      <div style={{ position: 'absolute', bottom: '16px', right: '16px' }}>
        <SpeedDial
          {...args}
          icon={<span style={{ fontSize: '1.5rem' }}>📱</span>}
          ariaLabel="App Actions"
          direction="up"
          actions={[
            { icon: <span>📧</span>, name: 'Email', onClick: () => alert('Email') },
            { icon: <span>💬</span>, name: 'Message', onClick: () => alert('Message') },
            { icon: <span>📞</span>, name: 'Call', onClick: () => alert('Call') },
            { icon: <span>📹</span>, name: 'Video', onClick: () => alert('Video') },
            { icon: <span>📷</span>, name: 'Camera', onClick: () => alert('Camera') },
            { icon: <span>📂</span>, name: 'Files', onClick: () => alert('Files') },
          ]}
        />
      </div>
    </div>
  ),
  args: {
    icon: <span>📱</span>,
    ariaLabel: 'App Actions',
    direction: 'up',
    actions: [],
  },
};

/**
 * Speed dial expanding downward
 */
export const DirectionDown: Story = {
  render: (args) => (
    <div style={{ width: '400px', height: '300px', position: 'relative', border: '1px solid #ddd', padding: '1rem' }}>
      <h3>Speed Dial - Down Direction</h3>
      <p>Actions expand downward from top-right</p>
      <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
        <SpeedDial
          {...args}
          icon={<span style={{ fontSize: '1.5rem' }}>☰</span>}
          ariaLabel="Menu"
          direction="down"
          actions={[
            { icon: <span>🏠</span>, name: 'Home', onClick: () => alert('Home') },
            { icon: <span>⚙️</span>, name: 'Settings', onClick: () => alert('Settings') },
            { icon: <span>ℹ️</span>, name: 'About', onClick: () => alert('About') },
            { icon: <span>🚪</span>, name: 'Logout', onClick: () => alert('Logout') },
          ]}
        />
      </div>
    </div>
  ),
  args: {
    icon: <span>☰</span>,
    ariaLabel: 'Menu',
    direction: 'down',
    actions: [],
  },
};
