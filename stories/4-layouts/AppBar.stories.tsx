import type { Meta, StoryObj } from '@storybook/react';
import { AppBar } from '../../src/adapters/AppBar';
import { Button } from '../../src/adapters/Button';

/**
 * AppBar component for application navigation and branding.
 * 
 * ## Features
 * - Fixed, sticky, or static positioning
 * - Color variants
 * - Elevation control
 * - Adapts to UI provider
 */
const meta = {
  title: 'Navigation/AppBar',
  component: AppBar,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    position: {
      control: 'select',
      options: ['fixed', 'absolute', 'sticky', 'static', 'relative'],
      description: 'Positioning of the app bar',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'transparent'],
      description: 'Color variant',
    },
    elevation: {
      control: 'number',
      description: 'Shadow elevation',
    },
  },
} satisfies Meta<typeof AppBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default app bar
 */
export const Default: Story = {
  args: {
    position: 'static',
    color: 'primary',
    children: (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: '16px 24px',
        color: 'white'
      }}>
        <h2 style={{ margin: 0, fontSize: '20px' }}>My Application</h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="text" style={{ color: 'white' }}>Home</Button>
          <Button variant="text" style={{ color: 'white' }}>About</Button>
          <Button variant="text" style={{ color: 'white' }}>Contact</Button>
        </div>
      </div>
    ),
  },
};

/**
 * Fixed app bar
 */
export const Fixed: Story = {
  args: {
    position: 'fixed',
    color: 'primary',
    children: (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: '16px 24px',
        color: 'white'
      }}>
        <h2 style={{ margin: 0, fontSize: '20px' }}>Fixed Header</h2>
        <Button variant="contained" size="small">Login</Button>
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
        <div style={{ padding: '80px 24px 24px' }}>
          <p>Scroll down to see the fixed app bar in action.</p>
          {Array.from({ length: 20 }, (_, i) => (
            <p key={i}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          ))}
        </div>
      </div>
    ),
  ],
};

/**
 * With search
 */
export const WithSearch: Story = {
  args: {
    position: 'static',
    color: 'primary',
    children: (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '24px',
        padding: '12px 24px',
        color: 'white'
      }}>
        <h2 style={{ margin: 0, fontSize: '20px', minWidth: '120px' }}>MyApp</h2>
        <input 
          type="search"
          placeholder="Search..."
          style={{
            flex: 1,
            padding: '8px 16px',
            borderRadius: '24px',
            border: 'none',
            fontSize: '14px',
            maxWidth: '400px',
          }}
        />
        <Button variant="text" style={{ color: 'white' }}>Profile</Button>
      </div>
    ),
  },
};

/**
 * Transparent overlay
 */
export const Transparent: Story = {
  args: {
    position: 'absolute',
    color: 'transparent',
    children: (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: '16px 24px',
        color: 'white',
        textShadow: '0 2px 4px rgba(0,0,0,0.5)'
      }}>
        <h2 style={{ margin: 0, fontSize: '20px' }}>Brand</h2>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Button variant="text" style={{ color: 'white' }}>Features</Button>
          <Button variant="text" style={{ color: 'white' }}>Pricing</Button>
          <Button variant="contained" size="small">Sign Up</Button>
        </div>
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ 
        position: 'relative',
        minHeight: '400px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '80px 24px'
      }}>
        <Story />
        <div style={{ color: 'white', textAlign: 'center', marginTop: '60px' }}>
          <h1 style={{ fontSize: '48px', margin: '0 0 16px 0' }}>Welcome</h1>
          <p style={{ fontSize: '20px', opacity: 0.9 }}>Transparent app bar over hero section</p>
        </div>
      </div>
    ),
  ],
};

/**
 * With icons and actions
 */
export const WithIcons: Story = {
  args: {
    position: 'static',
    color: 'primary',
    elevation: 4,
    children: (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: '12px 24px',
        color: 'white'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button style={{ 
            background: 'none', 
            border: 'none', 
            color: 'white',
            fontSize: '24px',
            cursor: 'pointer',
            padding: '4px'
          }}>
            ☰
          </button>
          <h2 style={{ margin: 0, fontSize: '20px' }}>Dashboard</h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button style={{ 
            background: 'none', 
            border: 'none', 
            color: 'white',
            fontSize: '20px',
            cursor: 'pointer',
            padding: '8px'
          }}>
            🔔
          </button>
          <button style={{ 
            background: 'none', 
            border: 'none', 
            color: 'white',
            fontSize: '20px',
            cursor: 'pointer',
            padding: '8px'
          }}>
            ⚙️
          </button>
          <button style={{ 
            background: 'none', 
            border: 'none', 
            color: 'white',
            fontSize: '20px',
            cursor: 'pointer',
            padding: '8px'
          }}>
            👤
          </button>
        </div>
      </div>
    ),
  },
};
