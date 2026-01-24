import type { Meta, StoryObj } from '@storybook/react';
import { Toolbar } from '../../src/adapters/Toolbar';
import { Button } from '../../src/adapters/Button';
import { IconButton } from '../../src/adapters/IconButton';

/**
 * Toolbar component for grouping controls.
 * 
 * ## Features
 * - Regular and dense variants
 * - Flexible content layout
 * - Often used with AppBar
 * - Adapts to UI provider
 */
const meta = {
  title: 'Data Display/Toolbar',
  component: Toolbar,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Toolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic toolbar
 */
export const Default: Story = {
  args: {
    children: (
      <>
        <Button variant="text">File</Button>
        <Button variant="text">Edit</Button>
        <Button variant="text">View</Button>
        <Button variant="text">Help</Button>
      </>
    ),
  },
};

/**
 * Toolbar with title and actions
 */
export const WithTitleAndActions: Story = {
  args: {
    children: (
      <>
        <h2 style={{ flex: 1, margin: 0 }}>My Application</h2>
        <IconButton>
          <span>🔍</span>
        </IconButton>
        <IconButton>
          <span>🔔</span>
        </IconButton>
        <IconButton>
          <span>👤</span>
        </IconButton>
      </>
    ),
  },
};

/**
 * Dense toolbar with less padding
 */
export const Dense: Story = {
  args: {
    variant: 'dense',
    children: (
      <>
        <Button variant="text" size="small">New</Button>
        <Button variant="text" size="small">Open</Button>
        <Button variant="text" size="small">Save</Button>
        <div style={{ flex: 1 }} />
        <Button variant="text" size="small">Settings</Button>
      </>
    ),
  },
};

/**
 * Editor toolbar
 */
export const EditorToolbar: Story = {
  render: () => (
    <div style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
      <Toolbar style={{ borderBottom: '1px solid #ddd', backgroundColor: '#f5f5f5' }}>
        <button style={{ padding: '6px 12px', border: '1px solid #ccc', background: 'white', borderRadius: '4px', marginRight: '4px' }}>
          <strong>B</strong>
        </button>
        <button style={{ padding: '6px 12px', border: '1px solid #ccc', background: 'white', borderRadius: '4px', marginRight: '4px' }}>
          <em>I</em>
        </button>
        <button style={{ padding: '6px 12px', border: '1px solid #ccc', background: 'white', borderRadius: '4px', marginRight: '4px' }}>
          <u>U</u>
        </button>
        <div style={{ width: '1px', height: '24px', background: '#ddd', margin: '0 8px' }} />
        <button style={{ padding: '6px 12px', border: '1px solid #ccc', background: 'white', borderRadius: '4px', marginRight: '4px' }}>
          🔗
        </button>
        <button style={{ padding: '6px 12px', border: '1px solid #ccc', background: 'white', borderRadius: '4px', marginRight: '4px' }}>
          📷
        </button>
        <div style={{ flex: 1 }} />
        <button style={{ padding: '6px 12px', border: '1px solid #ccc', background: 'white', borderRadius: '4px' }}>
          💾 Save
        </button>
      </Toolbar>
      <div style={{ padding: '1rem', minHeight: '200px' }}>
        <p>Start typing your content here...</p>
      </div>
    </div>
  ),
  args: {},
};

/**
 * App bar with toolbar
 */
export const InAppBar: Story = {
  render: () => (
    <div style={{ border: '1px solid #1976d2', borderRadius: '8px', overflow: 'hidden' }}>
      <div style={{ backgroundColor: '#1976d2', color: 'white' }}>
        <Toolbar>
          <button style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer', marginRight: '1rem' }}>
            ☰
          </button>
          <h2 style={{ flex: 1, margin: 0 }}>Dashboard</h2>
          <IconButton style={{ color: 'white' }}>
            <span>🔔</span>
          </IconButton>
          <IconButton style={{ color: 'white' }}>
            <span>⚙️</span>
          </IconButton>
        </Toolbar>
      </div>
      <div style={{ padding: '2rem', backgroundColor: 'white' }}>
        <p>Page content goes here</p>
      </div>
    </div>
  ),
  args: {},
};
