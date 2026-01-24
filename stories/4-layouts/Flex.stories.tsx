import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from '../../src/adapters/Flex';

/**
 * Flex component for creating flexible layouts with CSS flexbox.
 * 
 * ## Features
 * - Row or column direction
 * - Alignment options (justify, align)
 * - Gap spacing
 * - Wrapping support
 */
const meta = {
  title: 'Layout/Flex',
  component: Flex,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'column'],
      description: 'Flex direction',
    },
    justify: {
      control: 'select',
      options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'],
      description: 'Justify content',
    },
    align: {
      control: 'select',
      options: ['flex-start', 'center', 'flex-end', 'stretch'],
      description: 'Align items',
    },
    gap: {
      control: 'number',
      description: 'Gap between items',
    },
    wrap: {
      control: 'boolean',
      description: 'Whether items should wrap',
    },
  },
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default flex row
 */
export const Default: Story = {
  args: {
    direction: 'row',
    gap: 16,
    children: (
      <>
        <div style={{ padding: '16px', background: '#e3f2fd', borderRadius: '4px' }}>Item 1</div>
        <div style={{ padding: '16px', background: '#e8f5e9', borderRadius: '4px' }}>Item 2</div>
        <div style={{ padding: '16px', background: '#fff3e0', borderRadius: '4px' }}>Item 3</div>
      </>
    ),
  },
};

/**
 * Column direction
 */
export const Column: Story = {
  args: {
    direction: 'column',
    gap: 16,
    children: (
      <>
        <div style={{ padding: '16px', background: '#e3f2fd', borderRadius: '4px' }}>Item 1</div>
        <div style={{ padding: '16px', background: '#e8f5e9', borderRadius: '4px' }}>Item 2</div>
        <div style={{ padding: '16px', background: '#fff3e0', borderRadius: '4px' }}>Item 3</div>
      </>
    ),
  },
};

/**
 * Centered content
 */
export const Centered: Story = {
  args: {
    direction: 'row',
    justify: 'center',
    align: 'center',
    gap: 16,
    style: { minHeight: '200px', background: '#f5f5f5', borderRadius: '8px' },
    children: (
      <>
        <div style={{ padding: '16px', background: '#e3f2fd', borderRadius: '4px' }}>Centered</div>
        <div style={{ padding: '16px', background: '#e8f5e9', borderRadius: '4px' }}>Content</div>
      </>
    ),
  },
};

/**
 * Space between items
 */
export const SpaceBetween: Story = {
  args: {
    direction: 'row',
    justify: 'space-between',
    align: 'center',
    style: { padding: '16px', background: '#f5f5f5', borderRadius: '8px' },
    children: (
      <>
        <div style={{ padding: '16px', background: '#e3f2fd', borderRadius: '4px' }}>Left</div>
        <div style={{ padding: '16px', background: '#e8f5e9', borderRadius: '4px' }}>Center</div>
        <div style={{ padding: '16px', background: '#fff3e0', borderRadius: '4px' }}>Right</div>
      </>
    ),
  },
};

/**
 * Space around items
 */
export const SpaceAround: Story = {
  args: {
    direction: 'row',
    justify: 'space-around',
    align: 'center',
    style: { padding: '16px', background: '#f5f5f5', borderRadius: '8px' },
    children: (
      <>
        <div style={{ padding: '16px', background: '#f3e5f5', borderRadius: '4px' }}>Item 1</div>
        <div style={{ padding: '16px', background: '#fce4ec', borderRadius: '4px' }}>Item 2</div>
        <div style={{ padding: '16px', background: '#e8eaf6', borderRadius: '4px' }}>Item 3</div>
      </>
    ),
  },
};

/**
 * Wrapping items
 */
export const WithWrap: Story = {
  args: {
    direction: 'row',
    wrap: true,
    gap: 16,
    style: { maxWidth: '400px' },
    children: (
      <>
        <div style={{ padding: '16px', background: '#e3f2fd', borderRadius: '4px' }}>Item 1</div>
        <div style={{ padding: '16px', background: '#e8f5e9', borderRadius: '4px' }}>Item 2</div>
        <div style={{ padding: '16px', background: '#fff3e0', borderRadius: '4px' }}>Item 3</div>
        <div style={{ padding: '16px', background: '#f3e5f5', borderRadius: '4px' }}>Item 4</div>
        <div style={{ padding: '16px', background: '#fce4ec', borderRadius: '4px' }}>Item 5</div>
        <div style={{ padding: '16px', background: '#e8eaf6', borderRadius: '4px' }}>Item 6</div>
      </>
    ),
  },
};

