import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Toggle } from './Toggle';

/**
 * Toggle component for binary on/off states.
 * 
 * ## Features
 * - Simple on/off toggling
 * - Optional label
 * - Disabled state
 * - Adapts to current UI provider
 */
const meta = {
  title: 'Forms/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the toggle',
    },
    checked: {
      control: 'boolean',
      description: 'Whether the toggle is checked',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the toggle is disabled',
    },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default toggle
 */
export const Default: Story = {
  args: {
    label: 'Enable notifications',
  },
};

/**
 * Checked toggle
 */
export const Checked: Story = {
  args: {
    label: 'Enabled',
    checked: true,
  },
};

/**
 * Disabled toggle
 */
export const Disabled: Story = {
  args: {
    label: 'Disabled option',
    disabled: true,
  },
};

/**
 * Disabled and checked
 */
export const DisabledChecked: Story = {
  args: {
    label: 'Disabled (checked)',
    checked: true,
    disabled: true,
  },
};

/**
 * Interactive toggle
 */
export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Toggle
          label="Enable dark mode"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <div style={{ padding: '16px', background: '#f5f5f5', borderRadius: '4px' }}>
          Status: {checked ? 'ON' : 'OFF'}
        </div>
      </div>
    );
  },
};

/**
 * Multiple toggles
 */
export const MultipleToggles: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      notifications: true,
      darkMode: false,
      autoSave: true,
      sounds: false,
    });
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Toggle
          label="Enable notifications"
          checked={settings.notifications}
          onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
        />
        <Toggle
          label="Dark mode"
          checked={settings.darkMode}
          onChange={(e) => setSettings({ ...settings, darkMode: e.target.checked })}
        />
        <Toggle
          label="Auto-save"
          checked={settings.autoSave}
          onChange={(e) => setSettings({ ...settings, autoSave: e.target.checked })}
        />
        <Toggle
          label="Sound effects"
          checked={settings.sounds}
          onChange={(e) => setSettings({ ...settings, sounds: e.target.checked })}
        />
      </div>
    );
  },
};
