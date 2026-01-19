import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from '../adapters/Tabs';
import { useState } from 'react';

/**
 * Tabs component that adapts to the selected UI provider.
 * 
 * ## Supported Providers
 * - **internal**: Custom in-house implementation
 * - **mui**: Material-UI Tabs
 */
const meta = {
  title: 'Navigation/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['standard', 'scrollable', 'fullWidth'],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const basicTabs = [
  { label: 'Tab 1', value: 'tab1', content: <div style={{ padding: '1rem' }}>Content for Tab 1</div> },
  { label: 'Tab 2', value: 'tab2', content: <div style={{ padding: '1rem' }}>Content for Tab 2</div> },
  { label: 'Tab 3', value: 'tab3', content: <div style={{ padding: '1rem' }}>Content for Tab 3</div> },
];

/**
 * Basic tabs with three tabs
 */
export const Default: Story = {
  render: (args) => {
    const [activeTab, setActiveTab] = useState('tab1');
    
    return (
      <div style={{ width: '500px', maxWidth: '100%' }}>
        <Tabs
          {...args}
          tabs={basicTabs}
          value={activeTab}
          onChange={(value) => setActiveTab(String(value))}
        />
      </div>
    );
  },
  args: {
    value: 'tab1',
    onChange: () => {},
    tabs: basicTabs,
  },
};

/**
 * Tabs with second tab initially selected
 */
export const WithDefaultValue: Story = {
  render: (args) => {
    const [activeTab, setActiveTab] = useState('tab2');
    
    return (
      <div style={{ width: '500px', maxWidth: '100%' }}>
        <Tabs
          {...args}
          tabs={basicTabs}
          value={activeTab}
          onChange={(value) => setActiveTab(String(value))}
        />
      </div>
    );
  },
  args: {
    value: 'tab2',
    onChange: () => {},
    tabs: basicTabs,
  },
};

/**
 * Tabs with many items (scrollable)
 */
export const ManyTabs: Story = {
  render: (args) => {
    const [activeTab, setActiveTab] = useState('overview');
    
    const tabs = [
      { label: 'Overview', value: 'overview', content: <div style={{ padding: '1rem' }}>Overview content</div> },
      { label: 'Details', value: 'details', content: <div style={{ padding: '1rem' }}>Details content</div> },
      { label: 'Settings', value: 'settings', content: <div style={{ padding: '1rem' }}>Settings content</div> },
      { label: 'Analytics', value: 'analytics', content: <div style={{ padding: '1rem' }}>Analytics content</div> },
      { label: 'Reports', value: 'reports', content: <div style={{ padding: '1rem' }}>Reports content</div> },
      { label: 'History', value: 'history', content: <div style={{ padding: '1rem' }}>History content</div> },
    ];
    
    return (
      <div style={{ width: '600px', maxWidth: '100%' }}>
        <Tabs
          {...args}
          tabs={tabs}
          value={activeTab}
          onChange={(value) => setActiveTab(String(value))}
        />
      </div>
    );
  },
  args: {
    value: 'overview',
    onChange: () => {},
    tabs: [],
  },
};

/**
 * Tabs with rich HTML content
 */
export const WithRichContent: Story = {
  render: (args) => {
    const [activeTab, setActiveTab] = useState('profile');
    
    const tabs = [
      {
        label: 'Profile',
        value: 'profile',
        content: (
          <div style={{ padding: '1rem' }}>
            <h3>User Profile</h3>
            <p><strong>Name:</strong> John Doe</p>
            <p><strong>Email:</strong> john@example.com</p>
            <p><strong>Role:</strong> Administrator</p>
          </div>
        ),
      },
      {
        label: 'Preferences',
        value: 'preferences',
        content: (
          <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <h3>Preferences</h3>
            <label>
              <input type="checkbox" /> Email notifications
            </label>
            <label>
              <input type="checkbox" /> Push notifications
            </label>
            <label>
              <input type="checkbox" /> SMS notifications
            </label>
          </div>
        ),
      },
      {
        label: 'Security',
        value: 'security',
        content: (
          <div style={{ padding: '1rem' }}>
            <h3>Security Settings</h3>
            <button style={{ padding: '0.5rem 1rem', marginTop: '0.5rem' }}>Change Password</button>
            <button style={{ padding: '0.5rem 1rem', marginTop: '0.5rem', marginLeft: '0.5rem' }}>
              Enable 2FA
            </button>
          </div>
        ),
      },
    ];
    
    return (
      <div style={{ width: '500px', maxWidth: '100%' }}>
        <Tabs
          {...args}
          tabs={tabs}
          value={activeTab}
          onChange={(value) => setActiveTab(String(value))}
        />
      </div>
    );
  },
  args: {
    value: 'profile',
    onChange: () => {},
    tabs: [],
  },
};

/**
 * Interactive example showing tab change indicator
 */
export const Interactive: Story = {
  render: (args) => {
    const [activeTab, setActiveTab] = useState('tab1');
    
    const tabs = [
      { 
        label: 'Tab 1', 
        value: 'tab1', 
        content: <div style={{ padding: '1rem' }}>You are viewing Tab 1</div> 
      },
      { 
        label: 'Tab 2', 
        value: 'tab2', 
        content: <div style={{ padding: '1rem' }}>You are viewing Tab 2</div> 
      },
      { 
        label: 'Tab 3', 
        value: 'tab3', 
        content: <div style={{ padding: '1rem' }}>You are viewing Tab 3</div> 
      },
    ];
    
    return (
      <div style={{ width: '500px', maxWidth: '100%' }}>
        <Tabs
          {...args}
          tabs={tabs}
          value={activeTab}
          onChange={(value) => setActiveTab(String(value))}
        />
        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f5f5f5' }}>
          Current tab: <strong>{activeTab}</strong>
        </div>
      </div>
    );
  },
  args: {
    value: 'tab1',
    onChange: () => {},
    tabs: [],
  },
};
