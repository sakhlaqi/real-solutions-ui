import type { Meta, StoryObj } from '@storybook/react';
import React, { Suspense } from 'react';
import { useRenderContext } from '../../src/renderer/RenderContext';
import { resolveComponentAdapter } from '../../src/adapters';
import type { SidebarCompositeProps } from '../../src/core/composites/Sidebar/types';

/**
 * SidebarComposite
 * 
 * A navigation sidebar component with hierarchical menu items, icons, and badges.
 * Provides consistent navigation structure across the application.
 * 
 * **Provider Support:**
 * - **MUI**: Uses Material-UI List, ListItem, and Drawer components
 * - **Internal**: Falls back to MUI implementation
 * 
 * **Features:**
 * - Hierarchical navigation items (parent/child)
 * - Icons for visual identification
 * - Badges for counts/notifications
 * - Active state highlighting
 * - Collapsible sections
 * - Responsive drawer behavior
 * - Custom styling per item
 */

const SidebarWrapper = (props: SidebarCompositeProps) => {
  const context = useRenderContext();
  const provider = context.provider || 'mui';

  const SidebarAdapter = React.lazy(async () => {
    const adapter = await resolveComponentAdapter('SidebarComposite', provider);
    if (!adapter) {
      throw new Error(`SidebarComposite adapter not found for provider: ${provider}`);
    }
    return { default: adapter };
  });

  return (
    <Suspense fallback={<div>Loading Sidebar...</div>}>
      <SidebarAdapter {...props} />
    </Suspense>
  );
};

const meta = {
  title: 'Composites/SidebarComposite',
  component: SidebarWrapper,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A flexible sidebar navigation component with support for icons, badges, and nested items.

### Adapter Behavior
Use the **UI Provider** toolbar to switch between implementations:
- **MUI**: Material-UI components with theme integration
- **Internal**: Fallback to MUI (can be customized)

### Common Use Cases
- App navigation menu
- Settings sidebar
- Document outline
- File explorer
- Category browser
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: { type: 'range', min: 200, max: 400, step: 10 },
      description: 'Sidebar width in pixels',
    },
    collapsible: {
      control: 'boolean',
      description: 'Allow collapsing sidebar',
    },
    collapsed: {
      control: 'boolean',
      description: 'Initial collapsed state',
    },
  },
} satisfies Meta<typeof SidebarWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic sidebar with simple navigation items.
 */
export const Basic: Story = {
  args: {
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: '📊', href: '#/dashboard' },
      { id: 'users', label: 'Users', icon: '👥', href: '#/users' },
      { id: 'settings', label: 'Settings', icon: '⚙️', href: '#/settings' },
    ],
    activeItemId: 'dashboard',
  },
};

/**
 * Complete sidebar with all features.
 */
export const Complete: Story = {
  args: {
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: '📊', href: '#/dashboard' },
      { 
        id: 'employees', 
        label: 'Employees', 
        icon: '👥', 
        badge: { label: '12', variant: 'info' },
        children: [
          { id: 'employees-list', label: 'All Employees', href: '#/employees' },
          { id: 'employees-new', label: 'Add Employee', href: '#/employees/new' },
          { id: 'employees-departments', label: 'Departments', href: '#/employees/departments' },
        ]
      },
      { 
        id: 'projects', 
        label: 'Projects', 
        icon: '📁',
        badge: { label: '3', variant: 'warning' },
        children: [
          { id: 'projects-active', label: 'Active Projects', href: '#/projects/active', badge: { label: '2', variant: 'success' } },
          { id: 'projects-archived', label: 'Archived', href: '#/projects/archived', badge: { label: '1', variant: 'default' } },
        ]
      },
      { id: 'reports', label: 'Reports', icon: '📈', href: '#/reports' },
      { id: 'settings', label: 'Settings', icon: '⚙️', href: '#/settings' },
    ],
    activeItemId: 'employees-list',
    width: 280,
    collapsible: true,
  },
};

/**
 * Sidebar with nested navigation.
 */
