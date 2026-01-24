import type { Meta, StoryObj } from '@storybook/react';
import { ContextMenu } from '../../src/adapters/ContextMenu';

/**
 * ContextMenu component appears on right-click.
 * 
 * **Now using MUI Menu implementation** for better positioning and accessibility.
 * 
 * ## Features
 * - Right-click activated
 * - Icon support
 * - Keyboard shortcuts display
 * - Disabled states
 * - Proper focus management
 */
const meta = {
  title: 'Overlay/ContextMenu',
  component: ContextMenu,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic context menu
 */
export const Default: Story = {
  args: {
    items: [
      { id: '1', label: 'Open', onClick: () => alert('Open clicked') },
      { id: '2', label: 'Edit', onClick: () => alert('Edit clicked') },
      { id: '3', label: 'Delete', danger: true, onClick: () => alert('Delete clicked') },
    ],
    children: (
      <div style={{ 
        padding: '2rem 4rem', 
        border: '2px dashed #ccc', 
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <strong>Right-click me!</strong>
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#666' }}>
          Try right-clicking this area
        </p>
      </div>
    ),
  },
};

/**
 * Context menu with icons and shortcuts
 */
export const WithIconsAndShortcuts: Story = {
  args: {
    items: [
      { 
        id: '1', 
        label: 'Cut', 
        icon: <span>✂️</span>, 
        shortcut: '⌘X',
        onClick: () => alert('Cut') 
      },
      { 
        id: '2', 
        label: 'Copy', 
        icon: <span>📋</span>, 
        shortcut: '⌘C',
        onClick: () => alert('Copy') 
      },
      { 
        id: '3', 
        label: 'Paste', 
        icon: <span>📄</span>, 
        shortcut: '⌘V',
        onClick: () => alert('Paste') 
      },
      { id: 'div1', divider: true, label: '' },
      { 
        id: '4', 
        label: 'Select All', 
        shortcut: '⌘A',
        onClick: () => alert('Select All') 
      },
    ],
    children: (
      <div style={{ 
        padding: '3rem', 
        border: '2px solid #1976d2', 
        borderRadius: '8px',
        backgroundColor: '#f5f5f5',
        textAlign: 'center'
      }}>
        <h3>Document Area</h3>
        <p>Right-click to see editing options</p>
      </div>
    ),
  },
};

/**
 * File browser context menu
 */
export const FileBrowser: Story = {
  args: {
    items: [
      { id: '1', label: 'Open', icon: <span>📂</span>, onClick: () => alert('Open') },
      { id: '2', label: 'Open in New Tab', icon: <span>🗔</span>, onClick: () => alert('Open in new tab') },
      { id: 'div1', divider: true, label: '' },
      { id: '3', label: 'Rename', icon: <span>✏️</span>, onClick: () => alert('Rename') },
      { id: '4', label: 'Duplicate', icon: <span>📑</span>, onClick: () => alert('Duplicate') },
      { id: '5', label: 'Move to...', icon: <span>➡️</span>, onClick: () => alert('Move') },
      { id: 'div2', divider: true, label: '' },
      { id: '6', label: 'Share', icon: <span>🔗</span>, onClick: () => alert('Share') },
      { id: '7', label: 'Download', icon: <span>⬇️</span>, onClick: () => alert('Download') },
      { id: 'div3', divider: true, label: '' },
      { id: '8', label: 'Delete', icon: <span>🗑️</span>, danger: true, onClick: () => alert('Delete') },
    ],
    children: (
      <div style={{ 
        padding: '2rem', 
        border: '1px solid #ddd', 
        borderRadius: '8px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <span style={{ fontSize: '2rem' }}>📄</span>
        <div>
          <div style={{ fontWeight: 'bold' }}>document.pdf</div>
          <div style={{ fontSize: '0.75rem', color: '#666' }}>2.4 MB</div>
        </div>
      </div>
    ),
  },
};

/**
 * Context menu with some disabled items
 */
export const WithDisabled: Story = {
  args: {
    items: [
      { id: '1', label: 'Undo', icon: <span>↩️</span>, disabled: true, shortcut: '⌘Z', onClick: () => {} },
      { id: '2', label: 'Redo', icon: <span>↪️</span>, disabled: true, shortcut: '⌘⇧Z', onClick: () => {} },
      { id: 'div1', divider: true, label: '' },
      { id: '3', label: 'Cut', icon: <span>✂️</span>, shortcut: '⌘X', onClick: () => alert('Cut') },
      { id: '4', label: 'Copy', icon: <span>📋</span>, shortcut: '⌘C', onClick: () => alert('Copy') },
      { id: '5', label: 'Paste', icon: <span>📄</span>, disabled: true, shortcut: '⌘V', onClick: () => {} },
    ],
    children: (
      <div style={{ 
        padding: '2rem', 
        border: '2px dashed #999', 
        borderRadius: '8px',
        textAlign: 'center',
        minWidth: '200px'
      }}>
        <p>Right-click here</p>
        <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.5rem' }}>
          Some options are disabled
        </p>
      </div>
    ),
  },
};
