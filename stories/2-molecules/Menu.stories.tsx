import type { Meta, StoryObj } from '@storybook/react';
import { Menu } from '../../src/adapters/Menu';
import { Button } from '../../src/adapters/Button';
import { useState, useRef } from 'react';

const meta: Meta<typeof Menu> = {
  title: 'Overlay/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Menu>;

const basicItems = [
  { label: 'Profile', value: 'profile' },
  { label: 'Settings', value: 'settings' },
  { label: 'Logout', value: 'logout' },
];

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

    const handleItemClick = (value: string) => {
      alert(`Clicked: ${value}`);
      handleClose();
    };

    return (
      <div>
        <Button ref={buttonRef} onClick={handleClick}>
          Open Menu
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          items={basicItems}
          onItemClick={handleItemClick}
        />
      </div>
    );
  },
};

export const WithIcons: Story = {
  render: () => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const items = [
      { label: 'Profile', value: 'profile', icon: <span>👤</span> },
      { label: 'Settings', value: 'settings', icon: <span>⚙️</span> },
      { label: 'Help', value: 'help', icon: <span>❓</span> },
      { label: 'Logout', value: 'logout', icon: <span>🚪</span> },
    ];

    return (
      <div>
        <Button ref={buttonRef} onClick={() => setAnchorEl(buttonRef.current)}>
          Account
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          items={items}
          onItemClick={(value) => {
            alert(`Clicked: ${value}`);
            setAnchorEl(null);
          }}
        />
      </div>
    );
  },
};

export const WithDividers: Story = {
  render: () => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const items = [
      { label: 'New File', value: 'new' },
      { label: 'Open', value: 'open' },
      { label: 'Save', value: 'save', divider: true },
      { label: 'Export', value: 'export' },
      { label: 'Print', value: 'print', divider: true },
      { label: 'Close', value: 'close' },
    ];

    return (
      <div>
        <Button ref={buttonRef} onClick={() => setAnchorEl(buttonRef.current)}>
          File
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          items={items}
          onItemClick={(value) => {
            alert(`Clicked: ${value}`);
            setAnchorEl(null);
          }}
        />
      </div>
    );
  },
};

export const WithDisabledItems: Story = {
  render: () => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const items = [
      { label: 'Edit', value: 'edit' },
      { label: 'Copy', value: 'copy' },
      { label: 'Paste', value: 'paste', disabled: true },
      { label: 'Delete', value: 'delete', disabled: true },
    ];

    return (
      <div>
        <Button ref={buttonRef} onClick={() => setAnchorEl(buttonRef.current)}>
          Edit
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          items={items}
          onItemClick={(value) => {
            alert(`Clicked: ${value}`);
            setAnchorEl(null);
          }}
        />
      </div>
    );
  },
};

export const ContextMenu: Story = {
  render: () => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const items = [
      { label: 'Cut', value: 'cut', icon: <span>✂️</span> },
      { label: 'Copy', value: 'copy', icon: <span>📋</span> },
      { label: 'Paste', value: 'paste', icon: <span>📄</span>, divider: true },
      { label: 'Delete', value: 'delete', icon: <span>🗑️</span> },
    ];

    const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      setPosition({ x: e.clientX, y: e.clientY });
      const anchor = document.createElement('div');
      anchor.style.position = 'fixed';
      anchor.style.top = `${e.clientY}px`;
      anchor.style.left = `${e.clientX}px`;
      document.body.appendChild(anchor);
      setAnchorEl(anchor);
    };

    const handleClose = () => {
      if (anchorEl) {
        document.body.removeChild(anchorEl);
      }
      setAnchorEl(null);
    };

    return (
      <div>
        <div
          onContextMenu={handleContextMenu}
          style={{
            width: 300,
            height: 200,
            border: '2px dashed #ccc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'context-menu',
          }}
        >
          Right-click here for context menu
        </div>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          items={items}
          onItemClick={(value) => {
            alert(`Clicked: ${value}`);
            handleClose();
          }}
        />
      </div>
    );
  },
};

export const NestedMenu: Story = {
  render: () => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [selectedAction, setSelectedAction] = useState<string | null>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const items = [
      { label: 'New', value: 'new' },
      { label: 'Open Recent', value: 'recent' },
      { label: 'Save', value: 'save', divider: true },
      { label: 'Exit', value: 'exit' },
    ];

    return (
      <div>
        <Button ref={buttonRef} onClick={() => setAnchorEl(buttonRef.current)}>
          File Menu
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          items={items}
          onItemClick={(value) => {
            setSelectedAction(value);
            setAnchorEl(null);
          }}
        />
        {selectedAction && (
          <div style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
            Last action: <strong>{selectedAction}</strong>
          </div>
        )}
      </div>
    );
  },
};