export const WithNesting: Story = {
  args: {
    items: [
      { id: 'home', label: 'Home', icon: '🏠', href: '#/' },
      { 
        id: 'admin', 
        label: 'Administration', 
        icon: '🔐',
        children: [
          { id: 'admin-users', label: 'Users', href: '#/admin/users' },
          { id: 'admin-roles', label: 'Roles', href: '#/admin/roles' },
          { id: 'admin-permissions', label: 'Permissions', href: '#/admin/permissions' },
        ]
      },
      { 
        id: 'content', 
        label: 'Content', 
        icon: '📝',
        children: [
          { id: 'content-pages', label: 'Pages', href: '#/content/pages' },
          { id: 'content-posts', label: 'Posts', href: '#/content/posts' },
          { id: 'content-media', label: 'Media', href: '#/content/media' },
        ]
      },
    ],
    activeItemId: 'admin-users',
  },
};

/**
 * Sidebar with notification badges.
 */
export const WithBadges: Story = {
  args: {
    items: [
      { id: 'inbox', label: 'Inbox', icon: '📥', badge: { label: '5', variant: 'error' }, href: '#/inbox' },
      { id: 'drafts', label: 'Drafts', icon: '📝', badge: { label: '2', variant: 'warning' }, href: '#/drafts' },
      { id: 'sent', label: 'Sent', icon: '📤', href: '#/sent' },
      { id: 'archive', label: 'Archive', icon: '📦', badge: { label: '125', variant: 'default' }, href: '#/archive' },
      { id: 'trash', label: 'Trash', icon: '🗑️', href: '#/trash' },
    ],
    activeItemId: 'inbox',
  },
};

/**
 * Collapsible sidebar (icon-only when collapsed).
 */
export const Collapsible: Story = {
  args: {
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: '📊', href: '#/dashboard' },
      { id: 'analytics', label: 'Analytics', icon: '📈', href: '#/analytics' },
      { id: 'users', label: 'Users', icon: '👥', href: '#/users' },
      { id: 'settings', label: 'Settings', icon: '⚙️', href: '#/settings' },
    ],
    activeItemId: 'dashboard',
    collapsible: true,
    collapsed: false,
  },
};

/**
 * Collapsed sidebar showing only icons.
 */
export const Collapsed: Story = {
  args: {
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: '📊', href: '#/dashboard' },
      { id: 'analytics', label: 'Analytics', icon: '📈', href: '#/analytics' },
      { id: 'users', label: 'Users', icon: '👥', href: '#/users' },
      { id: 'settings', label: 'Settings', icon: '⚙️', href: '#/settings' },
    ],
    activeItemId: 'dashboard',
    collapsible: true,
    collapsed: true,
    width: 64,
  },
};

/**
 * Wide sidebar with more space.
 */
export const Wide: Story = {
  args: {
    items: [
      { id: 'overview', label: 'Overview', icon: '📊', href: '#/overview' },
      { id: 'performance', label: 'Performance Metrics', icon: '📈', href: '#/performance' },
      { id: 'team', label: 'Team Management', icon: '👥', href: '#/team' },
      { id: 'projects', label: 'Project Portfolio', icon: '📁', href: '#/projects' },
      { id: 'resources', label: 'Resource Allocation', icon: '🎯', href: '#/resources' },
    ],
    activeItemId: 'overview',
    width: 320,
  },
};

/**
 * Settings-style sidebar with sections.
 */
export const SettingsSidebar: Story = {
  args: {
    items: [
      { id: 'profile', label: 'Profile', icon: '👤', href: '#/settings/profile' },
      { id: 'account', label: 'Account', icon: '🔐', href: '#/settings/account' },
      { id: 'notifications', label: 'Notifications', icon: '🔔', badge: { label: '3', variant: 'error' }, href: '#/settings/notifications' },
      { id: 'privacy', label: 'Privacy', icon: '🔒', href: '#/settings/privacy' },
      { id: 'billing', label: 'Billing', icon: '💳', href: '#/settings/billing' },
      { id: 'advanced', label: 'Advanced', icon: '⚙️', href: '#/settings/advanced' },
    ],
    activeItemId: 'notifications',
  },
};

