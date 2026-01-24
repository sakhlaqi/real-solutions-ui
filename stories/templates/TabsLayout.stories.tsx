import type { Meta, StoryObj } from '@storybook/react';
import React, { Suspense } from 'react';
import { useRenderContext } from '../../src/renderer/RenderContext';
import { resolveTemplateAdapter } from '../../src/adapters';
import type { TabsLayoutProps } from '../../src/core/templates/TabsLayout/types';

/**
 * TabsLayout Template
 * 
 * A layout with tabbed navigation and content panels.
 * Manages tab switching internally while accepting tab content as slots.
 * 
 * **Provider Support:**
 * - **MUI**: Uses Material-UI Tabs and Tab components
 * - **Internal**: Falls back to MUI implementation
 * 
 * **Slots:**
 * - `header`: Optional header spanning full width
 * - `tabs`: Object with tab keys and their content
 * - `footer`: Optional footer spanning full width
 */

const TabsLayoutWrapper = (props: TabsLayoutProps) => {
  const context = useRenderContext();
  const provider = context.provider || 'mui';

  const LayoutAdapter = React.lazy(async () => {
    const adapter = await resolveTemplateAdapter('TabsLayout', provider);
    if (!adapter) {
      throw new Error(`TabsLayout adapter not found for provider: ${provider}`);
    }
    return { default: adapter };
  });

  return (
    <Suspense fallback={<div>Loading TabsLayout...</div>}>
      <LayoutAdapter {...props} />
    </Suspense>
  );
};

const meta = {
  title: 'Templates/TabsLayout',
  component: TabsLayoutWrapper,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A tabbed layout template with automatic tab panel management.

### Features
- Automatic tab navigation
- Controlled or uncontrolled mode
- Custom tab labels
- Optional header and footer slots
- ARIA-compliant

### Adapter Behavior
Use the **UI Provider** toolbar to switch between implementations:
- **MUI**: Material-UI Tabs component
- **Internal**: Fallback to MUI (can be customized)
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    activeTab: {
      control: 'text',
      description: 'Currently active tab key (controlled mode)',
    },
    tabLabels: {
      control: 'object',
      description: 'Custom labels for tabs',
    },
    onTabChange: {
      description: 'Callback when tab changes',
      action: 'tab changed',
    },
    slots: {
      description: 'Content for each slot (header, tabs object, footer)',
      control: false,
    },
  },
} satisfies Meta<typeof TabsLayoutWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample content
const SampleHeader = () => (
  <div style={{ padding: '16px', backgroundColor: '#f5f5f5', borderBottom: '1px solid #ddd' }}>
    <h2 style={{ margin: 0 }}>Tabbed Interface</h2>
  </div>
);

const OverviewContent = () => (
  <div>
    <h2>Overview</h2>
    <p>This is the overview tab content.</p>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '24px' }}>
      {[1, 2, 3].map((i) => (
        <div key={i} style={{ padding: '16px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
          <h4>Metric {i}</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{i * 100}</p>
        </div>
      ))}
    </div>
  </div>
);

const DetailsContent = () => (
  <div>
    <h2>Details</h2>
    <p>Detailed information and settings.</p>
    <div style={{ marginTop: '24px' }}>
      <h3>Configuration</h3>
      <ul>
        <li>Setting 1: Enabled</li>
        <li>Setting 2: Disabled</li>
        <li>Setting 3: Auto</li>
      </ul>
    </div>
  </div>
);

const HistoryContent = () => (
  <div>
    <h2>History</h2>
    <p>Activity and change history.</p>
    <div style={{ marginTop: '24px' }}>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} style={{ padding: '12px', borderBottom: '1px solid #eee' }}>
          <strong>Activity {i}</strong>
          <p style={{ margin: '4px 0', color: '#666' }}>2 hours ago</p>
        </div>
      ))}
    </div>
  </div>
);

const SettingsContent = () => (
  <div>
    <h2>Settings</h2>
    <p>Application settings and preferences.</p>
    <div style={{ marginTop: '24px' }}>
      <label style={{ display: 'block', marginBottom: '16px' }}>
        <input type="checkbox" /> Enable notifications
      </label>
      <label style={{ display: 'block', marginBottom: '16px' }}>
        <input type="checkbox" /> Dark mode
      </label>
      <label style={{ display: 'block', marginBottom: '16px' }}>
        <input type="checkbox" /> Auto-save
      </label>
    </div>
  </div>
);

const SampleFooter = () => (
  <div style={{ padding: '16px', backgroundColor: '#f5f5f5', borderTop: '1px solid #ddd', textAlign: 'center' }}>
    <button style={{ marginRight: '8px' }}>Cancel</button>
    <button style={{ backgroundColor: '#1976d2', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px' }}>
      Save
    </button>
  </div>
);

/**
 * Basic tabs layout with three tabs.
 */
export const Basic: Story = {
  args: {
    slots: {
      tabs: {
        overview: <OverviewContent />,
        details: <DetailsContent />,
        history: <HistoryContent />,
      },
    },
    tabLabels: {
      overview: 'Overview',
      details: 'Details',
      history: 'History',
    },
  },
};

/**
 * Complete tabs layout with header and footer.
 */
export const Complete: Story = {
  args: {
    slots: {
      header: <SampleHeader />,
      tabs: {
        overview: <OverviewContent />,
        details: <DetailsContent />,
        history: <HistoryContent />,
        settings: <SettingsContent />,
      },
      footer: <SampleFooter />,
    },
    tabLabels: {
      overview: 'Overview',
      details: 'Details',
      history: 'History',
      settings: 'Settings',
    },
  },
};

/**
 * Two tabs only - minimal configuration.
 */
export const TwoTabs: Story = {
  args: {
    slots: {
      tabs: {
        content: <OverviewContent />,
        settings: <SettingsContent />,
      },
    },
    tabLabels: {
      content: 'Content',
      settings: 'Settings',
    },
  },
};

/**
 * Controlled mode with specific active tab.
 */
export const ControlledMode: Story = {
  args: {
    slots: {
      tabs: {
        overview: <OverviewContent />,
        details: <DetailsContent />,
        history: <HistoryContent />,
      },
    },
    tabLabels: {
      overview: 'Overview',
      details: 'Details',
      history: 'History',
    },
    activeTab: 'details',
  },
};

/**
 * Many tabs - demonstrates horizontal scrolling.
 */
export const ManyTabs: Story = {
  args: {
    slots: {
      tabs: {
        tab1: <div><h2>Tab 1</h2><p>Content for tab 1</p></div>,
        tab2: <div><h2>Tab 2</h2><p>Content for tab 2</p></div>,
        tab3: <div><h2>Tab 3</h2><p>Content for tab 3</p></div>,
        tab4: <div><h2>Tab 4</h2><p>Content for tab 4</p></div>,
        tab5: <div><h2>Tab 5</h2><p>Content for tab 5</p></div>,
        tab6: <div><h2>Tab 6</h2><p>Content for tab 6</p></div>,
      },
    },
    tabLabels: {
      tab1: 'Tab 1',
      tab2: 'Tab 2',
      tab3: 'Tab 3',
      tab4: 'Tab 4',
      tab5: 'Tab 5',
      tab6: 'Tab 6',
    },
  },
};
