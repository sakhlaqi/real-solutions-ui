import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from './Navbar';

/**
 * Navbar component for top-level application navigation.
 * 
 * ## Features
 * - Brand/logo display
 * - Navigation links
 * - Fixed/sticky positioning
 * - Responsive design
 */
const meta = {
  title: 'Navigation/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic navbar with logo and links
 */
export const Default: Story = {
  args: {
    brand: 'MyApp',
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
};

/**
 * Navbar with fixed position
 */
export const Fixed: Story = {
  render: (args) => (
    <div>
      <Navbar {...args} />
      <div style={{ padding: '2rem', marginTop: '60px' }}>
        <h2>Page Content</h2>
        <p>The navbar is fixed at the top of the page.</p>
        <p style={{ marginTop: '1rem' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
  ),
  args: {
    brand: 'FixedNav',
    position: 'fixed',
    items: [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Projects', href: '/projects' },
      { label: 'Team', href: '/team' },
      { label: 'Settings', href: '/settings' },
    ],
  },
};

/**
 * Navbar with custom logo/brand component
 */
export const WithCustomBrand: Story = {
  args: {
    brand: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontSize: '1.5rem' }}>🚀</span>
        <span style={{ fontWeight: 'bold' }}>SpaceApp</span>
      </div>
    ),
    items: [
      { label: 'Missions', href: '/missions' },
      { label: 'Crew', href: '/crew' },
      { label: 'Vehicles', href: '/vehicles' },
    ],
  },
};

/**
 * Navbar with many navigation items
 */
export const ManyItems: Story = {
  args: {
    brand: 'Enterprise',
    items: [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Products', href: '/products' },
      { label: 'Services', href: '/services' },
      { label: 'Portfolio', href: '/portfolio' },
      { label: 'Blog', href: '/blog' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '/careers' },
    ],
  },
};

/**
 * Navbar with action buttons
 */
export const WithActions: Story = {
  args: {
    brand: 'SaaS Platform',
    items: [
      { label: 'Features', href: '/features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Docs', href: '/docs' },
    ],
    rightContent: (
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white' }}>
          Sign In
        </button>
        <button style={{ padding: '0.5rem 1rem', border: 'none', borderRadius: '4px', background: '#1976d2', color: 'white' }}>
          Start Free Trial
        </button>
      </div>
    ),
  },
};