/**
 * Minimal sidebar without icons.
 */
export const NoIcons: Story = {
  args: {
    items: [
      { id: 'home', label: 'Home', href: '#/' },
      { id: 'about', label: 'About', href: '#/about' },
      { id: 'services', label: 'Services', href: '#/services' },
      { id: 'contact', label: 'Contact', href: '#/contact' },
    ],
    activeItemId: 'home',
  },
};

/**
 * Deep nesting with multiple levels.
 */
export const DeepNesting: Story = {
  args: {
    items: [
      { id: 'home', label: 'Home', icon: '🏠', href: '#/' },
      { 
        id: 'products', 
        label: 'Products', 
        icon: '🛍️',
        children: [
          { 
            id: 'products-electronics', 
            label: 'Electronics',
            children: [
              { id: 'products-electronics-phones', label: 'Phones', href: '#/products/electronics/phones' },
              { id: 'products-electronics-laptops', label: 'Laptops', href: '#/products/electronics/laptops' },
            ]
          },
          { 
            id: 'products-clothing', 
            label: 'Clothing',
            children: [
              { id: 'products-clothing-mens', label: "Men's", href: '#/products/clothing/mens' },
              { id: 'products-clothing-womens', label: "Women's", href: '#/products/clothing/womens' },
            ]
          },
        ]
      },
    ],
    activeItemId: 'products-electronics-phones',
  },
};

/**
 * Document outline style sidebar.
 */
export const DocumentOutline: Story = {
  args: {
    items: [
      { id: 'intro', label: 'Introduction', href: '#intro' },
      { 
        id: 'chapter1', 
        label: 'Chapter 1: Getting Started',
        children: [
          { id: 'chapter1-1', label: '1.1 Installation', href: '#chapter1-1' },
          { id: 'chapter1-2', label: '1.2 Configuration', href: '#chapter1-2' },
          { id: 'chapter1-3', label: '1.3 First Steps', href: '#chapter1-3' },
        ]
      },
      { 
        id: 'chapter2', 
        label: 'Chapter 2: Advanced Topics',
        children: [
          { id: 'chapter2-1', label: '2.1 Architecture', href: '#chapter2-1' },
          { id: 'chapter2-2', label: '2.2 Best Practices', href: '#chapter2-2' },
        ]
      },
      { id: 'conclusion', label: 'Conclusion', href: '#conclusion' },
    ],
    activeItemId: 'chapter1-2',
  },
};

/**
 * Sidebar with complete business application data.
 */
export const WithData: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates a fully populated sidebar with realistic business navigation including hierarchical menus, badges, and icons.',
      },
    },
  },
  args: {
    items: [
      { 
        id: 'dashboard', 
        label: 'Dashboard', 
        icon: '📊', 
        href: '#/dashboard',
        badge: { label: '5', color: 'error' }
      },
      { 
        id: 'customers', 
        label: 'Customers', 
        icon: '👥',
        badge: { label: '127', color: 'info' },
        children: [
          { id: 'customers-all', label: 'All Customers', href: '#/customers' },
          { id: 'customers-active', label: 'Active', href: '#/customers/active', badge: { label: '89', color: 'success' } },
          { id: 'customers-inactive', label: 'Inactive', href: '#/customers/inactive', badge: { label: '38' } },
          { id: 'customers-prospects', label: 'Prospects', href: '#/customers/prospects', badge: { label: '12', color: 'warning' } },
        ]
      },
      { 
        id: 'orders', 
        label: 'Orders', 
        icon: '📦',
        badge: { label: 'NEW', color: 'error' },
        children: [
          { id: 'orders-pending', label: 'Pending', href: '#/orders/pending', badge: { label: '23', color: 'warning' } },
          { id: 'orders-processing', label: 'Processing', href: '#/orders/processing', badge: { label: '8' } },
          { id: 'orders-shipped', label: 'Shipped', href: '#/orders/shipped' },
          { id: 'orders-completed', label: 'Completed', href: '#/orders/completed' },
        ]
      },
      { 
        id: 'products', 
        label: 'Products', 
        icon: '🛍️',
        children: [
          { id: 'products-catalog', label: 'Catalog', href: '#/products' },
          { id: 'products-categories', label: 'Categories', href: '#/products/categories' },
          { id: 'products-inventory', label: 'Inventory', href: '#/products/inventory', badge: { label: 'LOW', color: 'error' } },
        ]
      },
      { 
        id: 'reports', 
        label: 'Reports', 
        icon: '📈',
        children: [
          { id: 'reports-sales', label: 'Sales', href: '#/reports/sales' },
          { id: 'reports-revenue', label: 'Revenue', href: '#/reports/revenue' },
          { id: 'reports-customers', label: 'Customers', href: '#/reports/customers' },
        ]
      },
      { id: 'settings', label: 'Settings', icon: '⚙️', href: '#/settings' },
    ],
    activeItemId: 'orders-pending',
  },
};