/**
 * Align end
 */
export const AlignEnd: Story = {
  args: {
    direction: 'row',
    justify: 'flex-end',
    gap: 16,
    style: { padding: '16px', background: '#f5f5f5', borderRadius: '8px' },
    children: (
      <>
        <div style={{ padding: '16px', background: '#e3f2fd', borderRadius: '4px' }}>Item 1</div>
        <div style={{ padding: '16px', background: '#e8f5e9', borderRadius: '4px' }}>Item 2</div>
      </>
    ),
  },
};

/**
 * Toolbar layout with responsive behavior.
 */
export const WithData: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Realistic toolbar using Flex for navigation with actions.',
      },
    },
  },
  render: () => (
    <Flex
      direction="row"
      justify="space-between"
      align="center"
      gap={16}
      style={{
        padding: '12px 24px',
        background: 'white',
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      <Flex direction="row" align="center" gap={24}>
        <div style={{ fontWeight: 'bold', fontSize: '20px', color: '#1976d2' }}>
          MyApp
        </div>
        <Flex direction="row" gap={16}>
          <a href="#" style={{ color: '#666', textDecoration: 'none' }}>Dashboard</a>
          <a href="#" style={{ color: '#666', textDecoration: 'none' }}>Projects</a>
          <a href="#" style={{ color: '#666', textDecoration: 'none' }}>Team</a>
        </Flex>
      </Flex>
      
      <Flex direction="row" align="center" gap={12}>
        <button style={{
          padding: '8px 16px',
          background: 'transparent',
          border: '1px solid #e0e0e0',
          borderRadius: '4px',
          cursor: 'pointer',
        }}>
          Search
        </button>
        <div style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: '#1976d2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
        }}>
          JD
        </div>
      </Flex>
    </Flex>
  ),
};

/**
 * Responsive card grid using Flex.
 */
export const ResponsiveGrid: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Flex with wrap creates responsive grid that adapts to container width.',
      },
    },
  },
  render: () => (
    <Flex direction="row" wrap={true} gap={16}>
      {[1, 2, 3, 4, 5, 6].map((num) => (
        <div
          key={num}
          style={{
            flex: '1 1 calc(33.33% - 16px)',
            minWidth: '250px',
            padding: '24px',
            background: '#f5f5f5',
            borderRadius: '8px',
          }}
        >
          <h3 style={{ margin: '0 0 8px 0' }}>Item {num}</h3>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            Responsive card that wraps to next line when space is limited
          </p>
        </div>
      ))}
    </Flex>
  ),
};

/**
 * Flex in loading state.
 */
export const Loading: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Flex showing loading state with skeleton placeholders.',
      },
    },
  },
  render: () => (
    <Flex direction="row" gap={16}>
      {[1, 2, 3].map((num) => (
        <div
          key={num}
          style={{
            flex: 1,
            height: '120px',
            background: '#e0e0e0',
            borderRadius: '8px',
            animation: 'pulse 2s infinite',
          }}
        />
      ))}
    </Flex>
  ),
};

/**
 * Empty Flex state.
 */
export const Empty: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Flex showing empty state placeholder.',
      },
    },
  },
  render: () => (
    <Flex
      direction="column"
      justify="center"
      align="center"
      style={{
        minHeight: '200px',
        border: '2px dashed #e0e0e0',
        borderRadius: '8px',
      }}
    >
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>📂</div>
      <div style={{ color: '#666', marginBottom: '8px', fontWeight: 'bold' }}>
        No Items
      </div>
      <div style={{ color: '#999', fontSize: '14px' }}>
        Add items to see them displayed here
      </div>
    </Flex>
  ),
};

/**
 * Flex showing error state.
 */
