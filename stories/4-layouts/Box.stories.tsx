import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '../../src/adapters/Box';

/**
 * Box is a flexible container component with padding and margin utilities.
 * 
 * ## Features
 * - Configurable padding and margin
 * - Flexible styling options
 * - Basic building block for layouts
 */
const meta = {
  title: 'Layout/Box',
  component: Box,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    padding: {
      control: 'number',
      description: 'Padding in pixels',
    },
    margin: {
      control: 'number',
      description: 'Margin in pixels',
    },
  },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default box with padding
 */
export const Default: Story = {
  args: {
    padding: 16,
    children: <div style={{ background: '#e3f2fd', borderRadius: '4px' }}>Content inside a box</div>,
  },
};

/**
 * Box with large padding
 */
export const LargePadding: Story = {
  args: {
    padding: 32,
    children: <div style={{ background: '#e8f5e9', borderRadius: '4px' }}>Content with large padding</div>,
  },
};

/**
 * Box with margin
 */
export const WithMargin: Story = {
  args: {
    padding: 16,
    margin: 24,
    children: <div style={{ background: '#fff3e0', borderRadius: '4px' }}>Content with margin</div>,
  },
};

/**
 * Box with no spacing
 */
export const NoSpacing: Story = {
  args: {
    padding: 0,
    margin: 0,
    children: <div style={{ background: '#f3e5f5', borderRadius: '4px', padding: '8px' }}>No padding or margin</div>,
  },
};

/**
 * Nested boxes
 */
export const Nested: Story = {
  args: {
    padding: 24,
    children: (
      <div style={{ background: '#e3f2fd', borderRadius: '4px' }}>
        Outer Box
        <Box padding={16} margin={8}>
          <div style={{ background: '#e8f5e9', borderRadius: '4px' }}>
            Inner Box
          </div>
        </Box>
      </div>
    ),
  },
};

/**
 * Box with complete layout composition.
 */
export const WithData: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Card layout using Box for spacing and flexbox for internal structure.',
      },
    },
  },
  render: () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: 3,
        maxWidth: 400,
        bgcolor: 'white',
        borderRadius: 2,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            width: 60,
            height: 60,
            bgcolor: '#1976d2',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '24px',
            fontWeight: 'bold',
          }}
        >
          JD
        </Box>
        <Box sx={{ flex: 1 }}>
          <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>John Doe</div>
          <div style={{ fontSize: '14px', color: '#666' }}>Senior Engineer</div>
        </Box>
      </Box>
      
      <Box sx={{ pt: 2, borderTop: '1px solid #e0e0e0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <Box>
            <div style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>Department</div>
            <div style={{ fontWeight: 'bold' }}>Engineering</div>
          </Box>
          <Box>
            <div style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>Team</div>
            <div style={{ fontWeight: 'bold' }}>Platform</div>
          </Box>
        </div>
      </Box>
      
      <Box sx={{ pt: 2, borderTop: '1px solid #e0e0e0' }}>
        <div style={{ fontSize: '14px', color: '#666', lineHeight: 1.6 }}>
          Experienced full-stack developer specializing in React, Node.js, and cloud infrastructure.
        </div>
      </Box>
      
      <Box sx={{ display: 'flex', gap: 1, pt: 1 }}>
        <button style={{
          flex: 1,
          padding: '8px',
          backgroundColor: '#1976d2',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}>
          View Profile
        </button>
        <button style={{
          flex: 1,
          padding: '8px',
          backgroundColor: 'transparent',
          color: '#666',
          border: '1px solid #e0e0e0',
          borderRadius: '4px',
          cursor: 'pointer',
        }}>
          Message
        </button>
      </Box>
    </Box>
  ),
};

/**
 * Responsive Box with breakpoint-based layout.
 */
export const ResponsiveLayout: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Box that changes layout direction and spacing at different breakpoints.',
      },
    },
  },
  render: () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: 2, md: 3 },
        p: { xs: 2, md: 3 },
        bgcolor: '#f5f5f5',
        borderRadius: 1,
      }}
    >
      <Box sx={{ flex: 1, p: 2, bgcolor: '#e3f2fd', borderRadius: 1 }}>
        <h3 style={{ margin: '0 0 8px 0' }}>Column on Mobile</h3>
        <p style={{ margin: 0, fontSize: '14px' }}>
          Stacks vertically on small screens
        </p>
      </Box>
      <Box sx={{ flex: 1, p: 2, bgcolor: '#e8f5e9', borderRadius: 1 }}>
        <h3 style={{ margin: '0 0 8px 0' }}>Row on Desktop</h3>
        <p style={{ margin: 0, fontSize: '14px' }}>
          Displays horizontally on medium+ screens
        </p>
      </Box>
      <Box sx={{ flex: 1, p: 2, bgcolor: '#fff3e0', borderRadius: 1 }}>
        <h3 style={{ margin: '0 0 8px 0' }}>Responsive Gap</h3>
        <p style={{ margin: 0, fontSize: '14px' }}>
          Gap increases on larger screens
        </p>
      </Box>
    </Box>
  ),
};

