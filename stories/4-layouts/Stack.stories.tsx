import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '../../src/adapters/Stack';

/**
 * Stack component for organizing content vertically or horizontally with consistent spacing.
 * 
 * **Now using MUI Stack implementation** for better performance and Material Design support.
 * 
 * ## Features
 * - Flexible direction (row, column, row-reverse, column-reverse)
 * - Configurable spacing with MUI spacing units
 * - Alignment and justification options
 * - Divider support
 */
const meta = {
  title: 'Layout/Stack',
  component: Stack,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'column', 'row-reverse', 'column-reverse'],
      description: 'Direction of the stack',
    },
    spacing: {
      control: 'number',
      description: 'Spacing between items (MUI spacing units, 1 unit = 8px)',
    },
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Vertical stack with default spacing
 */
export const Vertical: Story = {
  args: {
    direction: 'column',
    spacing: 2,
    children: (
      <>
        <div style={{ padding: '16px', background: '#e3f2fd', borderRadius: '4px' }}>Item 1</div>
        <div style={{ padding: '16px', background: '#e3f2fd', borderRadius: '4px' }}>Item 2</div>
        <div style={{ padding: '16px', background: '#e3f2fd', borderRadius: '4px' }}>Item 3</div>
      </>
    ),
  },
};

/**
 * Horizontal stack
 */
export const Horizontal: Story = {
  args: {
    direction: 'row',
    spacing: 2,
    children: (
      <>
        <div style={{ padding: '16px', background: '#e8f5e9', borderRadius: '4px' }}>Item 1</div>
        <div style={{ padding: '16px', background: '#e8f5e9', borderRadius: '4px' }}>Item 2</div>
        <div style={{ padding: '16px', background: '#e8f5e9', borderRadius: '4px' }}>Item 3</div>
      </>
    ),
  },
};

/**
 * Stack with no spacing
 */
export const NoSpacing: Story = {
  args: {
    direction: 'vertical',
    spacing: 0,
    children: (
      <>
        <div style={{ padding: '16px', background: '#fff3e0', border: '1px solid #ffe0b2' }}>Item 1</div>
        <div style={{ padding: '16px', background: '#fff3e0', border: '1px solid #ffe0b2' }}>Item 2</div>
        <div style={{ padding: '16px', background: '#fff3e0', border: '1px solid #ffe0b2' }}>Item 3</div>
      </>
    ),
  },
};

/**
 * Stack with large spacing
 */
export const LargeSpacing: Story = {
  args: {
    direction: 'vertical',
    spacing: 32,
    children: (
      <>
        <div style={{ padding: '16px', background: '#f3e5f5', borderRadius: '4px' }}>Item 1</div>
        <div style={{ padding: '16px', background: '#f3e5f5', borderRadius: '4px' }}>Item 2</div>
        <div style={{ padding: '16px', background: '#f3e5f5', borderRadius: '4px' }}>Item 3</div>
      </>
    ),
  },
};

/**
 * Centered alignment
 */
export const Centered: Story = {
  args: {
    direction: 'vertical',
    spacing: 16,
    align: 'center',
    children: (
      <>
        <div style={{ padding: '16px', background: '#fce4ec', borderRadius: '4px', width: '200px' }}>Short</div>
        <div style={{ padding: '16px', background: '#fce4ec', borderRadius: '4px', width: '300px' }}>Medium Width</div>
        <div style={{ padding: '16px', background: '#fce4ec', borderRadius: '4px', width: '150px' }}>Tiny</div>
      </>
    ),
  },
};

/**
 * Stack with complete business data showing form layout.
 */
export const WithData: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Form layout using Stack for consistent vertical spacing between fields.',
      },
    },
  },
  render: () => (
    <Stack direction="column" spacing={3} sx={{ maxWidth: 500 }}>
      <div>
        <h2 style={{ margin: 0 }}>Contact Information</h2>
        <p style={{ margin: '0.5rem 0 0 0', color: '#666', fontSize: '14px' }}>
          Please fill out your contact details
        </p>
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          Full Name *
        </label>
        <input
          type="text"
          defaultValue="John Doe"
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            fontSize: '14px',
          }}
        />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          Email Address *
        </label>
        <input
          type="email"
          defaultValue="john.doe@company.com"
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            fontSize: '14px',
          }}
        />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          Phone Number
        </label>
        <input
          type="tel"
          defaultValue="+1 (555) 123-4567"
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            fontSize: '14px',
          }}
        />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          Message
        </label>
        <textarea
          defaultValue="I would like to discuss..."
          rows={4}
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            fontSize: '14px',
            fontFamily: 'inherit',
          }}
        />
      </div>
      <Stack direction="row" spacing={2}>
        <button
          style={{
            padding: '12px 24px',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Submit
        </button>
        <button
          style={{
            padding: '12px 24px',
            backgroundColor: 'transparent',
            color: '#666',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>
      </Stack>
    </Stack>
  ),
};

/**
 * Responsive stack that changes direction based on screen size.
 */
export const ResponsiveDirection: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Stack that switches from column (mobile) to row (desktop) at breakpoints. Resize browser to see.',
      },
    },
  },
  render: () => (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={2}
      sx={{
        p: 3,
        bgcolor: '#f5f5f5',
        borderRadius: 1,
      }}
    >
      <div style={{
        padding: '24px',
        background: '#e3f2fd',
        borderRadius: '4px',
        flex: 1,
        textAlign: 'center'
      }}>
        <h3 style={{ margin: '0 0 0.5rem 0' }}>Column on Mobile</h3>
        <p style={{ margin: 0, fontSize: '14px' }}>Stacks vertically on small screens</p>
      </div>
      <div style={{
        padding: '24px',
        background: '#e8f5e9',
        borderRadius: '4px',
        flex: 1,
        textAlign: 'center'
      }}>
        <h3 style={{ margin: '0 0 0.5rem 0' }}>Row on Desktop</h3>
        <p style={{ margin: 0, fontSize: '14px' }}>Displays horizontally on medium+ screens</p>
      </div>
      <div style={{
        padding: '24px',
        background: '#fff3e0',
        borderRadius: '4px',
        flex: 1,
        textAlign: 'center'
      }}>
        <h3 style={{ margin: '0 0 0.5rem 0' }}>Responsive</h3>
        <p style={{ margin: 0, fontSize: '14px' }}>Adapts automatically to viewport</p>
      </div>
    </Stack>
  ),
};

