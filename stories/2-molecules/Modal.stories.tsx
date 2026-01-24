import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from '../../src/adapters/Modal';
import { Button } from '../../src/adapters/Button';
import { useState } from 'react';

const meta: Meta<typeof Modal> = {
  title: 'Overlay/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Modal Title"
        >
          <p>This is the modal content. It can contain any React components.</p>
        </Modal>
      </div>
    );
  },
};

export const WithActions: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setOpen(true)} variant="contained" color="primary">
          Open Modal with Actions
        </Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Confirm Action"
          actions={
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button
                onClick={() => {
                  alert('Confirmed!');
                  setOpen(false);
                }}
                variant="contained"
                color="primary"
              >
                Confirm
              </Button>
            </div>
          }
        >
          <p>Are you sure you want to proceed with this action?</p>
        </Modal>
      </div>
    );
  },
};

export const DeleteConfirmation: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setOpen(true)} variant="contained" color="error">
          Delete Item
        </Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Delete Confirmation"
          actions={
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button
                onClick={() => {
                  alert('Item deleted!');
                  setOpen(false);
                }}
                variant="contained"
                color="error"
              >
                Delete
              </Button>
            </div>
          }
        >
          <p>
            <strong>Warning:</strong> This action cannot be undone. Are you sure you want to delete this item?
          </p>
        </Modal>
      </div>
    );
  },
};

export const WithForm: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ username: '', email: '' });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert(`Submitted: ${JSON.stringify(formData)}`);
      setOpen(false);
    };

    return (
      <div>
        <Button onClick={() => setOpen(true)} variant="contained" color="primary">
          Create Account
        </Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Create New Account"
        >
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Username
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                required
              />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                required
              />
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">
                Create
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    );
  },
};

export const LargeContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setOpen(true)}>Terms & Conditions</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Terms and Conditions"
          actions={
            <Button onClick={() => setOpen(false)} variant="contained" color="primary" fullWidth>
              I Agree
            </Button>
          }
        >
          <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
            <h3>1. Introduction</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            
            <h3>2. User Accounts</h3>
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            
            <h3>3. Privacy Policy</h3>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            
            <h3>4. Liability</h3>
            <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            
            <h3>5. Termination</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            
            <h3>6. Changes to Terms</h3>
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </div>
        </Modal>
      </div>
    );
  },
};

export const NoTitle: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open Simple Modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          actions={
            <Button onClick={() => setOpen(false)} variant="contained" color="primary" fullWidth>
              Close
            </Button>
          }
        >
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
            <h3>Success!</h3>
            <p>Your action has been completed successfully.</p>
          </div>
        </Modal>
      </div>
    );
  },
};

export const MultipleModals: Story = {
  render: () => {
    const [modal1Open, setModal1Open] = useState(false);
    const [modal2Open, setModal2Open] = useState(false);

    return (
      <div>
        <Button onClick={() => setModal1Open(true)} variant="contained" color="primary">
          Open First Modal
        </Button>
        <Modal
          open={modal1Open}
          onClose={() => setModal1Open(false)}
          title="First Modal"
          actions={
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <Button onClick={() => setModal1Open(false)}>Close</Button>
              <Button onClick={() => setModal2Open(true)} variant="contained" color="primary">
                Open Second Modal
              </Button>
            </div>
          }
        >
          <p>This is the first modal. You can open a second modal from here.</p>
        </Modal>
        <Modal
          open={modal2Open}
          onClose={() => setModal2Open(false)}
          title="Second Modal"
          actions={
            <Button onClick={() => setModal2Open(false)} variant="contained" color="primary">
              Close
            </Button>
          }
        >
          <p>This is the second modal, opened from the first modal.</p>
        </Modal>
      </div>
    );
  },
};

export const FullWidthActions: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Quick Survey"
          actions={
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
              <Button onClick={() => setOpen(false)} variant="contained" color="primary" fullWidth>
                Very Satisfied
              </Button>
              <Button onClick={() => setOpen(false)} variant="outlined" fullWidth>
                Satisfied
              </Button>
              <Button onClick={() => setOpen(false)} variant="outlined" fullWidth>
                Neutral
              </Button>
              <Button onClick={() => setOpen(false)} variant="outlined" fullWidth>
                Dissatisfied
              </Button>
            </div>
          }
        >
          <p>How satisfied are you with our service?</p>
        </Modal>
      </div>
    );
  },
};