/**
 * Sidebar in loading state.
 */
export const Loading: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Shows sidebar during navigation data loading with skeleton placeholders.',
      },
    },
  },
  args: {
    items: [
      { id: 'loading-1', label: 'Loading...', disabled: true },
      { id: 'loading-2', label: 'Loading...', disabled: true },
      { id: 'loading-3', label: 'Loading...', disabled: true },
    ],
  },
};

/**
 * Empty sidebar state.
 */
export const Empty: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Sidebar with no navigation items, typically shown when user has no permissions or during initial setup.',
      },
    },
  },
  args: {
    items: [
      { 
        id: 'empty-message', 
        label: 'No navigation items available', 
        disabled: true 
      },
    ],
  },
};

/**
 * Sidebar showing error state.
 */
export const Error: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Sidebar showing error state when navigation data fails to load.',
      },
    },
  },
  args: {
    items: [
      { 
        id: 'error', 
        label: 'Failed to load navigation', 
        icon: '⚠️',
        disabled: true
      },
      { 
        id: 'retry', 
        label: 'Retry', 
        icon: '🔄',
        href: '#',
        onClick: () => console.log('Retrying navigation load...')
      },
    ],
  },
};

/**
 * Tests adapter fallback behavior across providers.
 */
export const AdapterFallback: Story = {
  parameters: {
    docs: {
      description: {
        story: `
This story tests how SidebarComposite handles provider switching.

**Testing Instructions:**
1. Use the **UI Provider** toolbar control to switch between providers
2. Verify the sidebar renders consistently across providers
3. Check that nested items, badges, icons, and active states work correctly
4. Test expand/collapse functionality for parent items

**Expected Behavior:**
- MUI provider: Uses Material-UI List and Drawer components with theme integration
- Internal provider: Falls back to MUI implementation (or custom if configured)
- All navigation functionality should work regardless of provider selection
- Badges, icons, and hierarchical structure should render properly in both providers
        `,
      },
    },
  },
  args: {
    items: [
      { 
        id: 'test-home', 
        label: 'Provider Test Home', 
        icon: '🧪', 
        href: '#/test' 
      },
      { 
        id: 'test-parent', 
        label: 'Expandable Section', 
        icon: '📁',
        badge: { label: 'TEST', color: 'info' },
        children: [
          { 
            id: 'test-child-1', 
            label: 'Child Item 1', 
            href: '#/test/child1',
            badge: { label: '1' }
          },
          { 
            id: 'test-child-2', 
            label: 'Child Item 2', 
            href: '#/test/child2',
            badge: { label: '2', color: 'success' }
          },
        ]
      },
      { 
        id: 'test-settings', 
        label: 'Test Settings', 
        icon: '⚙️', 
        href: '#/test/settings',
        onClick: () => alert('Navigation clicked - check which provider is active!')
      },
    ],
    activeItemId: 'test-child-1',
  },
};

