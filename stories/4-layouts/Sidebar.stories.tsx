import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Sidebar } from '../../src/adapters/Sidebar';
import { Box, List, ListItem, ListItemText, Button } from '@mui/material';

const meta: Meta<typeof Sidebar> = {
  title: 'Adapters/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

const SidebarContent = () => (
  <List>
    <ListItem button>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button>
      <ListItemText primary="Users" />
    </ListItem>
    <ListItem button>
      <ListItemText primary="Settings" />
    </ListItem>
    <ListItem button>
      <ListItemText primary="Reports" />
    </ListItem>
  </List>
);

export const Left: Story = {
  render: (args) => (
    <Box sx={{ display: 'flex', height: '400px' }}>
      <Sidebar {...args}>
        <SidebarContent />
      </Sidebar>
      <Box sx={{ flexGrow: 1, p: 3, bgcolor: 'background.default' }}>
        <h2>Main Content</h2>
        <p>This is the main content area.</p>
      </Box>
    </Box>
  ),
  args: {
    position: 'left',
    width: 250,
  },
};

export const Right: Story = {
  render: (args) => (
    <Box sx={{ display: 'flex', height: '400px' }}>
      <Box sx={{ flexGrow: 1, p: 3, bgcolor: 'background.default' }}>
        <h2>Main Content</h2>
        <p>This is the main content area.</p>
      </Box>
      <Sidebar {...args}>
        <SidebarContent />
      </Sidebar>
    </Box>
  ),
  args: {
    position: 'right',
    width: 250,
  },
};

export const Collapsible: Story = {
  render: (args) => {
    const [collapsed, setCollapsed] = useState(false);
    
    return (
      <Box sx={{ display: 'flex', height: '400px' }}>
        <Sidebar {...args} collapsed={collapsed}>
          <SidebarContent />
        </Sidebar>
        <Box sx={{ flexGrow: 1, p: 3, bgcolor: 'background.default' }}>
          <h2>Main Content</h2>
          <Button onClick={() => setCollapsed(!collapsed)} variant="contained">
            {collapsed ? 'Expand' : 'Collapse'} Sidebar
          </Button>
          <p>Click the button to toggle the sidebar.</p>
        </Box>
      </Box>
    );
  },
  args: {
    position: 'left',
    width: 250,
    collapsible: true,
  },
};

export const CustomWidth: Story = {
  render: (args) => (
    <Box sx={{ display: 'flex', height: '400px' }}>
      <Sidebar {...args}>
        <SidebarContent />
      </Sidebar>
      <Box sx={{ flexGrow: 1, p: 3, bgcolor: 'background.default' }}>
        <h2>Main Content</h2>
        <p>This sidebar has a custom width of 350px.</p>
      </Box>
    </Box>
  ),
  args: {
    position: 'left',
    width: 350,
  },
};
