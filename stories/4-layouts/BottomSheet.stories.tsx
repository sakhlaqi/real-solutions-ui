import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { BottomSheet } from '../../src/adapters/BottomSheet';
import { Button } from '../../src/adapters/Button';

/**
 * BottomSheet component slides up from the bottom of the screen (mobile-first design).
 * 
 * **Now using MUI Drawer implementation** for better mobile support and accessibility.
 * 
 * ## Features
 * - Slides from bottom
 * - Snap points for different heights
 * - Mobile-optimized
 * - Smooth animations
 */
const meta = {
  title: 'Overlay/BottomSheet',
  component: BottomSheet,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof BottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic bottom sheet
 */
export const Basic: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <div style={{ padding: '24px' }}>
        <Button onClick={() => setOpen(true)} variant="contained">
          Open Bottom Sheet
        </Button>
        <BottomSheet open={open} onClose={() => setOpen(false)}>
          <div style={{ padding: '24px' }}>
            <h2 style={{ margin: '0 0 16px 0' }}>Bottom Sheet Title</h2>
            <p style={{ margin: '0 0 16px 0', color: '#666' }}>
              This is a bottom sheet that slides up from the bottom of the screen.
            </p>
            <Button variant="contained" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
        </BottomSheet>
      </div>
    );
  },
};

/**
 * Bottom sheet with actions
 */
export const WithActions: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <div style={{ padding: '24px' }}>
        <Button onClick={() => setOpen(true)} variant="contained">
          Share Options
        </Button>
        <BottomSheet open={open} onClose={() => setOpen(false)}>
          <div style={{ padding: '24px' }}>
            <h3 style={{ margin: '0 0 16px 0' }}>Share this page</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Button 
                variant="outlined" 
                fullWidth
                onClick={() => { alert('Share on Twitter'); setOpen(false); }}
              >
                Share on Twitter
              </Button>
              <Button 
                variant="outlined" 
                fullWidth
                onClick={() => { alert('Share on Facebook'); setOpen(false); }}
              >
                Share on Facebook
              </Button>
              <Button 
                variant="outlined" 
                fullWidth
                onClick={() => { alert('Copy link'); setOpen(false); }}
              >
                Copy Link
              </Button>
              <Button 
                variant="outlined" 
                fullWidth
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </BottomSheet>
      </div>
    );
  },
};

/**
 * Bottom sheet with form
 */
export const WithForm: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <div style={{ padding: '24px' }}>
        <Button onClick={() => setOpen(true)} variant="contained">
          Add Comment
        </Button>
        <BottomSheet open={open} onClose={() => setOpen(false)}>
          <div style={{ padding: '24px' }}>
            <h3 style={{ margin: '0 0 16px 0' }}>Add a Comment</h3>
            <textarea
              placeholder="Write your comment..."
              style={{
                width: '100%',
                minHeight: '100px',
                padding: '12px',
                borderRadius: '4px',
                border: '1px solid #ddd',
                marginBottom: '16px',
                fontSize: '14px',
                fontFamily: 'inherit',
              }}
            />
            <div style={{ display: 'flex', gap: '12px' }}>
              <Button 
                variant="outlined" 
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="contained" 
                onClick={() => { alert('Comment posted'); setOpen(false); }}
              >
                Post Comment
              </Button>
            </div>
          </div>
        </BottomSheet>
      </div>
    );
  },
};

/**
 * Bottom sheet with list
 */
export const WithList: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    const items = [
      { id: 1, title: 'Profile Settings', icon: '👤' },
      { id: 2, title: 'Notifications', icon: '🔔' },
      { id: 3, title: 'Privacy & Security', icon: '🔒' },
      { id: 4, title: 'Help & Support', icon: '❓' },
      { id: 5, title: 'About', icon: 'ℹ️' },
    ];
    
    return (
      <div style={{ padding: '24px' }}>
        <Button onClick={() => setOpen(true)} variant="contained">
          Settings Menu
        </Button>
        <BottomSheet open={open} onClose={() => setOpen(false)}>
          <div style={{ padding: '24px' }}>
            <h3 style={{ margin: '0 0 16px 0' }}>Settings</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {items.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    alert(`Clicked: ${item.title}`);
                    setOpen(false);
                  }}
                  style={{
                    padding: '16px',
                    border: 'none',
                    background: 'transparent',
                    textAlign: 'left',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '16px',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <span style={{ fontSize: '24px' }}>{item.icon}</span>
                  <span>{item.title}</span>
                </button>
              ))}
            </div>
          </div>
        </BottomSheet>
      </div>
    );
  },
};

/**
 * Bottom sheet with scrollable content
 */
export const Scrollable: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <div style={{ padding: '24px' }}>
        <Button onClick={() => setOpen(true)} variant="contained">
          View Terms & Conditions
        </Button>
        <BottomSheet open={open} onClose={() => setOpen(false)}>
          <div style={{ padding: '24px', maxHeight: '70vh', overflow: 'auto' }}>
            <h3 style={{ margin: '0 0 16px 0' }}>Terms & Conditions</h3>
            {Array.from({ length: 20 }, (_, i) => (
              <p key={i} style={{ marginBottom: '12px', color: '#666' }}>
                {i + 1}. This is a section of the terms and conditions. 
                It contains important legal information that users should read carefully.
              </p>
            ))}
            <Button 
              variant="contained" 
              onClick={() => setOpen(false)}
              fullWidth
            >
              I Accept
            </Button>
          </div>
        </BottomSheet>
      </div>
    );
  },
};
