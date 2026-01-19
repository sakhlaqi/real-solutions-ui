import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Snackbar } from './Snackbar';
import { Button } from './Button';

/**
 * Snackbar component for displaying brief messages at the bottom or top of the screen.
 * 
 * ## Features
 * - Multiple severity levels
 * - Positioning options
 * - Auto-dismiss
 * - Action buttons
 */
const meta = {
  title: 'Feedback/Snackbar',
  component: Snackbar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    severity: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info'],
      description: 'Severity level',
    },
    position: {
      control: 'select',
      options: ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'],
      description: 'Position on screen',
    },
  },
} satisfies Meta<typeof Snackbar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Success message
 */
export const Success: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <Button onClick={() => setOpen(true)} variant="contained" color="success">
          Show Success
        </Button>
        <Snackbar
          open={open}
          onClose={() => setOpen(false)}
          message="Changes saved successfully!"
          severity="success"
          position="bottom-center"
          autoHideDuration={3000}
        />
      </>
    );
  },
};

/**
 * Error message
 */
export const Error: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <Button onClick={() => setOpen(true)} variant="contained" color="error">
          Show Error
        </Button>
        <Snackbar
          open={open}
          onClose={() => setOpen(false)}
          message="An error occurred. Please try again."
          severity="error"
          position="bottom-center"
          autoHideDuration={4000}
        />
      </>
    );
  },
};

/**
 * Warning message
 */
export const Warning: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <Button onClick={() => setOpen(true)} variant="contained" color="warning">
          Show Warning
        </Button>
        <Snackbar
          open={open}
          onClose={() => setOpen(false)}
          message="Your session will expire in 5 minutes"
          severity="warning"
          position="top-center"
          autoHideDuration={5000}
        />
      </>
    );
  },
};

/**
 * Info message
 */
export const Info: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <Button onClick={() => setOpen(true)} variant="contained" color="info">
          Show Info
        </Button>
        <Snackbar
          open={open}
          onClose={() => setOpen(false)}
          message="New version available. Refresh to update."
          severity="info"
          position="bottom-right"
          autoHideDuration={4000}
        />
      </>
    );
  },
};

/**
 * Different positions
 */
export const Positions: Story = {
  render: () => {
    const [position, setPosition] = useState<any>('');
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <Button size="small" onClick={() => setPosition('top-left')}>Top Left</Button>
          <Button size="small" onClick={() => setPosition('top-center')}>Top Center</Button>
          <Button size="small" onClick={() => setPosition('top-right')}>Top Right</Button>
        </div>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <Button size="small" onClick={() => setPosition('bottom-left')}>Bottom Left</Button>
          <Button size="small" onClick={() => setPosition('bottom-center')}>Bottom Center</Button>
          <Button size="small" onClick={() => setPosition('bottom-right')}>Bottom Right</Button>
        </div>
        {position && (
          <Snackbar
            open={true}
            onClose={() => setPosition('')}
            message={`Snackbar at ${position}`}
            severity="info"
            position={position}
            autoHideDuration={2000}
          />
        )}
      </div>
    );
  },
};

/**
 * With action button
 */
export const WithAction: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <Button onClick={() => setOpen(true)} variant="contained">
          Delete Item
        </Button>
        <Snackbar
          open={open}
          onClose={() => setOpen(false)}
          message="Item deleted"
          severity="success"
          position="bottom-center"
          action={
            <Button size="small" variant="text" onClick={() => alert('Undo clicked!')}>
              UNDO
            </Button>
          }
          autoHideDuration={5000}
        />
      </>
    );
  },
};

/**
 * Multiple notifications
 */
export const MultipleNotifications: Story = {
  render: () => {
    const [notifications, setNotifications] = useState<Array<{id: number, message: string, severity: string}>>([]);
    let nextId = 0;
    
    const addNotification = (message: string, severity: string) => {
      const id = nextId++;
      setNotifications(prev => [...prev, { id, message, severity }]);
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, 3000);
    };
    
    return (
      <div style={{ display: 'flex', gap: '12px' }}>
        <Button onClick={() => addNotification('File uploaded', 'success')} color="success">
          Upload
        </Button>
        <Button onClick={() => addNotification('File downloaded', 'info')} color="info">
          Download
        </Button>
        <Button onClick={() => addNotification('Operation failed', 'error')} color="error">
          Error
        </Button>
        {notifications.map((notif, index) => (
          <Snackbar
            key={notif.id}
            open={true}
            onClose={() => setNotifications(prev => prev.filter(n => n.id !== notif.id))}
            message={notif.message}
            severity={notif.severity as any}
            position="bottom-right"
            style={{ bottom: `${(index * 70) + 16}px` }}
          />
        ))}
      </div>
    );
  },
};
