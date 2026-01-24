import type { Meta, StoryObj } from '@storybook/react';
import { Container } from '../../src/adapters/Container';

/**
 * Container component centers content with a maximum width.
 * 
 * ## Features
 * - Responsive max-width options
 * - Centered content
 * - Optional padding
 */
const meta = {
  title: 'Layout/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    maxWidth: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'Maximum width of the container',
    },
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Small container
 */
export const Small: Story = {
  args: {
    maxWidth: 'sm',
    children: (
      <div style={{ 
        padding: '32px', 
        background: '#e3f2fd', 
        borderRadius: '8px',
        minHeight: '200px' 
      }}>
        <h2>Small Container</h2>
        <p>This container has a small max-width, ideal for forms and focused content.</p>
      </div>
    ),
  },
};

/**
 * Medium container (default)
 */
export const Medium: Story = {
  args: {
    maxWidth: 'md',
    children: (
      <div style={{ 
        padding: '32px', 
        background: '#e8f5e9', 
        borderRadius: '8px',
        minHeight: '200px' 
      }}>
        <h2>Medium Container</h2>
        <p>This is the default container size, suitable for most content.</p>
      </div>
    ),
  },
};

/**
 * Large container
 */
export const Large: Story = {
  args: {
    maxWidth: 'lg',
    children: (
      <div style={{ 
        padding: '32px', 
        background: '#fff3e0', 
        borderRadius: '8px',
        minHeight: '200px' 
      }}>
        <h2>Large Container</h2>
        <p>A large container for wider content layouts.</p>
      </div>
    ),
  },
};

/**
 * Extra large container
 */
export const ExtraLarge: Story = {
  args: {
    maxWidth: 'xl',
    children: (
      <div style={{ 
        padding: '32px', 
        background: '#f3e5f5', 
        borderRadius: '8px',
        minHeight: '200px' 
      }}>
        <h2>Extra Large Container</h2>
        <p>The largest container size for expansive layouts and dashboards.</p>
      </div>
    ),
  },
};

/**
 * Multiple content sections
 */
export const WithMultipleSections: Story = {
  args: {
    maxWidth: 'lg',
    children: (
      <>
        <div style={{ 
          padding: '32px', 
          background: '#e3f2fd', 
          borderRadius: '8px',
          marginBottom: '16px' 
        }}>
          <h2>Section 1</h2>
          <p>First section of content.</p>
        </div>
        <div style={{ 
          padding: '32px', 
          background: '#e8f5e9', 
          borderRadius: '8px',
          marginBottom: '16px' 
        }}>
          <h2>Section 2</h2>
          <p>Second section of content.</p>
        </div>
        <div style={{ 
          padding: '32px', 
          background: '#fff3e0', 
          borderRadius: '8px' 
        }}>
          <h2>Section 3</h2>
          <p>Third section of content.</p>
        </div>
      </>
    ),
  },
};

/**
 * Container with realistic page content.
 */
export const WithData: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Blog post layout showing typical content page with Container for centered, readable width.',
      },
    },
  },
  args: {
    maxWidth: 'md',
    children: (
      <div style={{ padding: '48px 0' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ margin: '0 0 16px 0', fontSize: '36px' }}>
            Building Scalable React Applications
          </h1>
          <div style={{ color: '#666', fontSize: '14px', marginBottom: '24px' }}>
            Published on January 24, 2026 • 8 min read
          </div>
          <div style={{
            padding: '16px',
            backgroundColor: '#e3f2fd',
            borderLeft: '4px solid #1976d2',
            borderRadius: '4px',
            marginBottom: '24px'
          }}>
            <strong>TL;DR:</strong> Learn best practices for building maintainable React applications
            with proper component architecture and state management.
          </div>
        </div>
        
        <div style={{ lineHeight: 1.8, color: '#333' }}>
          <h2>Introduction</h2>
          <p>
            Building scalable React applications requires careful planning and architectural decisions.
            In this article, we'll explore key patterns and practices that help maintain code quality
            as your application grows.
          </p>
          
          <h2>Component Architecture</h2>
          <p>
            A well-structured component hierarchy is crucial for maintainability. Consider using
            the atomic design methodology to organize your components into atoms, molecules, and organisms.
          </p>
          
          <div style={{
            padding: '16px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
            marginBottom: '16px',
            fontFamily: 'monospace'
          }}>
            <code>
              src/<br/>
              &nbsp;&nbsp;components/<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;atoms/<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;molecules/<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;organisms/<br/>
            </code>
          </div>
          
          <h2>State Management</h2>
          <p>
            Choose the right state management solution for your needs. Context API works well for
            simpler applications, while Redux or Zustand may be better for complex state requirements.
          </p>
        </div>
      </div>
    ),
  },
};

/**
 * Container with responsive max-width based on content type.
 */