export const Error: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Flex displaying error state with alert styling.',
      },
    },
  },
  render: () => (
    <Flex
      direction="row"
      align="start"
      gap={16}
      style={{
        padding: '24px',
        background: '#ffebee',
        border: '1px solid #ffcdd2',
        borderRadius: '8px',
      }}
    >
      <div style={{ fontSize: '24px' }}>⚠️</div>
      <Flex direction="column" gap={12} style={{ flex: 1 }}>
        <div style={{ fontWeight: 'bold', color: '#d32f2f' }}>
          Error Loading Content
        </div>
        <div style={{ fontSize: '14px', color: '#666' }}>
          Unable to fetch the data. Please check your connection and try again.
        </div>
        <Flex direction="row" gap={8}>
          <button style={{
            padding: '8px 16px',
            background: '#d32f2f',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}>
            Retry
          </button>
          <button style={{
            padding: '8px 16px',
            background: 'transparent',
            border: '1px solid #d32f2f',
            color: '#d32f2f',
            borderRadius: '4px',
            cursor: 'pointer',
          }}>
            Cancel
          </button>
        </Flex>
      </Flex>
    </Flex>
  ),
};

/**
 * Tests Flex responsive behavior across providers.
 */
export const AdapterFallback: Story = {
  parameters: {
    docs: {
      description: {
        story: `
This story tests how Flex handles direction, alignment, and wrapping across providers.

**Testing Instructions:**
1. **Resize your browser window** to see wrapping behavior
2. Use the **UI Provider** toolbar to switch between providers
3. Verify gap spacing is consistent
4. Check alignment options (justify, align) work correctly
5. Test wrap behavior with different container widths

**Expected Behavior:**
- Flex uses provider's spacing system for gap
- Direction (row/column) renders correctly
- Justify and align options work as expected
- Wrap creates responsive grid-like layouts
- All providers support the same Flex API

**Responsive Wrap Pattern:**
\`\`\`tsx
<Flex direction="row" wrap={true} gap={16}>
  <div style={{ flex: '1 1 calc(33.33% - 16px)', minWidth: '250px' }}>
    Card
  </div>
</Flex>
\`\`\`
        `,
      },
    },
  },
  render: () => (
    <div>
      <div style={{
        padding: '16px',
        marginBottom: '16px',
        background: '#f5f5f5',
        borderRadius: '8px',
      }}>
        <strong>🔍 Resize browser</strong> to see wrapping behavior
      </div>
      
      <Flex direction="column" gap={24}>
        <div>
          <h4 style={{ margin: '0 0 12px 0' }}>Row Direction</h4>
          <Flex direction="row" gap={16}>
            <div style={{ padding: '16px', background: '#e3f2fd', borderRadius: '4px' }}>Item 1</div>
            <div style={{ padding: '16px', background: '#e8f5e9', borderRadius: '4px' }}>Item 2</div>
            <div style={{ padding: '16px', background: '#fff3e0', borderRadius: '4px' }}>Item 3</div>
          </Flex>
        </div>
        
        <div>
          <h4 style={{ margin: '0 0 12px 0' }}>Space Between</h4>
          <Flex
            direction="row"
            justify="space-between"
            style={{ padding: '16px', background: '#f5f5f5', borderRadius: '8px' }}
          >
            <div style={{ padding: '16px', background: '#e3f2fd', borderRadius: '4px' }}>Left</div>
            <div style={{ padding: '16px', background: '#e8f5e9', borderRadius: '4px' }}>Center</div>
            <div style={{ padding: '16px', background: '#fff3e0', borderRadius: '4px' }}>Right</div>
          </Flex>
        </div>
        
        <div>
          <h4 style={{ margin: '0 0 12px 0' }}>Wrapping Grid (resize to see)</h4>
          <Flex direction="row" wrap={true} gap={16}>
            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                style={{
                  flex: '1 1 calc(50% - 16px)',
                  minWidth: '200px',
                  padding: '24px',
                  background: '#f5f5f5',
                  borderRadius: '8px',
                  textAlign: 'center',
                }}
              >
                Item {num}
              </div>
            ))}
          </Flex>
        </div>
      </Flex>
    </div>
  ),
};
