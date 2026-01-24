import type { Meta, StoryObj } from '@storybook/react';
import { PageRenderer } from '../../src/renderer/renderPage';
import type { PageConfig } from '../../src/schema';

// Import JSON examples
import dashboardConfig from '../../pages/examples/dashboard.json';
import listDetailConfig from '../../pages/examples/list-detail.json';
import settingsConfig from '../../pages/examples/settings.json';

/**
 * PageRenderer
 * 
 * Renders complete pages from JSON configurations.
 * Demonstrates the full JSON-driven UI architecture.
 * 
 * **Provider Support:**
 * The PageRenderer automatically uses the current provider from the toolbar.
 * All components (templates, composites, atomics) adapt to the selected provider.
 * 
 * **Features:**
 * - Complete page rendering from JSON
 * - Template-based layouts (DashboardLayout, TwoColumnLayout, TabsLayout)
 * - Composite components (SearchGrid, Header, Sidebar)
 * - Atomic components (Card, Text, Button, etc.)
 * - Provider switching (MUI / Internal)
 * - Error handling and validation
 * - Suspense for async adapter loading
 * 
 * **JSON Structure:**
 * ```json
 * {
 *   "version": "1.0.0",
 *   "title": "Page Title",
 *   "description": "Page description",
 *   "template": {
 *     "type": "DashboardLayout",
 *     "props": { ... },
 *     "slots": {
 *       "header": { "type": "HeaderComposite", "props": { ... } },
 *       "sidebar": { "type": "SidebarComposite", "props": { ... } },
 *       "main": { "type": "SearchGridComposite", "props": { ... } }
 *     }
 *   }
 * }
 * ```
 */

const meta = {
  title: 'Pages/PageRenderer',
  component: PageRenderer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Renders complete pages from JSON configurations using the JSON-driven UI system.

### How It Works
1. Load JSON page configuration
2. Validate against schema (Zod validation)
3. Resolve template adapter based on provider (MUI / Internal)
4. Render template with composite and atomic components
5. All components adapt to the selected provider

### Provider Switching
Use the **UI Provider** toolbar to switch between implementations:
- **MUI**: Uses Material-UI components throughout
- **Internal**: Uses custom internal components (or fallback to MUI)

### JSON Pages
The example JSON pages demonstrate:
- **dashboard.json**: DashboardLayout with sidebar and data grid
- **list-detail.json**: TwoColumnLayout for master-detail views
- **settings.json**: TabsLayout for multi-section forms

### Architecture Benefits
- **No Hard-Coded UI**: Everything driven by JSON configuration
- **Provider Flexibility**: Switch UI libraries without code changes
- **Validation**: Runtime schema validation catches errors early
- **Type Safety**: Full TypeScript type inference from JSON
- **Component Reuse**: Composites combine atomics into higher-level patterns
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    config: {
      control: 'object',
      description: 'Page configuration (JSON or object)',
    },
  },
} satisfies Meta<typeof PageRenderer>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Dashboard page with sidebar and data grid.
 * 
 * **Features:**
 * - DashboardLayout template
 * - HeaderComposite with breadcrumbs
 * - SidebarComposite with navigation
 * - SearchGridComposite with employee data
 */
export const Dashboard: Story = {
  args: {
    config: dashboardConfig as PageConfig,
  },
};

/**
 * List-detail view with master-detail layout.
 * 
 * **Features:**
 * - TwoColumnLayout template (30/70 split)
 * - HeaderComposite with back button and actions
 * - SearchGridComposite in left column (list)
 * - Card component in right column (detail)
 * - Single selection mode
 */
export const ListDetail: Story = {
  args: {
    config: listDetailConfig as PageConfig,
  },
};

/**
 * Settings page with tabbed navigation.
 * 
 * **Features:**
 * - TabsLayout template
 * - HeaderComposite with breadcrumbs
 * - Multiple tab panels (Profile, Account, Notifications, Security)
 * - Card components for each tab
 */
export const Settings: Story = {
  args: {
    config: settingsConfig as PageConfig,
  },
};

/**
 * Minimal page configuration.
 */
export const Minimal: Story = {
  args: {
    config: {
      version: '1.0.0',
      title: 'Minimal Page',
      description: 'A minimal page with just a header',
      template: {
        type: 'DashboardLayout',
        props: {
          sidebarVisible: false,
        },
        slots: {
          header: {
            type: 'HeaderComposite',
            props: {
              title: 'Minimal Page',
              subtitle: 'This page has just a header and main content area.',
            },
          },
          main: {
            type: 'Card',
            props: {
              title: 'Welcome',
              padding: 'lg',
            },
            children: [
              {
                type: 'Text',
                props: {
                  children: 'This is a minimal page configuration with just a header and a card.',
                },
              },
            ],
          },
        },
      },
    } as PageConfig,
  },
};

/**
 * Complex page with nested components.
 */
