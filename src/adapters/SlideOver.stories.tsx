import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SlideOver } from './SlideOver';
import { Button } from './Button';

/**
 * SlideOver component slides in from the side of the screen.
 * 
 * **Now using MUI Drawer implementation** for better accessibility and performance.
 * 
 * ## Features
 * - Slides from left or right
 * - Overlay with backdrop
 * - Click outside to close
 * - Keyboard navigation support
 * - Customizable width
 */
const meta = {
  title: 'Overlay/SlideOver',
  component: SlideOver,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    position: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
      description: 'Position from which the panel slides',
    },
  },
} satisfies Meta<typeof SlideOver>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Slide from right (default)
 */
export const FromRight: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <div style={{ padding: '24px' }}>
        <Button onClick={() => setOpen(true)} variant="contained">
          Open Panel (Right)
        </Button>
        <SlideOver open={open} onClose={() => setOpen(false)} position="right">
          <div style={{ padding: '24px', width: '400px' }}>
            <h2 style={{ margin: '0 0 16px 0' }}>Slide Over Panel</h2>
            <p style={{ margin: '0 0 16px 0', color: '#666' }}>
              This panel slides in from the right side of the screen.
            </p>
            <Button variant="contained" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
        </SlideOver>
      </div>
    );
  },
};

/**
 * Slide from left
 */
export const FromLeft: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <div style={{ padding: '24px' }}>
        <Button onClick={() => setOpen(true)} variant="contained">
          Open Panel (Left)
        </Button>
        <SlideOver open={open} onClose={() => setOpen(false)} position="left">
          <div style={{ padding: '24px', width: '300px' }}>
            <h2 style={{ margin: '0 0 16px 0' }}>Navigation</h2>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href="#" style={{ padding: '8px', textDecoration: 'none', color: '#1976d2' }}>Home</a>
              <a href="#" style={{ padding: '8px', textDecoration: 'none', color: '#1976d2' }}>About</a>
              <a href="#" style={{ padding: '8px', textDecoration: 'none', color: '#1976d2' }}>Services</a>
              <a href="#" style={{ padding: '8px', textDecoration: 'none', color: '#1976d2' }}>Contact</a>
            </nav>
          </div>
        </SlideOver>
      </div>
    );
  },
};

/**
 * Panel with form
 */
export const WithForm: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <div style={{ padding: '24px' }}>
        <Button onClick={() => setOpen(true)} variant="contained">
          Edit Profile
        </Button>
        <SlideOver open={open} onClose={() => setOpen(false)} position="right">
          <div style={{ padding: '24px', width: '400px' }}>
            <h2 style={{ margin: '0 0 24px 0' }}>Edit Profile</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>
                  Full Name
                </label>
                <input 
                  type="text" 
                  defaultValue="John Doe"
                  style={{ 
                    width: '100%', 
                    padding: '10px', 
                    borderRadius: '4px', 
                    border: '1px solid #ddd',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>
                  Email
                </label>
                <input 
                  type="email" 
                  defaultValue="john@example.com"
                  style={{ 
                    width: '100%', 
                    padding: '10px', 
                    borderRadius: '4px', 
                    border: '1px solid #ddd',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>
                  Bio
                </label>
                <textarea 
                  defaultValue="Software developer and tech enthusiast."
                  style={{ 
                    width: '100%', 
                    padding: '10px', 
                    borderRadius: '4px', 
                    border: '1px solid #ddd',
                    minHeight: '100px',
                    fontSize: '14px',
                    fontFamily: 'inherit'
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <Button variant="outlined" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button variant="contained" onClick={() => { alert('Saved!'); setOpen(false); }}>
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </SlideOver>
      </div>
    );
  },
};

/**
 * Panel with details
 */
export const WithDetails: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <div style={{ padding: '24px' }}>
        <Button onClick={() => setOpen(true)} variant="contained">
          View Details
        </Button>
        <SlideOver open={open} onClose={() => setOpen(false)} position="right">
          <div style={{ padding: '24px', width: '500px' }}>
            <h2 style={{ margin: '0 0 8px 0' }}>Product Details</h2>
            <p style={{ margin: '0 0 24px 0', color: '#666', fontSize: '14px' }}>
              SKU: PRD-12345
            </p>
            
            <div style={{ marginBottom: '24px' }}>
              <img 
                src="https://via.placeholder.com/450x300" 
                alt="Product"
                style={{ width: '100%', borderRadius: '8px' }}
              />
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '20px' }}>Premium Wireless Headphones</h3>
              <p style={{ margin: '0 0 16px 0', fontSize: '24px', fontWeight: 'bold', color: '#1976d2' }}>
                $299.99
              </p>
            </div>
            
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 600 }}>Description</h4>
              <p style={{ margin: 0, color: '#666', fontSize: '14px', lineHeight: '1.6' }}>
                Experience premium sound quality with active noise cancellation. 
                These wireless headphones offer 30-hour battery life and supreme comfort.
              </p>
            </div>
            
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 600 }}>Features</h4>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#666', fontSize: '14px' }}>
                <li>Active Noise Cancellation</li>
                <li>30-hour battery life</li>
                <li>Bluetooth 5.0</li>
                <li>Comfortable over-ear design</li>
              </ul>
            </div>
            
            <Button variant="contained" fullWidth>
              Add to Cart
            </Button>
          </div>
        </SlideOver>
      </div>
    );
  },
};

/**
 * Wide panel
 */
export const WidePanel: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <div style={{ padding: '24px' }}>
        <Button onClick={() => setOpen(true)} variant="contained">
          Open Wide Panel
        </Button>
        <SlideOver open={open} onClose={() => setOpen(false)} position="right">
          <div style={{ padding: '24px', width: '600px' }}>
            <h2 style={{ margin: '0 0 24px 0' }}>Analytics Dashboard</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ padding: '16px', background: '#e3f2fd', borderRadius: '8px' }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>Total Users</h3>
                <p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold', color: '#1976d2' }}>12,345</p>
              </div>
              <div style={{ padding: '16px', background: '#e8f5e9', borderRadius: '8px' }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>Revenue</h3>
                <p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold', color: '#2e7d32' }}>$45,678</p>
              </div>
              <div style={{ padding: '16px', background: '#fff3e0', borderRadius: '8px' }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>Active Sessions</h3>
                <p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold', color: '#ed6c02' }}>1,234</p>
              </div>
              <div style={{ padding: '16px', background: '#f3e5f5', borderRadius: '8px' }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>Conversion Rate</h3>
                <p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold', color: '#9c27b0' }}>3.2%</p>
              </div>
            </div>
          </div>
        </SlideOver>
      </div>
    );
  },
};