export const ResponsiveMaxWidth: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Container that adjusts max-width at different breakpoints for optimal reading experience.',
      },
    },
  },
  render: () => (
    <Container
      maxWidth="lg"
      sx={{
        bgcolor: '#f5f5f5',
        minHeight: '100vh',
        py: 4,
      }}
    >
      <div style={{
        padding: '24px',
        backgroundColor: 'white',
        borderRadius: '8px',
        marginBottom: '16px'
      }}>
        <h2>Responsive Container</h2>
        <p>
          This container uses the 'lg' max-width, which automatically adjusts based on the
          provider's breakpoint system. Resize your browser to see how the container width
          responds to different screen sizes.
        </p>
        <div style={{
          padding: '16px',
          backgroundColor: '#e3f2fd',
          borderRadius: '4px',
          marginTop: '16px'
        }}>
          <strong>Breakpoint Behavior:</strong>
          <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
            <li>xs (mobile): Full width with padding</li>
            <li>sm (tablet): Moderate max-width</li>
            <li>md (desktop): Comfortable reading width</li>
            <li>lg (large): Expanded for more content</li>
          </ul>
        </div>
      </div>
    </Container>
  ),
};

/**
 * Container in loading state.
 */
export const Loading: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Container showing loading state with skeleton placeholders.',
      },
    },
  },
  args: {
    maxWidth: 'md',
    children: (
      <div style={{ padding: '32px 0' }}>
        <div style={{
          height: '48px',
          backgroundColor: '#e0e0e0',
          borderRadius: '4px',
          marginBottom: '16px',
          animation: 'pulse 2s infinite'
        }} />
        <div style={{
          height: '24px',
          backgroundColor: '#e0e0e0',
          borderRadius: '4px',
          marginBottom: '32px',
          width: '60%'
        }} />
        <div style={{
          height: '120px',
          backgroundColor: '#e0e0e0',
          borderRadius: '4px',
          marginBottom: '16px'
        }} />
        <div style={{
          height: '120px',
          backgroundColor: '#e0e0e0',
          borderRadius: '4px'
        }} />
      </div>
    ),
  },
};

/**
 * Empty container state.
 */
export const Empty: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Container showing empty state when no content is available.',
      },
    },
  },
  args: {
    maxWidth: 'sm',
    children: (
      <div style={{
        padding: '64px 32px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>📄</div>
        <h2 style={{ margin: '0 0 8px 0', color: '#666' }}>No Content Yet</h2>
        <p style={{ margin: '0 0 24px 0', color: '#999' }}>
          This page will display content once it's available.
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
        >
          Create Content
        </button>
      </div>
    ),
  },
};

/**
 * Container showing error state.
 */
export const Error: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Container displaying error state when content fails to load.',
      },
    },
  },
  args: {
    maxWidth: 'sm',
    children: (
      <div style={{
        padding: '64px 32px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>⚠️</div>
        <h2 style={{ margin: '0 0 8px 0', color: '#d32f2f' }}>Failed to Load Page</h2>
        <p style={{ margin: '0 0 24px 0', color: '#666' }}>
          Unable to fetch the content. Please try again.
        </p>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
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
          >
            Go Home
          </button>
        </div>
      </div>
    ),
  },
};

/**
 * Tests Container responsive behavior across providers.
 */
export const AdapterFallback: Story = {
  parameters: {
    docs: {
      description: {
        story: `
This story tests how Container handles responsive max-width across providers.

**Testing Instructions:**
1. **Resize your browser window** to see max-width adapt
2. Use the **UI Provider** toolbar to switch between providers
3. Verify Container stays centered at all sizes
4. Check that padding is applied on smaller screens
5. Test that max-width follows provider breakpoint system

**Expected Behavior:**
- Container centers content horizontally
- Max-width adapts to provider's breakpoint values
- Padding prevents content from touching edges on mobile
- Content remains readable at all viewport sizes
- Provider theme is applied consistently

**Max-Width Sizes (MUI default):**
- xs: 444px
- sm: 600px
- md: 900px
- lg: 1200px
- xl: 1536px
        `,
      },
    },
  },
  render: () => (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', paddingTop: '32px', paddingBottom: '32px' }}>
      <div style={{
        padding: '16px',
        marginBottom: '32px',
        textAlign: 'center',
        backgroundColor: 'white',
        maxWidth: '600px',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: '8px'
      }}>
        <strong>🔍 Resize browser</strong> to see Container max-width adapt to breakpoints
      </div>
      
      <Container maxWidth="sm" sx={{ mb: 4 }}>
        <div style={{
          padding: '24px',
          backgroundColor: '#e3f2fd',
          borderRadius: '8px',
        }}>
          <h3 style={{ margin: '0 0 8px 0' }}>Small Container (sm)</h3>
          <p style={{ margin: 0, fontSize: '14px' }}>
            Max-width: ~600px - Ideal for forms and focused content
          </p>
        </div>
      </Container>
      
      <Container maxWidth="md" sx={{ mb: 4 }}>
        <div style={{
          padding: '24px',
          backgroundColor: '#e8f5e9',
          borderRadius: '8px',
        }}>
          <h3 style={{ margin: '0 0 8px 0' }}>Medium Container (md)</h3>
          <p style={{ margin: 0, fontSize: '14px' }}>
            Max-width: ~900px - Default for article content and general pages
          </p>
        </div>
      </Container>
      
      <Container maxWidth="lg">
        <div style={{
          padding: '24px',
          backgroundColor: '#fff3e0',
          borderRadius: '8px',
        }}>
          <h3 style={{ margin: '0 0 8px 0' }}>Large Container (lg)</h3>
          <p style={{ margin: 0, fontSize: '14px' }}>
            Max-width: ~1200px - For dashboards and data-heavy interfaces
          </p>
        </div>
      </Container>
    </div>
  ),
};
