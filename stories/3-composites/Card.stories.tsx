import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../../src/adapters/Card';

/**
 * Card component that adapts to the selected UI provider.
 * 
 * ## Supported Providers
 * - **internal**: Custom in-house implementation
 * - **mui**: Material-UI Card
 * - **radix**: Radix UI Card
 * - **shadcn**: shadcn/ui Card (Radix + Tailwind)
 */
const meta = {
  title: 'Data Display/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div style={{ padding: '1rem' }}>
        <h3 style={{ margin: '0 0 0.5rem 0' }}>Card Title</h3>
        <p style={{ margin: 0 }}>This is a basic card with some content inside.</p>
      </div>
    ),
  },
};

export const WithImage: Story = {
  args: {
    children: (
      <div>
        <div style={{ 
          backgroundColor: '#e0e0e0', 
          height: '200px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <span>Image Placeholder</span>
        </div>
        <div style={{ padding: '1rem' }}>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>Card with Image</h3>
          <p style={{ margin: 0 }}>This card includes an image at the top.</p>
        </div>
      </div>
    ),
  },
};

export const WithActions: Story = {
  args: {
    children: (
      <div style={{ padding: '1rem' }}>
        <h3 style={{ margin: '0 0 0.5rem 0' }}>Card Title</h3>
        <p style={{ margin: '0 0 1rem 0' }}>This card has action buttons at the bottom.</p>
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
          <button style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>Cancel</button>
          <button style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>Save</button>
        </div>
      </div>
    ),
  },
};

export const Elevated: Story = {
  args: {
    elevation: 8,
    children: (
      <div style={{ padding: '1rem' }}>
        <h3 style={{ margin: '0 0 0.5rem 0' }}>Elevated Card</h3>
        <p style={{ margin: 0 }}>This card has a higher elevation for more prominence.</p>
      </div>
    ),
  },
};

export const MultipleCards: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', maxWidth: '800px' }}>
      <Card>
        <div style={{ padding: '1rem' }}>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>Card 1</h3>
          <p style={{ margin: 0 }}>First card content.</p>
        </div>
      </Card>
      <Card>
        <div style={{ padding: '1rem' }}>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>Card 2</h3>
          <p style={{ margin: 0 }}>Second card content.</p>
        </div>
      </Card>
      <Card>
        <div style={{ padding: '1rem' }}>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>Card 3</h3>
          <p style={{ margin: 0 }}>Third card content.</p>
        </div>
      </Card>
    </div>
  ),
};

export const FullContent: Story = {
  args: {
    children: (
      <div>
        <div style={{ 
          backgroundColor: '#1976d2', 
          color: 'white',
          padding: '1rem',
        }}>
          <h2 style={{ margin: 0 }}>Featured Card</h2>
        </div>
        <div style={{ 
          backgroundColor: '#e0e0e0', 
          height: '200px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <span>Image Placeholder</span>
        </div>
        <div style={{ padding: '1rem' }}>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>Comprehensive Card</h3>
          <p style={{ margin: '0 0 1rem 0' }}>
            This card demonstrates multiple sections including a header, 
            image, content, and action buttons.
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
            <button style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>Learn More</button>
            <button style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>Get Started</button>
          </div>
        </div>
      </div>
    ),
  },
};

/**
 * Card with realistic business data.
 */
export const WithData: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates a business card with realistic content including metrics, status, and actions.',
      },
    },
  },
  args: {
    children: (
      <div style={{ padding: '1.5rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
            <h3 style={{ margin: 0 }}>Q1 2024 Revenue</h3>
            <span style={{ 
              padding: '4px 8px', 
              borderRadius: '4px', 
              backgroundColor: '#e8f5e9',
              color: '#2e7d32',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              +12.5%
            </span>
          </div>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            Compared to Q1 2023
          </p>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            $1,247,892
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', fontSize: '14px' }}>
            <div>
              <div style={{ color: '#666' }}>Target</div>
              <div style={{ fontWeight: 'bold' }}>$1,200,000</div>
            </div>
            <div>
              <div style={{ color: '#666' }}>Customers</div>
              <div style={{ fontWeight: 'bold' }}>1,247</div>
            </div>
            <div>
              <div style={{ color: '#666' }}>Avg Order</div>
              <div style={{ fontWeight: 'bold' }}>$1,001</div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '1rem', borderTop: '1px solid #e0e0e0' }}>
          <button 
            style={{ flex: 1, padding: '0.5rem', cursor: 'pointer', border: 'none', backgroundColor: '#1976d2', color: 'white', borderRadius: '4px' }}
            onClick={() => console.log('View details clicked')}
          >
            View Details
          </button>
          <button 
            style={{ padding: '0.5rem 1rem', cursor: 'pointer', border: '1px solid #e0e0e0', backgroundColor: 'white', borderRadius: '4px' }}
            onClick={() => console.log('Export clicked')}
          >
            Export
          </button>
        </div>
      </div>
    ),
  },
};

/**
 * Card in loading state.
 */
export const Loading: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Shows card with loading skeleton placeholders.',
      },
    },
  },
  args: {
    children: (
      <div style={{ padding: '1.5rem' }}>
        <div style={{ height: '24px', backgroundColor: '#e0e0e0', borderRadius: '4px', marginBottom: '0.5rem', animation: 'pulse 2s infinite' }} />
        <div style={{ height: '16px', backgroundColor: '#e0e0e0', borderRadius: '4px', marginBottom: '1rem', width: '60%' }} />
        <div style={{ height: '48px', backgroundColor: '#e0e0e0', borderRadius: '4px', marginBottom: '1rem' }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
          <div style={{ height: '40px', backgroundColor: '#e0e0e0', borderRadius: '4px' }} />
          <div style={{ height: '40px', backgroundColor: '#e0e0e0', borderRadius: '4px' }} />
          <div style={{ height: '40px', backgroundColor: '#e0e0e0', borderRadius: '4px' }} />
        </div>
      </div>
    ),
  },
};

