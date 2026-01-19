import type { Meta, StoryObj } from '@storybook/react';
import { Backdrop } from './Backdrop';
import { Button } from './Button';
import { Spinner } from './Spinner';
import { useState } from 'react';

/**
 * Backdrop component that adapts to the selected UI provider.
 * Provides a semi-transparent overlay that covers the entire viewport.
 * 
 * ## Supported Providers
 * - **internal**: Custom in-house implementation
 * - **mui**: Material-UI Backdrop
 */
const meta = {
  title: 'Overlay/Backdrop',
  component: Backdrop,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Whether the backdrop is visible',
    },
    invisible: {
      control: 'boolean',
      description: 'Makes the backdrop transparent',
    },
  },
} satisfies Meta<typeof Backdrop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setOpen(true)} variant="contained">
          Open Backdrop
        </Button>
        <Backdrop open={open} onClick={() => setOpen(false)} />
      </div>
    );
  },
};

export const WithSpinner: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setOpen(true)} variant="contained" color="primary">
          Show Loading Backdrop
        </Button>
        <Backdrop open={open} onClick={() => setOpen(false)}>
          <Spinner size="large" color="primary" />
        </Backdrop>
      </div>
    );
  },
};

export const WithContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setOpen(true)} variant="contained" color="primary">
          Open Backdrop with Content
        </Button>
        <Backdrop open={open} onClick={() => setOpen(false)}>
          <div style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '8px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'center'
          }}>
            <Spinner size="large" color="primary" />
            <div style={{ fontSize: '1.125rem', fontWeight: 500 }}>
              Processing your request...
            </div>
            <div style={{ fontSize: '0.875rem', color: '#666' }}>
              Please wait
            </div>
          </div>
        </Backdrop>
      </div>
    );
  },
};

export const Invisible: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setOpen(true)} variant="contained">
          Open Invisible Backdrop
        </Button>
        <Backdrop open={open} onClick={() => setOpen(false)} invisible>
          <div style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.125rem', fontWeight: 500, marginBottom: '0.5rem' }}>
              Invisible Backdrop
            </div>
            <div style={{ fontSize: '0.875rem', color: '#666' }}>
              Click anywhere to close
            </div>
          </div>
        </Backdrop>
      </div>
    );
  },
};

export const NonClickable: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <Button onClick={() => setOpen(true)} variant="contained" color="primary">
            Open Non-Clickable Backdrop
          </Button>
          {open && (
            <Button onClick={() => setOpen(false)} variant="outlined" color="error">
              Close
            </Button>
          )}
        </div>
        <Backdrop open={open}>
          <div style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '8px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'center',
            minWidth: '300px'
          }}>
            <Spinner size="large" color="primary" />
            <div style={{ fontSize: '1.125rem', fontWeight: 500 }}>
              Processing...
            </div>
            <div style={{ fontSize: '0.875rem', color: '#666' }}>
              Please do not close this window
            </div>
          </div>
        </Backdrop>
      </div>
    );
  },
};

export const MultipleActions: Story = {
  render: () => {
    const [loading, setLoading] = useState(false);

    const handleAction = async () => {
      setLoading(true);
      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLoading(false);
    };

    return (
      <div>
        <Button 
          onClick={handleAction} 
          variant="contained" 
          color="primary"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Start Long Operation'}
        </Button>
        <Backdrop open={loading}>
          <div style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '8px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'center'
          }}>
            <Spinner size="large" color="primary" />
            <div style={{ fontSize: '1.125rem', fontWeight: 500 }}>
              Processing your request
            </div>
            <div style={{ fontSize: '0.875rem', color: '#666' }}>
              This may take a few seconds...
            </div>
          </div>
        </Backdrop>
      </div>
    );
  },
};
