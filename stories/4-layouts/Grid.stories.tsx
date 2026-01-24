import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '../../src/adapters/Box';
import { Card } from '../../src/adapters/Card';

/**
 * Grid Layout Component
 * 
 * Demonstrates responsive grid-based layouts using CSS Grid via Box component.
 * Shows breakpoint behavior and adaptive columns without hard-coded widths.
 * 
 * ## Features
 * - Responsive column layouts
 * - Auto-fit and auto-fill grids
 * - Gap spacing
 * - Nested grids
 * - Content-aware sizing
 * 
 * ## Responsive Behavior
 * Uses CSS Grid's native responsive features:
 * - `repeat(auto-fit, minmax(min, max))` - Items fit to container
 * - `repeat(auto-fill, minmax(min, max))` - Always fills container
 * - Media queries via sx prop for breakpoint-specific behavior
 */
const meta = {
  title: 'Layout/Grid',
  component: Box,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Responsive grid layouts using layout primitives. No hard-coded screen widths - all responsive behavior uses provider's native breakpoint system.

**Resize your browser** to see breakpoint behavior in action.
        `,
      },
    },
  },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Auto-fit grid that adjusts columns based on available space.
 * Items are at least 250px wide and expand to fill space.
 */
export const Default: Story = {
  render: () => (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: 2,
      }}
    >
      <Card>
        <Box sx={{ p: 3, bgcolor: '#e3f2fd' }}>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>Grid Item 1</h3>
          <p style={{ margin: 0 }}>Auto-fit responsive grid</p>
        </Box>
      </Card>
      <Card>
        <Box sx={{ p: 3, bgcolor: '#e8f5e9' }}>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>Grid Item 2</h3>
          <p style={{ margin: 0 }}>Resize to see columns adjust</p>
        </Box>
      </Card>
      <Card>
        <Box sx={{ p: 3, bgcolor: '#fff3e0' }}>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>Grid Item 3</h3>
          <p style={{ margin: 0 }}>Minimum 250px width</p>
        </Box>
      </Card>
      <Card>
        <Box sx={{ p: 3, bgcolor: '#f3e5f5' }}>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>Grid Item 4</h3>
          <p style={{ margin: 0 }}>Expands to fill space</p>
        </Box>
      </Card>
    </Box>
  ),
};

/**
 * Dashboard grid with realistic business widgets.
 * Uses responsive breakpoints for different screen sizes.
 */
export const WithData: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Dashboard layout with metrics cards that adapt to screen size using responsive grid.',
      },
    },
  },
  render: () => (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr', // Mobile: 1 column
          sm: 'repeat(2, 1fr)', // Tablet: 2 columns
          md: 'repeat(3, 1fr)', // Desktop: 3 columns
          lg: 'repeat(4, 1fr)', // Large: 4 columns
        },
        gap: 3,
      }}
    >
      {/* Revenue Card */}
      <Card>
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
            <h3 style={{ margin: 0, fontSize: '14px', color: '#666' }}>Total Revenue</h3>
            <span style={{ 
              padding: '2px 8px', 
              borderRadius: '4px', 
              backgroundColor: '#e8f5e9',
              color: '#2e7d32',
              fontSize: '11px',
              fontWeight: 'bold'
            }}>
              +12.5%
            </span>
          </Box>
          <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            $1,247,892
          </div>
          <div style={{ fontSize: '12px', color: '#999' }}>
            vs. $1,108,234 last month
          </div>
        </Box>
      </Card>

      {/* Customers Card */}
      <Card>
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
            <h3 style={{ margin: 0, fontSize: '14px', color: '#666' }}>New Customers</h3>
            <span style={{ 
              padding: '2px 8px', 
              borderRadius: '4px', 
              backgroundColor: '#e3f2fd',
              color: '#1565c0',
              fontSize: '11px',
              fontWeight: 'bold'
            }}>
              +8.2%
            </span>
          </Box>
          <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            1,247
          </div>
          <div style={{ fontSize: '12px', color: '#999' }}>
            vs. 1,153 last month
          </div>
        </Box>
      </Card>

      {/* Orders Card */}
      <Card>
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
            <h3 style={{ margin: 0, fontSize: '14px', color: '#666' }}>Total Orders</h3>
            <span style={{ 
              padding: '2px 8px', 
              borderRadius: '4px', 
              backgroundColor: '#fff3e0',
              color: '#ef6c00',
              fontSize: '11px',
              fontWeight: 'bold'
            }}>
              +5.1%
            </span>
          </Box>
          <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            3,891
          </div>
          <div style={{ fontSize: '12px', color: '#999' }}>
            vs. 3,702 last month
          </div>
        </Box>
      </Card>

      {/* Conversion Card */}
      <Card>
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
            <h3 style={{ margin: 0, fontSize: '14px', color: '#666' }}>Conversion Rate</h3>
            <span style={{ 
              padding: '2px 8px', 
              borderRadius: '4px', 
              backgroundColor: '#e8f5e9',
              color: '#2e7d32',
              fontSize: '11px',
              fontWeight: 'bold'
            }}>
              +2.3%
            </span>
          </Box>
          <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            3.24%
          </div>
          <div style={{ fontSize: '12px', color: '#999' }}>
            vs. 3.17% last month
          </div>
        </Box>
      </Card>
    </Box>
  ),
};

/**
 * Product grid with asymmetric layout.
 * Featured item spans multiple columns on larger screens.
 */
export const AsymmetricGrid: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Grid with featured items that span multiple columns, adapting to screen size.',
      },
    },
  },
  render: () => (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
        },
        gap: 2,
      }}
    >
      {/* Featured Item - Spans 2 columns on md+ */}
      <Box
        sx={{
          gridColumn: {
            xs: 'span 1',
            md: 'span 2',
          },
          gridRow: {
            md: 'span 2',
          },
        }}
      >
        <Card>
          <Box sx={{ p: 4, bgcolor: '#1976d2', color: 'white', height: '100%' }}>
            <h2 style={{ margin: '0 0 1rem 0' }}>Featured Product</h2>
            <p style={{ margin: '0 0 1rem 0' }}>
              This item spans 2 columns and 2 rows on desktop screens.
            </p>
            <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              $299.99
            </div>
            <button style={{
              padding: '12px 24px',
              backgroundColor: 'white',
              color: '#1976d2',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}>
              Shop Now
            </button>
          </Box>
        </Card>
      </Box>

      {/* Regular Items */}
      <Card>
        <Box sx={{ p: 2 }}>
          <h4 style={{ margin: '0 0 0.5rem 0' }}>Product 2</h4>
          <p style={{ margin: '0 0 0.5rem 0', fontSize: '14px', color: '#666' }}>
            Standard grid item
          </p>
          <div style={{ fontWeight: 'bold' }}>$99.99</div>
        </Box>
      </Card>

      <Card>
        <Box sx={{ p: 2 }}>
          <h4 style={{ margin: '0 0 0.5rem 0' }}>Product 3</h4>
          <p style={{ margin: '0 0 0.5rem 0', fontSize: '14px', color: '#666' }}>
            Standard grid item
          </p>
          <div style={{ fontWeight: 'bold' }}>$149.99</div>
        </Box>
      </Card>

      <Card>
        <Box sx={{ p: 2 }}>
          <h4 style={{ margin: '0 0 0.5rem 0' }}>Product 4</h4>
          <p style={{ margin: '0 0 0.5rem 0', fontSize: '14px', color: '#666' }}>
            Standard grid item
          </p>
          <div style={{ fontWeight: 'bold' }}>$79.99</div>
        </Box>
      </Card>

      <Card>
        <Box sx={{ p: 2 }}>
          <h4 style={{ margin: '0 0 0.5rem 0' }}>Product 5</h4>
          <p style={{ margin: '0 0 0.5rem 0', fontSize: '14px', color: '#666' }}>
            Standard grid item
          </p>
          <div style={{ fontWeight: 'bold' }}>$199.99</div>
        </Box>
      </Card>
    </Box>
  ),
};

/**
 * Grid in loading state with skeleton placeholders.
 */
export const Loading: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Grid layout showing loading state with skeleton placeholders.',
      },
    },
  },
  render: () => (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        },
        gap: 2,
      }}
    >
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Card key={i}>
          <Box sx={{ p: 3 }}>
            <Box
              sx={{
                height: '20px',
                bgcolor: '#e0e0e0',
                borderRadius: '4px',
                mb: 1,
                animation: 'pulse 2s infinite',
              }}
            />
            <Box
              sx={{
                height: '40px',
                bgcolor: '#e0e0e0',
                borderRadius: '4px',
                mb: 1,
              }}
            />
            <Box
              sx={{
                height: '16px',
                bgcolor: '#e0e0e0',
                borderRadius: '4px',
                width: '60%',
              }}
            />
          </Box>
        </Card>
      ))}
    </Box>
  ),
};

/**
 * Empty grid state with placeholder message.
 */
export const Empty: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Grid showing empty state when no items are available.',
      },
    },
  },
  render: () => (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px',
        textAlign: 'center',
      }}
    >
      <Box>
        <div style={{ fontSize: '64px', marginBottom: '1rem' }}>📦</div>
        <h3 style={{ margin: '0 0 0.5rem 0', color: '#666' }}>No Items Yet</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#999' }}>
          Add your first item to see it displayed in the grid.
        </p>
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
          onClick={() => console.log('Add item clicked')}
        >
          Add First Item
        </button>
      </Box>
    </Box>
  ),
};

/**
 * Grid showing error state.
 */
export const Error: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Grid displaying error state when data fails to load.',
      },
    },
  },
  render: () => (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px',
        textAlign: 'center',
      }}
    >
      <Box>
        <div style={{ fontSize: '64px', marginBottom: '1rem' }}>⚠️</div>
        <h3 style={{ margin: '0 0 0.5rem 0', color: '#d32f2f' }}>Failed to Load Items</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#666' }}>
          Unable to fetch grid data. Please try again.
        </p>
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
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
            onClick={() => console.log('Retry clicked')}
          >
            Retry
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
            onClick={() => console.log('Go back clicked')}
          >
            Go Back
          </button>
        </Box>
      </Box>
    </Box>
  ),
};

/**
 * Tests responsive grid behavior across different screen sizes.
 */
export const AdapterFallback: Story = {
  parameters: {
    docs: {
      description: {
        story: `
This story tests how responsive grids work across providers and screen sizes.

**Testing Instructions:**
1. **Resize your browser window** to see breakpoint behavior
2. Use the **UI Provider** toolbar to switch between providers
3. Verify grid columns adjust at breakpoints:
   - Mobile (xs): 1 column
   - Tablet (sm): 2 columns
   - Desktop (md): 3 columns
   - Large (lg): 4 columns
4. Check gap spacing remains consistent
5. Test that cards adapt their content properly

**Expected Behavior:**
- Grid uses provider's breakpoint system (no hard-coded widths)
- Columns adjust smoothly at breakpoints
- Gap spacing scales with provider theme
- Content remains readable at all sizes
- Provider theme is applied to cards

**Breakpoint System:**
This grid uses the provider's native responsive system via sx prop:
\`\`\`tsx
gridTemplateColumns: {
  xs: '1fr',           // Mobile
  sm: 'repeat(2, 1fr)', // Tablet
  md: 'repeat(3, 1fr)', // Desktop
  lg: 'repeat(4, 1fr)', // Large
}
\`\`\`
        `,
      },
    },
  },
  render: () => (
    <Box>
      <Box sx={{ mb: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
        <strong>🔍 Resize your browser</strong> to see responsive breakpoints in action
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
          gap: 2,
        }}
      >
        <Card>
          <Box sx={{ p: 3, bgcolor: '#e3f2fd' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '16px' }}>Mobile: 1 col</h3>
            <p style={{ margin: 0, fontSize: '14px' }}>Stacks vertically on small screens</p>
          </Box>
        </Card>
        <Card>
          <Box sx={{ p: 3, bgcolor: '#e8f5e9' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '16px' }}>Tablet: 2 cols</h3>
            <p style={{ margin: 0, fontSize: '14px' }}>Two columns on tablets</p>
          </Box>
        </Card>
        <Card>
          <Box sx={{ p: 3, bgcolor: '#fff3e0' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '16px' }}>Desktop: 3 cols</h3>
            <p style={{ margin: 0, fontSize: '14px' }}>Three columns on desktop</p>
          </Box>
        </Card>
        <Card>
          <Box sx={{ p: 3, bgcolor: '#f3e5f5' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '16px' }}>Large: 4 cols</h3>
            <p style={{ margin: 0, fontSize: '14px' }}>Four columns on large screens</p>
          </Box>
        </Card>
      </Box>
    </Box>
  ),
};
