import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { BottomNavigation } from '../../src/adapters/BottomNavigation';

/**
 * BottomNavigation component for mobile app-style navigation.
 * 
 * ## Features
 * - Fixed bottom position
 * - Icon and label support
 * - Active state indication
 * - Adapts to UI provider
 */
const meta = {
  title: 'Navigation/BottomNavigation',
  component: BottomNavigation,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof BottomNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic bottom navigation with 3 items
 */
export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('home');
    
    return (
      <div style={{ height: '300px', position: 'relative', border: '1px solid #ddd' }}>
        <div style={{ padding: '1rem' }}>
          <h3>Content Area</h3>
          <p>Current tab: <strong>{value}</strong></p>
          <p>Scroll down to see the bottom navigation</p>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <BottomNavigation
            {...args}
            value={value}
            onChange={setValue}
            actions={[
              { label: 'Home', value: 'home', icon: <span>🏠</span> },
              { label: 'Search', value: 'search', icon: <span>🔍</span> },
              { label: 'Profile', value: 'profile', icon: <span>👤</span> },
            ]}
          />
        </div>
      </div>
    );
  },
  args: {
    value: 'home',
    onChange: () => {},
    actions: [],
  },
};

/**
 * Bottom navigation with labels always shown
 */
export const WithLabels: Story = {
  render: (args) => {
    const [value, setValue] = useState('favorites');
    
    return (
      <div style={{ height: '300px', position: 'relative', border: '1px solid #ddd' }}>
        <div style={{ padding: '1rem' }}>
          <h3>Shopping App</h3>
          <p>Active: <strong>{value}</strong></p>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <BottomNavigation
            {...args}
            value={value}
            onChange={setValue}
            showLabels={true}
            actions={[
              { label: 'Shop', value: 'shop', icon: <span>🛍️</span> },
              { label: 'Favorites', value: 'favorites', icon: <span>❤️</span> },
              { label: 'Cart', value: 'cart', icon: <span>🛒</span> },
              { label: 'Account', value: 'account', icon: <span>👤</span> },
            ]}
          />
        </div>
      </div>
    );
  },
  args: {
    value: 'favorites',
    onChange: () => {},
    actions: [],
    showLabels: true,
  },
};

/**
 * Bottom navigation with 5 items
 */
export const ManyItems: Story = {
  render: (args) => {
    const [value, setValue] = useState('explore');
    
    return (
      <div style={{ height: '300px', position: 'relative', border: '1px solid #ddd' }}>
        <div style={{ padding: '1rem' }}>
          <h3>Social Media App</h3>
          <p>Current: <strong>{value}</strong></p>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <BottomNavigation
            {...args}
            value={value}
            onChange={setValue}
            showLabels={true}
            actions={[
              { label: 'Home', value: 'home', icon: <span>🏠</span> },
              { label: 'Explore', value: 'explore', icon: <span>🌍</span> },
              { label: 'Post', value: 'post', icon: <span>➕</span> },
              { label: 'Notifications', value: 'notifications', icon: <span>🔔</span> },
              { label: 'Profile', value: 'profile', icon: <span>👤</span> },
            ]}
          />
        </div>
      </div>
    );
  },
  args: {
    value: 'explore',
    onChange: () => {},
    actions: [],
    showLabels: true,
  },
};
