import type { Meta, StoryObj } from '@storybook/react';
import React, { Suspense } from 'react';
import { useRenderContext } from '../../src/renderer/RenderContext';
import { resolveTemplateAdapter } from '../../src/adapters';
import type { TwoColumnLayoutProps } from '../../src/core/templates/TwoColumnLayout/types';

/**
 * TwoColumnLayout Template
 * 
 * A responsive two-column layout with optional header and footer.
 * Ideal for master-detail views, form layouts, or content with sidebar.
 * 
 * **Provider Support:**
 * - **MUI**: Uses Material-UI Box components with flex layout
 * - **Internal**: Falls back to MUI implementation
 * 
 * **Slots:**
 * - `header`: Optional header spanning full width
 * - `left`: Required left column content
 * - `right`: Required right column content
 * - `footer`: Optional footer spanning full width
 */

const TwoColumnLayoutWrapper = (props: TwoColumnLayoutProps) => {
  const context = useRenderContext();
  const provider = context.provider || 'mui';

  const LayoutAdapter = React.lazy(async () => {
    const adapter = await resolveTemplateAdapter('TwoColumnLayout', provider);
    if (!adapter) {
      throw new Error(`TwoColumnLayout adapter not found for provider: ${provider}`);
    }
    return { default: adapter };
  });

  return (
    <Suspense fallback={<div>Loading TwoColumnLayout...</div>}>
      <LayoutAdapter {...props} />
    </Suspense>
  );
};

const meta = {
  title: 'Templates/TwoColumnLayout',
  component: TwoColumnLayoutWrapper,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A flexible two-column layout template with configurable column widths.

### Features
- Configurable column width ratio (leftWidth: 0-1)
- Customizable gap between columns
- Optional header and footer slots
- Responsive design

### Adapter Behavior
Use the **UI Provider** toolbar to switch between implementations:
- **MUI**: Material-UI Box with flex layout
- **Internal**: Fallback to MUI (can be customized)
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    leftWidth: {
      control: { type: 'range', min: 0.2, max: 0.8, step: 0.1 },
      description: 'Width ratio of left column (0-1)',
      table: {
        defaultValue: { summary: '0.5' },
      },
    },
    gap: {
      control: { type: 'range', min: 0, max: 48, step: 4 },
      description: 'Gap between columns in pixels',
      table: {
        defaultValue: { summary: '16' },
      },
    },
    slots: {
      description: 'Content for each slot (header, left, right, footer)',
      control: false,
    },
  },
} satisfies Meta<typeof TwoColumnLayoutWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample content
const SampleHeader = () => (
  <div style={{ padding: '16px', backgroundColor: '#f5f5f5', borderBottom: '1px solid #ddd' }}>
    <h2 style={{ margin: 0 }}>Two Column Layout</h2>
  </div>
);

const SampleLeftColumn = () => (
  <div style={{ padding: '24px', height: '100%' }}>
    <h3>Left Column</h3>
    <p>This is the left column content.</p>
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
  </div>
);

const SampleRightColumn = () => (
  <div style={{ padding: '24px', height: '100%' }}>
    <h3>Right Column</h3>
    <p>This is the right column content.</p>
    <div style={{ backgroundColor: '#f9f9f9', padding: '16px', borderRadius: '8px', marginTop: '16px' }}>
      <h4>Details Panel</h4>
      <p>Detailed information goes here.</p>
    </div>
  </div>
);

const SampleFooter = () => (
  <div style={{ padding: '16px', backgroundColor: '#f5f5f5', borderTop: '1px solid #ddd', textAlign: 'center' }}>
    Footer Content
  </div>
);

/**
 * Basic two-column layout with equal widths.
 */
export const Equal: Story = {
  args: {
    slots: {
      left: <SampleLeftColumn />,
      right: <SampleRightColumn />,
    },
    leftWidth: 0.5,
    gap: 16,
  },
};

/**
 * Complete layout with header and footer.
 */
export const Complete: Story = {
  args: {
    slots: {
      header: <SampleHeader />,
      left: <SampleLeftColumn />,
      right: <SampleRightColumn />,
      footer: <SampleFooter />,
    },
    leftWidth: 0.5,
    gap: 16,
  },
};

/**
 * Master-detail view with narrow left column (30%).
 * Common for list/detail interfaces.
 */
export const MasterDetail: Story = {
  args: {
    slots: {
      header: <SampleHeader />,
      left: <SampleLeftColumn />,
      right: <SampleRightColumn />,
    },
    leftWidth: 0.3,
    gap: 24,
  },
};

/**
 * Content with sidebar - wide left column (70%).
 * Useful for main content with side panel.
 */
export const ContentWithSidebar: Story = {
  args: {
    slots: {
      left: <SampleLeftColumn />,
      right: <SampleRightColumn />,
    },
    leftWidth: 0.7,
    gap: 32,
  },
};

/**
 * No gap between columns.
 */
export const NoGap: Story = {
  args: {
    slots: {
      left: <SampleLeftColumn />,
      right: <SampleRightColumn />,
    },
    leftWidth: 0.5,
    gap: 0,
  },
};

/**
 * Large gap between columns.
 */
export const LargeGap: Story = {
  args: {
    slots: {
      left: <SampleLeftColumn />,
      right: <SampleRightColumn />,
    },
    leftWidth: 0.5,
    gap: 48,
  },
};