/**
 * Box in loading state.
 */
export const Loading: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Box showing loading state with skeleton content.',
      },
    },
  },
  render: () => (
    <Box sx={{ p: 3, maxWidth: 400 }}>
      <Box
        sx={{
          height: 60,
          bgcolor: '#e0e0e0',
          borderRadius: 1,
          mb: 2,
          animation: 'pulse 2s infinite',
        }}
      />
      <Box sx={{ height: 20, bgcolor: '#e0e0e0', borderRadius: 1, mb: 1 }} />
      <Box sx={{ height: 20, bgcolor: '#e0e0e0', borderRadius: 1, mb: 1, width: '80%' }} />
      <Box sx={{ height: 20, bgcolor: '#e0e0e0', borderRadius: 1, width: '60%' }} />
    </Box>
  ),
};

/**
 * Empty box state.
 */
export const Empty: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Box showing empty state placeholder.',
      },
    },
  },
  render: () => (
    <Box
      sx={{
        p: 6,
        textAlign: 'center',
        border: '2px dashed #e0e0e0',
        borderRadius: 1,
        maxWidth: 400,
      }}
    >
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>📦</div>
      <div style={{ color: '#666', marginBottom: '8px', fontWeight: 'bold' }}>
        Empty Box
      </div>
      <div style={{ color: '#999', fontSize: '14px' }}>
        Content will appear here when available
      </div>
    </Box>
  ),
};

/**
 * Box showing error state.
 */
export const Error: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Box displaying error state with alert styling.',
      },
    },
  },
  render: () => (
    <Box
      sx={{
        p: 3,
        bgcolor: '#ffebee',
        border: '1px solid #ffcdd2',
        borderRadius: 1,
        maxWidth: 400,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
        <div style={{ fontSize: '24px' }}>⚠️</div>
        <Box sx={{ flex: 1 }}>
          <div style={{ fontWeight: 'bold', color: '#d32f2f', marginBottom: '8px' }}>
            Error Loading Content
          </div>
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
            Unable to fetch the data. Please try again.
          </div>
          <button style={{
            padding: '8px 16px',
            backgroundColor: '#d32f2f',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}>
            Retry
          </button>
        </Box>
      </Box>
    </Box>
  ),
};

/**
 * Tests Box responsive behavior across providers.
 */
export const AdapterFallback: Story = {
  parameters: {
    docs: {
      description: {
        story: `
This story tests how Box handles responsive props and sx system across providers.

**Testing Instructions:**
1. **Resize your browser window** to see responsive layout changes
2. Use the **UI Provider** toolbar to switch between providers
3. Verify spacing scales with provider's theme units
4. Check flexbox and grid layouts work correctly
5. Test that sx prop applies theme values properly

**Expected Behavior:**
- Box uses provider's spacing system (MUI: 8px units)
- Responsive props work at breakpoints (xs, sm, md, lg, xl)
- Flexbox/Grid layouts render consistently
- sx prop applies theme colors, spacing, and breakpoints
- All providers support the same sx API

**Responsive Props:**
\`\`\`tsx
sx={{
  p: { xs: 2, md: 3 },      // Padding: 16px mobile, 24px desktop
  flexDirection: { xs: 'column', md: 'row' },
  gap: { xs: 2, md: 4 },
}}
\`\`\`
        `,
      },
    },
  },
  render: () => (
    <div>
      <Box sx={{ p: 2, mb: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
        <strong>🔍 Resize browser</strong> to see responsive spacing and layout
      </Box>
      
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: { xs: 2, md: 3 },
        }}
      >
        <Box sx={{ p: { xs: 2, md: 3 }, bgcolor: '#e3f2fd', borderRadius: 1 }}>
          <h4 style={{ margin: '0 0 8px 0' }}>Responsive Padding</h4>
          <p style={{ margin: 0, fontSize: '14px' }}>
            Padding increases on larger screens
          </p>
        </Box>
        
        <Box sx={{ p: { xs: 2, md: 3 }, bgcolor: '#e8f5e9', borderRadius: 1 }}>
          <h4 style={{ margin: '0 0 8px 0' }}>Grid Columns</h4>
          <p style={{ margin: 0, fontSize: '14px' }}>
            1 col mobile, 2 tablet, 3 desktop
          </p>
        </Box>
        
        <Box sx={{ p: { xs: 2, md: 3 }, bgcolor: '#fff3e0', borderRadius: 1 }}>
          <h4 style={{ margin: '0 0 8px 0' }}>Theme Integration</h4>
          <p style={{ margin: 0, fontSize: '14px' }}>
            Colors and spacing from provider theme
          </p>
        </Box>
      </Box>
    </div>
  ),
};
