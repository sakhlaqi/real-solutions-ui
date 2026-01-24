import type { Meta, StoryObj } from '@storybook/react';
import { Drawer } from '../../src/adapters/Drawer';
import { Button } from '../../src/adapters/Button';
import { useState } from 'react';

const meta: Meta<typeof Drawer> = {
  title: 'Overlay/Drawer',
  component: Drawer,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Left: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div style={{ padding: '2rem' }}>
        <Button onClick={() => setOpen(true)}>Open Left Drawer</Button>
        <Drawer open={open} onClose={() => setOpen(false)} anchor="left">
          <div style={{ padding: '2rem', width: 250 }}>
            <h3>Left Drawer</h3>
            <p>This drawer slides in from the left.</p>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </div>
        </Drawer>
      </div>
    );
  },
};

export const Right: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div style={{ padding: '2rem' }}>
        <Button onClick={() => setOpen(true)}>Open Right Drawer</Button>
        <Drawer open={open} onClose={() => setOpen(false)} anchor="right">
          <div style={{ padding: '2rem', width: 250 }}>
            <h3>Right Drawer</h3>
            <p>This drawer slides in from the right.</p>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </div>
        </Drawer>
      </div>
    );
  },
};

export const Top: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div style={{ padding: '2rem' }}>
        <Button onClick={() => setOpen(true)}>Open Top Drawer</Button>
        <Drawer open={open} onClose={() => setOpen(false)} anchor="top">
          <div style={{ padding: '2rem' }}>
            <h3>Top Drawer</h3>
            <p>This drawer slides in from the top.</p>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </div>
        </Drawer>
      </div>
    );
  },
};

export const Bottom: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div style={{ padding: '2rem' }}>
        <Button onClick={() => setOpen(true)}>Open Bottom Drawer</Button>
        <Drawer open={open} onClose={() => setOpen(false)} anchor="bottom">
          <div style={{ padding: '2rem' }}>
            <h3>Bottom Drawer</h3>
            <p>This drawer slides in from the bottom.</p>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </div>
        </Drawer>
      </div>
    );
  },
};

export const NavigationDrawer: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    const navItems = [
      { label: 'Home', icon: '🏠' },
      { label: 'Profile', icon: '👤' },
      { label: 'Messages', icon: '✉️' },
      { label: 'Settings', icon: '⚙️' },
      { label: 'Help', icon: '❓' },
    ];

    return (
      <div style={{ padding: '2rem' }}>
        <Button onClick={() => setOpen(true)}>☰ Menu</Button>
        <Drawer open={open} onClose={() => setOpen(false)} anchor="left" width={280}>
          <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #e0e0e0' }}>
              <h2 style={{ margin: 0 }}>Navigation</h2>
            </div>
            <nav style={{ flex: 1, padding: '1rem 0' }}>
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    width: '100%',
                    padding: '1rem 1.5rem',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
            <div style={{ padding: '1rem', borderTop: '1px solid #e0e0e0' }}>
              <Button onClick={() => setOpen(false)} fullWidth>
                Close Menu
              </Button>
            </div>
          </div>
        </Drawer>
      </div>
    );
  },
};

export const WithForm: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert(`Submitted: ${JSON.stringify(formData, null, 2)}`);
      setOpen(false);
    };

    return (
      <div style={{ padding: '2rem' }}>
        <Button onClick={() => setOpen(true)} variant="contained" color="primary">
          Contact Us
        </Button>
        <Drawer open={open} onClose={() => setOpen(false)} anchor="right" width={400}>
          <form onSubmit={handleSubmit} style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #e0e0e0' }}>
              <h2 style={{ margin: 0 }}>Contact Form</h2>
            </div>
            <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                  required
                />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                  required
                />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                  required
                />
              </div>
            </div>
            <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #e0e0e0', display: 'flex', gap: '0.5rem' }}>
              <Button onClick={() => setOpen(false)} fullWidth>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Submit
              </Button>
            </div>
          </form>
        </Drawer>
      </div>
    );
  },
};

export const FilterDrawer: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [filters, setFilters] = useState({
      category: '',
      priceRange: '',
      inStock: false,
    });

    return (
      <div style={{ padding: '2rem' }}>
        <Button onClick={() => setOpen(true)}>🔍 Filters</Button>
        <Drawer open={open} onClose={() => setOpen(false)} anchor="left" width={320}>
          <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #e0e0e0' }}>
              <h2 style={{ margin: 0 }}>Filters</h2>
            </div>
            <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                >
                  <option value="">All Categories</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="books">Books</option>
                </select>
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Price Range</label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                >
                  <option value="">Any Price</option>
                  <option value="0-50">$0 - $50</option>
                  <option value="50-100">$50 - $100</option>
                  <option value="100+">$100+</option>
                </select>
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => setFilters({ ...filters, inStock: e.target.checked })}
                  />
                  <span>In Stock Only</span>
                </label>
              </div>
            </div>
            <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #e0e0e0', display: 'flex', gap: '0.5rem' }}>
              <Button onClick={() => setFilters({ category: '', priceRange: '', inStock: false })} fullWidth>
                Clear
              </Button>
              <Button onClick={() => setOpen(false)} variant="contained" color="primary" fullWidth>
                Apply
              </Button>
            </div>
          </div>
        </Drawer>
      </div>
    );
  },
};
