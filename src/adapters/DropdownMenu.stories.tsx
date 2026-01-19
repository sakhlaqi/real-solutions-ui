import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenu } from './DropdownMenu';
import { Button } from './Button';

/**
 * DropdownMenu component for displaying menu options.
 * 
 * ## Features
 * - Trigger-based opening
 * - Icon support
 * - Keyboard shortcuts
 * - Danger actions
 * - Adapts to UI provider
 */
const meta = {
  title: 'Overlay/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic dropdown menu
 */
export const Default: Story = {
  args: {
    trigger: <Button>Open Menu</Button>,
    items: [
      { id: '1', label: 'Profile', onClick: () => alert('Profile clicked') },
      { id: '2', label: 'Settings', onClick: () => alert('Settings clicked') },
      { id: '3', label: 'Logout', onClick: () => alert('Logout clicked') },
    ],
  },
};

/**
 * Dropdown menu with icons
 */
export const WithIcons: Story = {
  args: {
    trigger: <Button variant="outlined">Actions</Button>,
    items: [
      { id: '1', label: 'New File', icon: <span>📄</span>, onClick: () => alert('New File') },
      { id: '2', label: 'New Folder', icon: <span>📁</span>, onClick: () => alert('New Folder') },
      { id: 'div1', divider: true, label: '' },
      { id: '3', label: 'Upload', icon: <span>⬆️</span>, onClick: () => alert('Upload') },
      { id: '4', label: 'Download', icon: <span>⬇️</span>, onClick: () => alert('Download') },
    ],
  },
};

/**
 * User account dropdown
 */
export const UserAccount: Story = {
  args: {
    trigger: (
      <button style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        border: '1px solid #ddd',
        borderRadius: '8px',
        background: 'white',
        cursor: 'pointer'
      }}>
        <span style={{ fontSize: '1.5rem' }}>👤</span>
        <span>John Doe</span>
        <span style={{ fontSize: '0.75rem' }}>▼</span>
      </button>
    ),
    items: [
      { id: '1', label: 'My Profile', icon: <span>👤</span>, onClick: () => alert('Profile') },
      { id: '2', label: 'Account Settings', icon: <span>⚙️</span>, onClick: () => alert('Settings') },
      { id: '3', label: 'Billing', icon: <span>💳</span>, onClick: () => alert('Billing') },
      { id: 'div1', divider: true, label: '' },
      { id: '4', label: 'Help & Support', icon: <span>❓</span>, onClick: () => alert('Help') },
      { id: '5', label: 'Keyboard Shortcuts', icon: <span>⌨️</span>, onClick: () => alert('Shortcuts') },
      { id: 'div2', divider: true, label: '' },
      { id: '6', label: 'Sign Out', icon: <span>🚪</span>, danger: true, onClick: () => alert('Sign Out') },
    ],
  },
};

/**
 * More options menu
 */
export const MoreOptions: Story = {
  args: {
    trigger: (
      <button style={{
        width: '40px',
        height: '40px',
        border: 'none',
        borderRadius: '50%',
        background: '#f5f5f5',
        cursor: 'pointer',
        fontSize: '1.2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        ⋮
      </button>
    ),
    items: [
      { id: '1', label: 'Edit', icon: <span>✏️</span>, onClick: () => alert('Edit') },
      { id: '2', label: 'Duplicate', icon: <span>📑</span>, onClick: () => alert('Duplicate') },
      { id: '3', label: 'Archive', icon: <span>📦</span>, onClick: () => alert('Archive') },
      { id: 'div1', divider: true, label: '' },
      { id: '4', label: 'Share', icon: <span>🔗</span>, onClick: () => alert('Share') },
      { id: '5', label: 'Export', icon: <span>💾</span>, onClick: () => alert('Export') },
      { id: 'div2', divider: true, label: '' },
      { id: '6', label: 'Delete', icon: <span>🗑️</span>, danger: true, onClick: () => alert('Delete') },
    ],
  },
};

/**
 * Dropdown with disabled items
 */
export const WithDisabledItems: Story = {
  args: {
    trigger: <Button>File Options</Button>,
    items: [
      { id: '1', label: 'Open', icon: <span>📂</span>, onClick: () => alert('Open') },
      { id: '2', label: 'Save', icon: <span>💾</span>, disabled: true, onClick: () => {} },
      { id: '3', label: 'Save As...', icon: <span>💾</span>, onClick: () => alert('Save As') },
      { id: 'div1', divider: true, label: '' },
      { id: '4', label: 'Print', icon: <span>🖨️</span>, disabled: true, onClick: () => {} },
      { id: '5', label: 'Export PDF', icon: <span>📄</span>, onClick: () => alert('Export PDF') },
    ],
  },
};

/**
 * Placement at bottom end
 */
export const PlacementBottomEnd: Story = {
  args: {
    trigger: <Button>Align Right ▼</Button>,
    placement: 'bottom-end',
    items: [
      { id: '1', label: 'Option 1', onClick: () => alert('Option 1') },
      { id: '2', label: 'Option 2', onClick: () => alert('Option 2') },
      { id: '3', label: 'Option 3', onClick: () => alert('Option 3') },
    ],
  },
};