export const Complex: Story = {
  args: {
    config: {
      version: '1.0.0',
      title: 'Complex Page',
      description: 'A complex page demonstrating nested components',
      template: {
        type: 'DashboardLayout',
        props: {
          sidebarWidth: 320,
          sidebarVisible: true,
        },
        slots: {
          header: {
            type: 'HeaderComposite',
            props: {
              title: 'Project Management',
              subtitle: 'Manage your projects and team',
              breadcrumbs: [
                { label: 'Home', href: '/' },
                { label: 'Projects', href: '/projects' },
                { label: 'Project Alpha', href: '/projects/1' },
              ],
              showBackButton: true,
              actions: [
                { id: 'save', label: 'Save', variant: 'primary' },
                { id: 'delete', label: 'Delete', variant: 'danger' },
              ],
            },
          },
          sidebar: {
            type: 'SidebarComposite',
            props: {
              items: [
                { id: 'overview', label: 'Overview', icon: '📊', href: '/projects/1' },
                { 
                  id: 'tasks', 
                  label: 'Tasks', 
                  icon: '✅',
                  badge: { label: '5', variant: 'warning' },
                  children: [
                    { id: 'tasks-active', label: 'Active', href: '/projects/1/tasks/active' },
                    { id: 'tasks-completed', label: 'Completed', href: '/projects/1/tasks/completed' },
                  ]
                },
                { id: 'team', label: 'Team', icon: '👥', href: '/projects/1/team' },
                { id: 'files', label: 'Files', icon: '📁', badge: { label: '12', variant: 'info' }, href: '/projects/1/files' },
                { id: 'settings', label: 'Settings', icon: '⚙️', href: '/projects/1/settings' },
              ],
              activeItemId: 'tasks-active',
            },
          },
          main: {
            type: 'SearchGridComposite',
            props: {
              dataSource: 'tasks',
              columns: [
                { id: 'title', label: 'Task', field: 'title', sortable: true },
                { id: 'assignee', label: 'Assignee', field: 'assignee' },
                { id: 'status', label: 'Status', field: 'status', sortable: true },
                { id: 'priority', label: 'Priority', field: 'priority', sortable: true },
                { id: 'dueDate', label: 'Due Date', field: 'dueDate', sortable: true },
              ],
              data: [
                { id: 1, title: 'Implement login', assignee: 'John Doe', status: 'In Progress', priority: 'High', dueDate: '2024-02-15' },
                { id: 2, title: 'Design dashboard', assignee: 'Jane Smith', status: 'In Progress', priority: 'High', dueDate: '2024-02-16' },
                { id: 3, title: 'Write documentation', assignee: 'Bob Johnson', status: 'Not Started', priority: 'Medium', dueDate: '2024-02-20' },
                { id: 4, title: 'Setup CI/CD', assignee: 'Alice Williams', status: 'Not Started', priority: 'Low', dueDate: '2024-02-22' },
                { id: 5, title: 'Code review', assignee: 'Charlie Brown', status: 'Completed', priority: 'Medium', dueDate: '2024-02-10' },
              ],
              filters: [
                {
                  id: 'status',
                  label: 'Status',
                  type: 'select',
                  field: 'status',
                  options: [
                    { label: 'In Progress', value: 'In Progress' },
                    { label: 'Not Started', value: 'Not Started' },
                    { label: 'Completed', value: 'Completed' },
                  ],
                },
                {
                  id: 'priority',
                  label: 'Priority',
                  type: 'select',
                  field: 'priority',
                  options: [
                    { label: 'High', value: 'High' },
                    { label: 'Medium', value: 'Medium' },
                    { label: 'Low', value: 'Low' },
                  ],
                },
              ],
              searchEnabled: true,
              searchPlaceholder: 'Search tasks...',
              selectionMode: 'multiple',
              rowActions: [
                { id: 'edit', label: 'Edit', variant: 'primary' },
                { id: 'delete', label: 'Delete', variant: 'danger' },
              ],
              toolbarActions: [
                { id: 'add', label: 'Add Task', variant: 'primary' },
                { id: 'export', label: 'Export', variant: 'secondary' },
              ],
              defaultPageSize: 5,
              pageSizeOptions: [5, 10, 25],
            },
          },
          footer: {
            type: 'Text',
            props: {
              children: '© 2024 Project Management System',
              size: 'sm',
              color: 'secondary',
            },
          },
        },
      },
    } as PageConfig,
  },
};

/**
 * Error handling - invalid template type.
 */
export const InvalidTemplate: Story = {
  args: {
    config: {
      version: '1.0.0',
      title: 'Invalid Template',
      description: 'This will show an error',
      template: {
        type: 'NonExistentTemplate' as any,
        props: {},
        slots: {},
      },
    } as PageConfig,
  },
};

/**
 * Error handling - invalid component type.
 */
export const InvalidComponent: Story = {
  args: {
    config: {
      version: '1.0.0',
      title: 'Invalid Component',
      description: 'This will show an error',
      template: {
        type: 'DashboardLayout',
        props: {
          sidebarVisible: false,
        },
        slots: {
          main: {
            type: 'NonExistentComponent' as any,
            props: {},
          },
        },
      },
    } as PageConfig,
  },
};