/**
 * Empty card state.
 */
export const Empty: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Card showing empty state message.',
      },
    },
  },
  args: {
    children: (
      <div style={{ padding: '3rem 1.5rem', textAlign: 'center', color: '#999' }}>
        <div style={{ fontSize: '48px', marginBottom: '1rem' }}>📭</div>
        <h3 style={{ margin: '0 0 0.5rem 0', color: '#666' }}>No Data Available</h3>
        <p style={{ margin: '0 0 1rem 0' }}>
          This card will display content once data is available.
        </p>
        <button 
          style={{ padding: '0.5rem 1.5rem', cursor: 'pointer', border: 'none', backgroundColor: '#1976d2', color: 'white', borderRadius: '4px' }}
          onClick={() => console.log('Add data clicked')}
        >
          Add Data
        </button>
      </div>
    ),
  },
};

/**
 * Card showing error state.
 */
export const Error: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Card displaying error state with retry option.',
      },
    },
  },
  args: {
    children: (
      <div style={{ padding: '2rem 1.5rem', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '1rem' }}>⚠️</div>
        <h3 style={{ margin: '0 0 0.5rem 0', color: '#d32f2f' }}>Failed to Load Data</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#666' }}>
          Unable to fetch the card content. Please try again.
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
          <button 
            style={{ padding: '0.5rem 1.5rem', cursor: 'pointer', border: 'none', backgroundColor: '#1976d2', color: 'white', borderRadius: '4px' }}
            onClick={() => console.log('Retry clicked')}
          >
            Retry
          </button>
          <button 
            style={{ padding: '0.5rem 1.5rem', cursor: 'pointer', border: '1px solid #e0e0e0', backgroundColor: 'white', borderRadius: '4px' }}
            onClick={() => console.log('Dismiss clicked')}
          >
            Dismiss
          </button>
        </div>
      </div>
    ),
  },
};

/**
 * Tests adapter fallback behavior across providers.
 */
export const AdapterFallback: Story = {
  parameters: {
    docs: {
      description: {
        story: `
This story tests how Card handles provider switching.

**Testing Instructions:**
1. Use the **UI Provider** toolbar control to switch between providers
2. Verify the card renders consistently across providers
3. Check that styling, borders, shadows, and spacing are consistent
4. Test interactive elements (buttons, links) work correctly

**Expected Behavior:**
- MUI provider: Uses Material-UI Card with elevation and theme integration
- Internal/Radix/Shadcn providers: Use their respective card implementations
- All content should render identically regardless of provider
- Styling should adapt to each provider's design system
        `,
      },
    },
  },
  args: {
    children: (
      <div style={{ padding: '1.5rem' }}>
        <h3 style={{ margin: '0 0 0.5rem 0' }}>Provider Test Card</h3>
        <p style={{ margin: '0 0 1rem 0', color: '#666' }}>
          Switch providers using the toolbar to see how this card adapts to different UI libraries.
        </p>
        <div style={{ padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px', marginBottom: '1rem' }}>
          <code style={{ fontSize: '12px' }}>Current Provider: Check toolbar</code>
        </div>
        <button 
          style={{ width: '100%', padding: '0.5rem', cursor: 'pointer', border: 'none', backgroundColor: '#1976d2', color: 'white', borderRadius: '4px' }}
          onClick={() => alert('Button clicked - verify provider styling!')}
        >
          Test Interaction
        </button>
      </div>
    ),
  },
};