/**
 * Stack in loading state.
 */
export const Loading: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Stack showing loading state with skeleton placeholders.',
      },
    },
  },
  render: () => (
    <Stack direction="column" spacing={2} sx={{ maxWidth: 500 }}>
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            height: '60px',
            background: '#e0e0e0',
            borderRadius: '4px',
            animation: 'pulse 2s infinite',
          }}
        />
      ))}
    </Stack>
  ),
};

/**
 * Empty stack state.
 */
export const Empty: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Stack showing empty state when no items are present.',
      },
    },
  },
  render: () => (
    <Stack
      direction="column"
      spacing={2}
      sx={{
        minHeight: 300,
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px dashed #e0e0e0',
        borderRadius: 1,
        p: 4,
      }}
    >
      <div style={{ fontSize: '48px' }}>📋</div>
      <div style={{ textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', color: '#666' }}>No Items</h3>
        <p style={{ margin: 0, color: '#999' }}>Stack will display items here when added</p>
      </div>
    </Stack>
  ),
};

/**
 * Stack showing error state.
 */
export const Error: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Stack displaying error state when content fails to load.',
      },
    },
  },
  render: () => (
    <Stack
      direction="column"
      spacing={2}
      sx={{
        p: 3,
        bgcolor: '#ffebee',
        borderRadius: 1,
        border: '1px solid #ffcdd2',
      }}
    >
      <div style={{ fontSize: '32px' }}>⚠️</div>
      <div>
        <h3 style={{ margin: '0 0 0.5rem 0', color: '#d32f2f' }}>Failed to Load Content</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#666' }}>
          Unable to display stacked items. Please try again.
        </p>
      </div>
      <Stack direction="row" spacing={1}>
        <button
          style={{
            padding: '8px 16px',
            backgroundColor: '#d32f2f',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
          onClick={() => console.log('Retry clicked')}
        >
          Retry
        </button>
        <button
          style={{
            padding: '8px 16px',
            backgroundColor: 'transparent',
            color: '#666',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
          onClick={() => console.log('Dismiss clicked')}
        >
          Dismiss
        </button>
      </Stack>
    </Stack>
  ),
};

/**
 * Tests responsive Stack behavior across providers.
 */
export const AdapterFallback: Story = {
  parameters: {
    docs: {
      description: {
        story: `
This story tests how Stack handles responsive behavior across providers.

**Testing Instructions:**
1. **Resize your browser window** to see direction change at breakpoints
2. Use the **UI Provider** toolbar to switch between providers
3. Verify spacing remains consistent
4. Check that direction switches from column to row at md breakpoint
5. Test nested stacks maintain proper spacing

**Expected Behavior:**
- Stack uses provider's spacing system (MUI: 8px units)
- Direction changes responsively: column on mobile, row on desktop
- Spacing scales properly with provider theme
- Nested stacks work correctly
- All providers render consistent spacing

**Responsive Breakpoints:**
\`\`\`tsx
direction={{ xs: 'column', md: 'row' }}
spacing={2} // 16px with MUI default spacing
\`\`\`
        `,
      },
    },
  },
  render: () => (
    <div>
      <div style={{ padding: '16px', marginBottom: '16px', background: '#f5f5f5', borderRadius: '4px' }}>
        <strong>🔍 Resize browser</strong> to see direction change from column → row
      </div>
      <Stack
        direction={{ xs: 'column', sm: 'column', md: 'row' }}
        spacing={2}
      >
        <Stack direction="column" spacing={1} sx={{ flex: 1, p: 2, bgcolor: '#e3f2fd', borderRadius: 1 }}>
          <h4 style={{ margin: 0 }}>Nested Stack 1</h4>
          <div style={{ padding: '8px', background: 'white', borderRadius: '4px' }}>Item A</div>
          <div style={{ padding: '8px', background: 'white', borderRadius: '4px' }}>Item B</div>
        </Stack>
        <Stack direction="column" spacing={1} sx={{ flex: 1, p: 2, bgcolor: '#e8f5e9', borderRadius: 1 }}>
          <h4 style={{ margin: 0 }}>Nested Stack 2</h4>
          <div style={{ padding: '8px', background: 'white', borderRadius: '4px' }}>Item C</div>
          <div style={{ padding: '8px', background: 'white', borderRadius: '4px' }}>Item D</div>
        </Stack>
        <Stack direction="column" spacing={1} sx={{ flex: 1, p: 2, bgcolor: '#fff3e0', borderRadius: 1 }}>
          <h4 style={{ margin: 0 }}>Nested Stack 3</h4>
          <div style={{ padding: '8px', background: 'white', borderRadius: '4px' }}>Item E</div>
          <div style={{ padding: '8px', background: 'white', borderRadius: '4px' }}>Item F</div>
        </Stack>
      </Stack>
    </div>
  ),
};
