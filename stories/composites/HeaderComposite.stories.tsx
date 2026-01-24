import type { Meta, StoryObj } from '@storybook/react';
import React, { Suspense } from 'react';
import { useRenderContext } from '../../src/renderer/RenderContext';
import { resolveComponentAdapter } from '../../src/adapters';
import type { HeaderCompositeProps } from '../../src/core/composites/Header/types';

/**
 * HeaderComposite
 * 
 * A page header component with breadcrumbs, title, and action buttons.
 * Provides consistent navigation and contextual actions across pages.
 * 
 * **Provider Support:**
 * - **MUI**: Uses Material-UI Breadcrumbs, Typography, and Button components
 * - **Internal**: Falls back to MUI implementation
 * 
 * **Features:**
 * - Breadcrumb navigation with separators
 * - Page title and subtitle
 * - Primary and secondary actions
 * - Back button
 * - Icon support
 * - Responsive layout
 */

const HeaderWrapper = (props: HeaderCompositeProps) => {
  const context = useRenderContext();
  const provider = context.provider || 'mui';

  const HeaderAdapter = React.lazy(async () => {
    const adapter = await resolveComponentAdapter('HeaderComposite', provider);
    if (!adapter) {
      throw new Error(`HeaderComposite adapter not found for provider: ${provider}`);
    }
    return { default: adapter };
  });

  return (
    <Suspense fallback={<div>Loading Header...</div>}>
      <HeaderAdapter {...props} />
    </Suspense>
  );
};

const meta = {
  title: 'Composites/HeaderComposite',
  component: HeaderWrapper,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A versatile page header component with breadcrumb navigation, title, and actions.

### Adapter Behavior
Use the **UI Provider** toolbar to switch between implementations:
- **MUI**: Material-UI components with theme integration
- **Internal**: Fallback to MUI (can be customized)

### Common Use Cases
- Page headers with navigation context
- Action-heavy pages (create, edit, delete)
- Multi-level navigation breadcrumbs
- Back navigation for detail views
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Main page title',
    },
    subtitle: {
      control: 'text',
      description: 'Optional subtitle or description',
    },
    showBackButton: {
      control: 'boolean',
      description: 'Show back navigation button',
    },
  },
} satisfies Meta<typeof HeaderWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic header with just a title.
 */
export const Basic: Story = {
  args: {
    title: 'Page Title',
  },
};

/**
 * Complete header with all features.
 */
export const Complete: Story = {
  args: {
    title: 'Employee Details',
    subtitle: 'View and manage employee information',
    breadcrumbs: [
      { label: 'Home', href: '#' },
      { label: 'Employees', href: '#/employees' },
      { label: 'John Doe', href: '#/employees/1' },
    ],
    showBackButton: true,
    actions: [
      { id: 'save', label: 'Save', variant: 'primary' },
      { id: 'cancel', label: 'Cancel', variant: 'secondary' },
    ],
  },
};

/**
 * Header with breadcrumbs only (no actions).
 */
export const WithBreadcrumbs: Story = {
  args: {
    title: 'Dashboard',
    breadcrumbs: [
      { label: 'Home', href: '#' },
      { label: 'Analytics', href: '#/analytics' },
      { label: 'Dashboard', href: '#/analytics/dashboard' },
    ],
  },
};

/**
 * Header with actions only (no breadcrumbs).
 */
export const WithActions: Story = {
  args: {
    title: 'Users',
    subtitle: 'Manage user accounts and permissions',
    actions: [
      { id: 'add', label: 'Add User', variant: 'primary' },
      { id: 'import', label: 'Import', variant: 'secondary' },
      { id: 'export', label: 'Export', variant: 'secondary' },
    ],
  },
};

/**
 * Header with back button for detail/edit views.
 */
export const WithBackButton: Story = {
  args: {
    title: 'Edit Profile',
    subtitle: 'Update your account information',
    showBackButton: true,
    actions: [
      { id: 'save', label: 'Save Changes', variant: 'primary' },
      { id: 'cancel', label: 'Cancel', variant: 'secondary' },
    ],
  },
};

/**
 * Header with single primary action.
 */
export const SingleAction: Story = {
  args: {
    title: 'Products',
    subtitle: '125 products in catalog',
    actions: [
      { id: 'create', label: 'Create Product', variant: 'primary' },
    ],
  },
};

/**
 * Header with subtitle and icon.
 */
export const WithSubtitle: Story = {
  args: {
    title: 'Settings',
    subtitle: 'Customize your workspace preferences',
    breadcrumbs: [
      { label: 'Home', href: '#' },
      { label: 'Settings', href: '#/settings' },
    ],
  },
};

/**
 * Deep navigation with many breadcrumb levels.
 */
export const DeepNavigation: Story = {
  args: {
    title: 'Q4 Financial Report',
    breadcrumbs: [
      { label: 'Home', href: '#' },
      { label: 'Reports', href: '#/reports' },
      { label: 'Financial', href: '#/reports/financial' },
      { label: '2024', href: '#/reports/financial/2024' },
      { label: 'Q4', href: '#/reports/financial/2024/q4' },
    ],
    showBackButton: true,
    actions: [
      { id: 'download', label: 'Download PDF', variant: 'secondary' },
      { id: 'share', label: 'Share', variant: 'secondary' },
    ],
  },
};

/**
 * Header with multiple action variants.
 */
export const MultipleActions: Story = {
  args: {
    title: 'Project Overview',
    subtitle: 'Website Redesign 2024',
    breadcrumbs: [
      { label: 'Projects', href: '#/projects' },
      { label: 'Website Redesign', href: '#/projects/123' },
    ],
    actions: [
      { id: 'edit', label: 'Edit', variant: 'primary' },
      { id: 'duplicate', label: 'Duplicate', variant: 'secondary' },
      { id: 'archive', label: 'Archive', variant: 'secondary' },
      { id: 'delete', label: 'Delete', variant: 'danger' },
    ],
  },
};

/**
 * Minimal header for clean interfaces.
 */
export const Minimal: Story = {
  args: {
    title: 'Dashboard',
  },
};

/**
 * Header for create/edit forms.
 */
export const FormHeader: Story = {
  args: {
    title: 'Create New Employee',
    breadcrumbs: [
      { label: 'Employees', href: '#/employees' },
      { label: 'New', href: '#/employees/new' },
    ],
    showBackButton: true,
    actions: [
      { id: 'save', label: 'Save', variant: 'primary' },
      { id: 'save-continue', label: 'Save & Continue', variant: 'secondary' },
      { id: 'cancel', label: 'Cancel', variant: 'secondary' },
    ],
  },
};

/**
 * Header with long title and subtitle.
 */
export const LongContent: Story = {
  args: {
    title: 'Annual Performance Review and Development Planning Session',
    subtitle: 'Comprehensive evaluation of employee performance, goal achievement, and future development opportunities for the fiscal year 2024',
    breadcrumbs: [
      { label: 'HR', href: '#/hr' },
      { label: 'Performance', href: '#/hr/performance' },
      { label: 'Reviews', href: '#/hr/performance/reviews' },
    ],
    showBackButton: true,
    actions: [
      { id: 'save', label: 'Save Review', variant: 'primary' },
    ],
  },
};
