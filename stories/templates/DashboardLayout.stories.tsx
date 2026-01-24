import type { Meta, StoryObj } from '@storybook/react';
import React, { Suspense } from 'react';
import { useRenderContext } from '../../src/renderer/RenderContext';
import { resolveTemplateAdapter } from '../../src/adapters';
import type { DashboardLayoutProps } from '../../src/core/templates/DashboardLayout/types';

/**
 * DashboardLayout Template
 * 
 * A flexible dashboard layout with header, sidebar, main content, and footer slots.
 * Supports provider-based adapter resolution (MUI or Internal).
 * 
 * **Provider Support:**
 * - **MUI**: Uses Material-UI Box components with flex layout
 * - **Internal**: Falls back to MUI implementation
 * 
 * **Slots:**
 * - `header`: Optional header content (typically HeaderComposite)
 * - `sidebar`: Optional sidebar content (typically SidebarComposite)
 * - `main`: Required main content area
 * - `footer`: Optional footer content
 */

// Wrapper component to handle async adapter resolution
const DashboardLayoutWrapper = (props: DashboardLayoutProps) => {
  const context = useRenderContext();
  const provider = context.provider || 'mui';

  const LayoutAdapter = React.lazy(async () => {
    const adapter = await resolveTemplateAdapter('DashboardLayout', provider);
    if (!adapter) {
      throw new Error(`DashboardLayout adapter not found for provider: ${provider}`);
    }
    return { default: adapter };
  });

  return (
    <Suspense fallback={<div>Loading DashboardLayout...</div>}>
      <LayoutAdapter {...props} />
    </Suspense>
  );
};

const meta = {
  title: 'Templates/DashboardLayout',
  component: DashboardLayoutWrapper,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A flexible dashboard layout template with configurable sidebar and multiple content slots.

### Features
- Collapsible sidebar with configurable width
- Header, sidebar, main, and footer slots
- Responsive flex layout
- Provider-agnostic implementation

### Adapter Behavior
Use the **UI Provider** toolbar to switch between implementations:
- **MUI**: Material-UI Box components
- **Internal**: Fallback to MUI (can be customized)
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    sidebarVisible: {
      control: 'boolean',
      description: 'Whether the sidebar is visible',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    sidebarWidth: {
      control: { type: 'range', min: 200, max: 400, step: 20 },
      description: 'Width of the sidebar in pixels',
      table: {
        defaultValue: { summary: '280' },
      },
    },
    slots: {
      description: 'Content for each slot (header, sidebar, main, footer)',
      control: false,
    },
  },
} satisfies Meta<typeof DashboardLayoutWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample content components
const SampleHeader = () => (
  <div style={{ padding: '16px', backgroundColor: '#f5f5f5', borderBottom: '1px solid #ddd' }}>
    <h2 style={{ margin: 0 }}>Dashboard Header</h2>
  </div>
);

const SampleSidebar = () => (
  <div style={{ padding: '16px' }}>
    <h3>Navigation</h3>
    <ul style={{ listStyle: 'none', padding: 0 }}>
      <li style={{ padding: '8px 0' }}>📊 Dashboard</li>
      <li style={{ padding: '8px 0' }}>👥 Users</li>
      <li style={{ padding: '8px 0' }}>⚙️ Settings</li>
    </ul>
  </div>
);

const SampleMain = () => (
  <div style={{ padding: '24px' }}>
    <h1>Main Content</h1>
    <p>This is the main content area of the dashboard.</p>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '24px' }}>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} style={{ padding: '24px', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px solid #eee' }}>
          <h3>Card {i}</h3>
          <p>Sample content</p>
        </div>
      ))}
    </div>
  </div>
);

const SampleFooter = () => (
  <div style={{ padding: '16px', backgroundColor: '#f5f5f5', borderTop: '1px solid #ddd', textAlign: 'center' }}>
    © 2026 Dashboard Application
  </div>
);

/**
 * Empty layout with no content in slots.
 * Useful for understanding the basic structure.
 */
export const Empty: Story = {
  args: {
    slots: {
      main: <div style={{ padding: '24px' }}>Empty main content</div>,
    },
    sidebarVisible: true,
    sidebarWidth: 280,
  },
};

/**
 * Complete dashboard with all slots populated.
 * Shows the typical dashboard layout structure.
 */
export const Complete: Story = {
  args: {
    slots: {
      header: <SampleHeader />,
      sidebar: <SampleSidebar />,
      main: <SampleMain />,
      footer: <SampleFooter />,
    },
    sidebarVisible: true,
    sidebarWidth: 280,
  },
};

/**
 * Dashboard without sidebar.
 * Useful for full-width content layouts.
 */
export const NoSidebar: Story = {
  args: {
    slots: {
      header: <SampleHeader />,
      main: <SampleMain />,
      footer: <SampleFooter />,
    },
    sidebarVisible: false,
    sidebarWidth: 280,
  },
};

/**
 * Dashboard with narrow sidebar.
 * Demonstrates sidebar width customization.
 */
export const NarrowSidebar: Story = {
  args: {
    slots: {
      header: <SampleHeader />,
      sidebar: <SampleSidebar />,
      main: <SampleMain />,
    },
    sidebarVisible: true,
    sidebarWidth: 200,
  },
};

/**
 * Dashboard with wide sidebar.
 * Shows maximum sidebar width.
 */
export const WideSidebar: Story = {
  args: {
    slots: {
      header: <SampleHeader />,
      sidebar: <SampleSidebar />,
      main: <SampleMain />,
    },
    sidebarVisible: true,
    sidebarWidth: 400,
  },
};

/**
 * Minimal dashboard with just main content.
 * No header, sidebar, or footer.
 */
export const MainOnly: Story = {
  args: {
    slots: {
      main: <SampleMain />,
    },
    sidebarVisible: false,
  },
};
