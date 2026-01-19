import type { Meta, StoryObj } from '@storybook/react';
import { Popover } from './Popover';
import { Button } from './Button';
import { useState, useRef } from 'react';

const meta: Meta<typeof Popover> = {
  title: 'Overlay/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleClick = () => {
      setAnchorEl(buttonRef.current);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <div>
        <Button ref={buttonRef} onClick={handleClick}>
          Open Popover
        </Button>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
        >
          <div style={{ padding: '1rem', maxWidth: 300 }}>
            <h4 style={{ margin: '0 0 0.5rem 0' }}>Popover Content</h4>
            <p style={{ margin: 0 }}>
              This is the content inside the popover. It can contain any React components.
            </p>
          </div>
        </Popover>
      </div>
    );
  },
};

export const WithPositioning: Story = {
  render: () => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [position, setPosition] = useState<'top' | 'bottom' | 'left' | 'right'>('bottom');

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>, pos: 'top' | 'bottom' | 'left' | 'right') => {
      setAnchorEl(e.currentTarget);
      setPosition(pos);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const getAnchorOrigin = () => {
      const origins = {
        top: { vertical: 'top' as const, horizontal: 'center' as const },
        bottom: { vertical: 'bottom' as const, horizontal: 'center' as const },
        left: { vertical: 'center' as const, horizontal: 'left' as const },
        right: { vertical: 'center' as const, horizontal: 'right' as const },
      };
      return origins[position];
    };

    return (
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Button onClick={(e) => handleClick(e, 'top')}>Top</Button>
        <Button onClick={(e) => handleClick(e, 'bottom')}>Bottom</Button>
        <Button onClick={(e) => handleClick(e, 'left')}>Left</Button>
        <Button onClick={(e) => handleClick(e, 'right')}>Right</Button>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={getAnchorOrigin()}
        >
          <div style={{ padding: '1rem' }}>
            Positioned: {position}
          </div>
        </Popover>
      </div>
    );
  },
};

export const WithForm: Story = {
  render: () => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [email, setEmail] = useState('');
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleClick = () => {
      setAnchorEl(buttonRef.current);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert(`Submitted: ${email}`);
      handleClose();
    };

    return (
      <div>
        <Button ref={buttonRef} onClick={handleClick} variant="contained" color="primary">
          Subscribe
        </Button>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
        >
          <form onSubmit={handleSubmit} style={{ padding: '1.5rem', width: 300 }}>
            <h4 style={{ margin: '0 0 1rem 0' }}>Subscribe to Newsletter</h4>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}
              required
            />
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <Button onClick={handleClose} size="small">Cancel</Button>
              <Button type="submit" variant="contained" color="primary" size="small">
                Subscribe
              </Button>
            </div>
          </form>
        </Popover>
      </div>
    );
  },
};

export const WithMenu: Story = {
  render: () => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleClick = () => {
      setAnchorEl(buttonRef.current);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const menuItems = [
      { label: 'Profile', icon: '👤' },
      { label: 'Settings', icon: '⚙️' },
      { label: 'Help', icon: '❓' },
      { label: 'Logout', icon: '🚪' },
    ];

    return (
      <div>
        <Button ref={buttonRef} onClick={handleClick}>
          Account Menu
        </Button>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
        >
          <div style={{ padding: '0.5rem 0', minWidth: 200 }}>
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={handleClose}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </Popover>
      </div>
    );
  },
};

export const WithRichContent: Story = {
  render: () => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleClick = () => {
      setAnchorEl(buttonRef.current);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <div>
        <Button ref={buttonRef} onClick={handleClick} variant="outlined">
          View Details
        </Button>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
        >
          <div style={{ padding: '1.5rem', maxWidth: 400 }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: '#e0e0e0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                👤
              </div>
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0' }}>John Doe</h4>
                <p style={{ margin: 0, color: '#666', fontSize: '0.875rem' }}>Software Engineer</p>
              </div>
            </div>
            <p style={{ margin: '0 0 1rem 0', fontSize: '0.875rem' }}>
              Experienced developer with a passion for creating beautiful and functional user interfaces.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button size="small" variant="outlined">View Profile</Button>
              <Button size="small" variant="contained" color="primary">Follow</Button>
            </div>
          </div>
        </Popover>
      </div>
    );
  },
};
