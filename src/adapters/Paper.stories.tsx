import type { Meta, StoryObj } from '@storybook/react';
import { Paper } from './Paper';

/**
 * Paper component provides a surface with elevation and optional borders.
 * 
 * **Now using MUI Paper implementation** for consistent Material Design elevation system.
 */
const meta: Meta<typeof Paper> = {
  title: 'Layout/Paper',
  component: Paper,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof Paper>;

export const Default: Story = {
  args: {
    children: <div style={{ padding: '1rem' }}>Paper with default elevation</div>,
  },
};

export const Elevations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {[0, 1, 2, 3, 4, 6, 8, 12, 16, 24].map((elevation) => (
        <Paper key={elevation} elevation={elevation}>
          <div style={{ padding: '1rem' }}>Elevation: {elevation}</div>
        </Paper>
      ))}
    </div>
  ),
};

export const WithPadding: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Paper sx={{ padding: 1 }}>
        <div>Padding: 8px (1 unit)</div>
      </Paper>
      <Paper sx={{ padding: 2 }}>
        <div>Padding: 16px (2 units)</div>
      </Paper>
      <Paper sx={{ padding: 3 }}>
        <div>Padding: 24px (3 units)</div>
      </Paper>
      <Paper sx={{ padding: 4 }}>
        <div>Padding: 32px (4 units)</div>
      </Paper>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Paper variant="elevation" elevation={2}>
        <div style={{ padding: '1rem' }}>Elevation variant (default)</div>
      </Paper>
      <Paper variant="outlined">
        <div style={{ padding: '1rem' }}>Outlined variant</div>
      </Paper>
    </div>
  ),
};

export const Card: Story = {
  render: () => (
    <Paper elevation={3} style={{ maxWidth: 350 }}>
      <div style={{ padding: '1.5rem' }}>
        <h3 style={{ margin: '0 0 0.5rem 0' }}>Card Title</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#666' }}>
          This is a card-like component using Paper with elevation and padding.
        </p>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button style={{ padding: '0.5rem 1rem', border: 'none', background: '#1976d2', color: 'white', borderRadius: '4px', cursor: 'pointer' }}>
            Action
          </button>
          <button style={{ padding: '0.5rem 1rem', border: '1px solid #1976d2', background: 'transparent', color: '#1976d2', borderRadius: '4px', cursor: 'pointer' }}>
            Cancel
          </button>
        </div>
      </div>
    </Paper>
  ),
};

export const ImageCard: Story = {
  render: () => (
    <Paper elevation={4} style={{ maxWidth: 300, overflow: 'hidden' }}>
      <div style={{ height: 200, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }} />
      <div style={{ padding: '1rem' }}>
        <h3 style={{ margin: '0 0 0.5rem 0' }}>Beautiful Gradient</h3>
        <p style={{ margin: '0', fontSize: '0.875rem', color: '#666' }}>
          A nice gradient background with content below.
        </p>
      </div>
    </Paper>
  ),
};

export const ProfileCard: Story = {
  render: () => (
    <Paper elevation={3} style={{ maxWidth: 280 }}>
      <div style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: '#e0e0e0',
            margin: '0 auto 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
          }}
        >
          👤
        </div>
        <h3 style={{ margin: '0 0 0.25rem 0' }}>John Doe</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#666', fontSize: '0.875rem' }}>Software Engineer</p>
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
          <button style={{ padding: '0.5rem 1.5rem', border: 'none', background: '#1976d2', color: 'white', borderRadius: '4px', cursor: 'pointer' }}>
            Follow
          </button>
          <button style={{ padding: '0.5rem 1.5rem', border: '1px solid #ccc', background: 'transparent', borderRadius: '4px', cursor: 'pointer' }}>
            Message
          </button>
        </div>
      </div>
    </Paper>
  ),
};

export const Dashboard: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
      <Paper elevation={2} padding={16}>
        <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>Total Users</div>
        <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>1,234</div>
        <div style={{ fontSize: '0.75rem', color: '#4caf50' }}>+12.5%</div>
      </Paper>
      <Paper elevation={2} padding={16}>
        <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>Revenue</div>
        <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>$45.2K</div>
        <div style={{ fontSize: '0.75rem', color: '#4caf50' }}>+8.3%</div>
      </Paper>
      <Paper elevation={2} padding={16}>
        <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>Orders</div>
        <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>567</div>
        <div style={{ fontSize: '0.75rem', color: '#f44336' }}>-3.1%</div>
      </Paper>
      <Paper elevation={2} padding={16}>
        <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>Conversion</div>
        <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>3.2%</div>
        <div style={{ fontSize: '0.75rem', color: '#4caf50' }}>+0.4%</div>
      </Paper>
    </div>
  ),
};

export const ListGroup: Story = {
  render: () => (
    <Paper elevation={2} style={{ maxWidth: 400 }}>
      {['Inbox', 'Starred', 'Sent Mail', 'Drafts', 'Trash'].map((item, index) => (
        <div
          key={item}
          style={{
            padding: '1rem 1.5rem',
            borderBottom: index < 4 ? '1px solid #e0e0e0' : 'none',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#f5f5f5')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          {item}
        </div>
      ))}
    </Paper>
  ),
};

export const NestedPapers: Story = {
  render: () => (
    <Paper elevation={4} padding={24} style={{ maxWidth: 500 }}>
      <h3 style={{ margin: '0 0 1rem 0' }}>Parent Paper</h3>
      <Paper elevation={1} padding={16} style={{ marginBottom: '1rem' }}>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Nested Paper 1</h4>
        <p style={{ margin: 0, fontSize: '0.875rem' }}>This is content inside a nested paper.</p>
      </Paper>
      <Paper elevation={1} padding={16}>
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Nested Paper 2</h4>
        <p style={{ margin: 0, fontSize: '0.875rem' }}>Another nested paper with different content.</p>
      </Paper>
    </Paper>
  ),
};
