import type { Meta, StoryObj } from '@storybook/react';
import { List } from './List';
import { ListItem, ListItemText, ListItemIcon } from '@mui/material';

/**
 * List component for displaying collections of items.
 * 
 * ## Features
 * - Dense and regular variants
 * - With icons and secondary text
 * - Click handlers
 * - Adapts to UI provider
 */
const meta = {
  title: 'Data Display/List',
  component: List,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic list
 */
export const Default: Story = {
  render: (args) => (
    <List {...args}>
      <ListItem>First Item</ListItem>
      <ListItem>Second Item</ListItem>
      <ListItem>Third Item</ListItem>
      <ListItem>Fourth Item</ListItem>
    </List>
  ),
  args: {},
};

/**
 * Dense list with less padding
 */
export const Dense: Story = {
  render: (args) => (
    <List {...args} dense>
      <ListItem>Item 1</ListItem>
      <ListItem>Item 2</ListItem>
      <ListItem>Item 3</ListItem>
      <ListItem>Item 4</ListItem>
      <ListItem>Item 5</ListItem>
    </List>
  ),
  args: {
    dense: true,
  },
};

/**
 * List with icons
 */
export const WithIcons: Story = {
  render: (args) => (
    <div style={{ maxWidth: '400px' }}>
      <List {...args}>
        <ListItem>
          <span style={{ marginRight: '1rem' }}>🏠</span>
          Home
        </ListItem>
        <ListItem>
          <span style={{ marginRight: '1rem' }}>⚙️</span>
          Settings
        </ListItem>
        <ListItem>
          <span style={{ marginRight: '1rem' }}>👤</span>
          Profile
        </ListItem>
        <ListItem>
          <span style={{ marginRight: '1rem' }}>📧</span>
          Messages
        </ListItem>
      </List>
    </div>
  ),
  args: {},
};

/**
 * Interactive list with click handlers
 */
export const Interactive: Story = {
  render: (args) => (
    <div style={{ maxWidth: '400px' }}>
      <List {...args}>
        <ListItem 
          style={{ cursor: 'pointer', padding: '12px 16px' }}
          onClick={() => alert('Inbox clicked')}
        >
          <span style={{ marginRight: '1rem' }}>📥</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 'bold' }}>Inbox</div>
            <div style={{ fontSize: '0.875rem', color: '#666' }}>5 new messages</div>
          </div>
        </ListItem>
        <ListItem 
          style={{ cursor: 'pointer', padding: '12px 16px' }}
          onClick={() => alert('Starred clicked')}
        >
          <span style={{ marginRight: '1rem' }}>⭐</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 'bold' }}>Starred</div>
            <div style={{ fontSize: '0.875rem', color: '#666' }}>12 items</div>
          </div>
        </ListItem>
        <ListItem 
          style={{ cursor: 'pointer', padding: '12px 16px' }}
          onClick={() => alert('Drafts clicked')}
        >
          <span style={{ marginRight: '1rem' }}>📝</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 'bold' }}>Drafts</div>
            <div style={{ fontSize: '0.875rem', color: '#666' }}>3 drafts</div>
          </div>
        </ListItem>
      </List>
    </div>
  ),
  args: {},
};

/**
 * Contacts list
 */
export const Contacts: Story = {
  render: (args) => (
    <div style={{ maxWidth: '500px' }}>
      <List {...args}>
        <ListItem style={{ padding: '16px', borderBottom: '1px solid #eee' }}>
          <div style={{ marginRight: '1rem', fontSize: '2rem' }}>👤</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 'bold' }}>Alice Johnson</div>
            <div style={{ fontSize: '0.875rem', color: '#666' }}>alice@example.com</div>
          </div>
        </ListItem>
        <ListItem style={{ padding: '16px', borderBottom: '1px solid #eee' }}>
          <div style={{ marginRight: '1rem', fontSize: '2rem' }}>👤</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 'bold' }}>Bob Smith</div>
            <div style={{ fontSize: '0.875rem', color: '#666' }}>bob@example.com</div>
          </div>
        </ListItem>
        <ListItem style={{ padding: '16px', borderBottom: '1px solid #eee' }}>
          <div style={{ marginRight: '1rem', fontSize: '2rem' }}>👤</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 'bold' }}>Carol White</div>
            <div style={{ fontSize: '0.875rem', color: '#666' }}>carol@example.com</div>
          </div>
        </ListItem>
      </List>
    </div>
  ),
  args: {},
};
