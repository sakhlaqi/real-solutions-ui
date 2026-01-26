import type { Meta, StoryObj } from '@storybook/react';
import { PageRenderer } from '../../src/renderer/renderPage';
import type { PageConfig } from '../../src/schema/pageSchema';

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
    actions: { argTypesRegex: '^on.*' },
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
  args: {
    onRenderComplete: (result) => console.log('Render complete:', result),
    onAdapterWarning: (warning) => console.log('Adapter warning:', warning),
  },
  argTypes: {
    config: {
      control: 'object',
      description: 'Page configuration (JSON or object)',
    },
    onRenderComplete: {
      description: 'Callback when rendering completes',
    },
    onAdapterWarning: {
      description: 'Callback when adapter warnings occur',
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
// Temporarily disabled due to JSON import issues
// export const Dashboard: Story = {
//   args: {
//     config: dashboardConfig as PageConfig,
//   },
// };

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
// Temporarily disabled due to JSON import issues
// export const ListDetail: Story = {
//   args: {
//     config: listDetailConfig as PageConfig,
//   },
// };

/**
 * Settings page with tabbed navigation.
 * 
 * **Features:**
 * - TabsLayout template
 * - HeaderComposite with breadcrumbs
 * - Multiple tab panels (Profile, Account, Notifications, Security)
 * - Card components for each tab
 */
// Temporarily disabled due to JSON import issues
// export const Settings: Story = {
//   args: {
//     config: settingsConfig as PageConfig,
//   },
// };

/**
 * Minimal page configuration.
 */
export const Minimal: Story = {
  args: {
    config: {
      meta: {
        title: 'Minimal Page',
        description: 'A minimal page with just a header',
      },
      template: 'DashboardLayout',
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
    } as PageConfig,
  },
};

/**
 * Complex page with nested components.
 */
export const Complex: Story = {
  args: {
    config: {
      meta: {
        title: 'Complex Page',
        description: 'A complex page demonstrating nested components',
      },
      template: 'DashboardLayout',
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
          type: 'Card',
          props: {
            title: 'Active Tasks',
            padding: 'lg',
          },
          children: [
            {
              type: 'Text',
              props: {
                children: 'This is a complex page with a header, sidebar, and main content area.',
              },
            },
            {
              type: 'Text',
              props: {
                children: 'In a real application, this would contain a data grid or other complex component.',
                size: 'sm',
                color: 'secondary',
              },
            },
          ],
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
    } as PageConfig,
  },
};

/**
 * Error handling - invalid template type.
 */
export const InvalidTemplate: Story = {
  args: {
    config: {
      meta: {
        title: 'Invalid Template',
        description: 'This will show an error',
      },
      template: 'NonExistentTemplate' as any,
      slots: {},
    } as PageConfig,
  },
};

/**
 * Error handling - invalid component type.
 */
export const InvalidComponent: Story = {
  args: {
    config: {
      meta: {
        title: 'Invalid Component',
        description: 'This will show an error',
      },
      template: 'DashboardLayout',
      slots: {
        main: {
          type: 'NonExistentComponent' as any,
          props: {},
        },
      },
    } as PageConfig,
  },
};
