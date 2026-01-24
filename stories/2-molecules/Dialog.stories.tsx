import type { Meta, StoryObj } from '@storybook/react';
import { Dialog } from '../../src/adapters/Dialog';
import { Button } from '../../src/adapters/Button';
import { useState } from 'react';

/**
 * Dialog component that adapts to the selected UI provider.
 * 
 * ## Supported Providers
 * - **internal**: Custom in-house implementation
 * - **mui**: Material-UI Dialog
 * - **radix**: Radix UI Dialog
 * - **shadcn**: shadcn/ui Dialog (Radix + Tailwind)
 */
const meta = {
  title: 'Overlay/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          title="Dialog Title"
        >
          <div style={{ padding: '1rem' }}>
            <p>This is a basic dialog with a title and content.</p>
          </div>
        </Dialog>
      </>
    );
  },
};

export const WithActions: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          title="Confirm Action"
          actions={
            <>
              <Button variant="text" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="contained" onClick={() => setOpen(false)}>
                Confirm
              </Button>
            </>
          }
        >
          <div style={{ padding: '1rem' }}>
            <p>Are you sure you want to proceed with this action?</p>
          </div>
        </Dialog>
      </>
    );
  },
};

export const LargeContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          title="Terms and Conditions"
          maxWidth="md"
          actions={
            <>
              <Button variant="text" onClick={() => setOpen(false)}>
                Decline
              </Button>
              <Button variant="contained" onClick={() => setOpen(false)}>
                Accept
              </Button>
            </>
          }
        >
          <div style={{ padding: '1rem' }}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
              eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt 
              in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
              doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
              veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
          </div>
        </Dialog>
      </>
    );
  },
};

export const FullScreen: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Full Screen Dialog</Button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          title="Full Screen Dialog"
          fullScreen
          actions={
            <Button variant="contained" onClick={() => setOpen(false)}>
              Close
            </Button>
          }
        >
          <div style={{ padding: '1rem' }}>
            <p>This dialog takes up the entire screen.</p>
          </div>
        </Dialog>
      </>
    );
  },
};

export const WithForm: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Form Dialog</Button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          title="Edit Profile"
          actions={
            <>
              <Button variant="text" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="contained" onClick={() => setOpen(false)}>
                Save
              </Button>
            </>
          }
        >
          <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input placeholder="Name" style={{ padding: '0.5rem', width: '100%' }} />
            <input placeholder="Email" type="email" style={{ padding: '0.5rem', width: '100%' }} />
            <textarea placeholder="Bio" rows={4} style={{ padding: '0.5rem', width: '100%' }} />
          </div>
        </Dialog>
      </>
    );
  },
};
