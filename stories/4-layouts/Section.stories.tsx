import type { Meta, StoryObj } from '@storybook/react';
import { Section } from '../../src/adapters/Section';

const meta: Meta<typeof Section> = {
  title: 'Adapters/Section',
  component: Section,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Section>;

export const Default: Story = {
  render: (args) => (
    <Section {...args}>
      <h2>Section Title</h2>
      <p>This is a section with default (medium) padding.</p>
    </Section>
  ),
};

export const NoPadding: Story = {
  render: (args) => (
    <Section {...args}>
      <h2>No Padding Section</h2>
      <p>This section has no padding.</p>
    </Section>
  ),
  args: {
    padding: 'none',
  },
};

export const SmallPadding: Story = {
  render: (args) => (
    <Section {...args}>
      <h2>Small Padding</h2>
      <p>This section has small padding.</p>
    </Section>
  ),
  args: {
    padding: 'small',
  },
};

export const MediumPadding: Story = {
  render: (args) => (
    <Section {...args}>
      <h2>Medium Padding</h2>
      <p>This section has medium padding (default).</p>
    </Section>
  ),
  args: {
    padding: 'medium',
  },
};

export const LargePadding: Story = {
  render: (args) => (
    <Section {...args}>
      <h2>Large Padding</h2>
      <p>This section has large padding.</p>
    </Section>
  ),
  args: {
    padding: 'large',
  },
};

export const AsArticle: Story = {
  render: (args) => (
    <Section {...args}>
      <h2>Article Section</h2>
      <p>This section is rendered as an article element.</p>
    </Section>
  ),
  args: {
    as: 'article',
  },
};

export const MultipleSection: Story = {
  render: () => (
    <>
      <Section padding="large" as="section" style={{ backgroundColor: '#f5f5f5' }}>
        <h2>Hero Section</h2>
        <p>Large padding for emphasis</p>
      </Section>
      <Section padding="medium" as="section">
        <h2>Content Section</h2>
        <p>Medium padding for main content</p>
      </Section>
      <Section padding="small" as="aside" style={{ backgroundColor: '#e3f2fd' }}>
        <h3>Sidebar</h3>
        <p>Small padding for compact layout</p>
      </Section>
    </>
  ),
};

/**
 * Full-page composition with multiple sections.
 */
export const WithData: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Complete page layout demonstrating section composition with hero, features, and CTA.',
      },
    },
  },
  render: () => (
    <>
      {/* Hero Section */}
      <Section padding="large" as="section" style={{ backgroundColor: '#1976d2', color: 'white' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ margin: '0 0 24px 0', fontSize: '48px' }}>
            Build Better Products Faster
          </h1>
          <p style={{ margin: '0 0 32px 0', fontSize: '20px', opacity: 0.9 }}>
            The complete platform for modern teams to design, develop, and deploy scalable applications.
          </p>
          <button style={{
            padding: '16px 32px',
            backgroundColor: 'white',
            color: '#1976d2',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            Get Started Free
          </button>
        </div>
      </Section>

      {/* Features Section */}
      <Section padding="large" as="section">
        <h2 style={{ textAlign: 'center', margin: '0 0 48px 0', fontSize: '32px' }}>
          Everything You Need
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '32px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{ padding: '24px', backgroundColor: '#e3f2fd', borderRadius: '8px' }}>
            <div style={{ fontSize: '32px', marginBottom: '16px' }}>🚀</div>
            <h3 style={{ margin: '0 0 12px 0' }}>Fast Performance</h3>
            <p style={{ margin: 0, color: '#666' }}>
              Optimized for speed with industry-leading load times and responsiveness.
            </p>
          </div>
          <div style={{ padding: '24px', backgroundColor: '#e8f5e9', borderRadius: '8px' }}>
            <div style={{ fontSize: '32px', marginBottom: '16px' }}>🔒</div>
            <h3 style={{ margin: '0 0 12px 0' }}>Secure by Default</h3>
            <p style={{ margin: 0, color: '#666' }}>
              Enterprise-grade security with automatic updates and compliance.
            </p>
          </div>
          <div style={{ padding: '24px', backgroundColor: '#fff3e0', borderRadius: '8px' }}>
            <div style={{ fontSize: '32px', marginBottom: '16px' }}>📊</div>
            <h3 style={{ margin: '0 0 12px 0' }}>Analytics Built-in</h3>
            <p style={{ margin: 0, color: '#666' }}>
              Comprehensive insights and reporting tools for data-driven decisions.
            </p>
          </div>
        </div>
      </Section>

      {/* Stats Section */}
      <Section padding="medium" as="section" style={{ backgroundColor: '#f5f5f5' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '32px',
          maxWidth: '1000px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#1976d2' }}>50K+</div>
            <div style={{ color: '#666' }}>Active Users</div>
          </div>
          <div>
            <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#1976d2' }}>99.9%</div>
            <div style={{ color: '#666' }}>Uptime</div>
          </div>
          <div>
            <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#1976d2' }}>24/7</div>
            <div style={{ color: '#666' }}>Support</div>
          </div>
          <div>
            <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#1976d2' }}>150+</div>
            <div style={{ color: '#666' }}>Countries</div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section padding="large" as="section">
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          textAlign: 'center',
          padding: '48px 24px',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px'
        }}>
          <h2 style={{ margin: '0 0 16px 0', fontSize: '32px' }}>
            Ready to Get Started?
          </h2>
          <p style={{ margin: '0 0 32px 0', fontSize: '18px', color: '#666' }}>
            Join thousands of teams building better products.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button style={{
              padding: '12px 24px',
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              Start Free Trial
            </button>
            <button style={{
              padding: '12px 24px',
              backgroundColor: 'transparent',
              color: '#1976d2',
              border: '2px solid #1976d2',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              Schedule Demo
            </button>
          </div>
        </div>
      </Section>
    </>
  ),
};

/**
 * Section in loading state.
 */
export const Loading: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Section showing loading state with skeleton content.',
      },
    },
  },
  render: () => (
    <Section padding="large">
      <div style={{
        height: '48px',
        backgroundColor: '#e0e0e0',
        borderRadius: '4px',
        marginBottom: '24px',
        animation: 'pulse 2s infinite'
      }} />
      <div style={{
        height: '200px',
        backgroundColor: '#e0e0e0',
        borderRadius: '4px',
        marginBottom: '16px'
      }} />
      <div style={{
        height: '200px',
        backgroundColor: '#e0e0e0',
        borderRadius: '4px'
      }} />
    </Section>
  ),
};

/**
 * Empty section state.
 */
export const Empty: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Section showing empty state when no content is available.',
      },
    },
  },
  render: () => (
    <Section padding="large">
      <div style={{
        textAlign: 'center',
        padding: '64px 24px',
        border: '2px dashed #e0e0e0',
        borderRadius: '8px'
      }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>📝</div>
        <h2 style={{ margin: '0 0 8px 0', color: '#666' }}>No Content Available</h2>
        <p style={{ margin: 0, color: '#999' }}>
          This section will display content once it's added.
        </p>
      </div>
    </Section>
  ),
};

/**
 * Section showing error state.
 */
export const Error: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Section displaying error state when content fails to load.',
      },
    },
  },
  render: () => (
    <Section padding="large">
      <div style={{
        textAlign: 'center',
        padding: '64px 24px',
        backgroundColor: '#ffebee',
        borderRadius: '8px',
        border: '1px solid #ffcdd2'
      }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>⚠️</div>
        <h2 style={{ margin: '0 0 8px 0', color: '#d32f2f' }}>Failed to Load Section</h2>
        <p style={{ margin: '0 0 24px 0', color: '#666' }}>
          Unable to fetch section content. Please try again.
        </p>
        <button style={{
          padding: '12px 24px',
          backgroundColor: '#d32f2f',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}>
          Retry Loading
        </button>
      </div>
    </Section>
  ),
};

/**
 * Tests Section composition across providers.
 */
export const AdapterFallback: Story = {
  parameters: {
    docs: {
      description: {
        story: `
This story tests how Section handles composition and padding across providers.

**Testing Instructions:**
1. Use the **UI Provider** toolbar to switch between providers
2. Verify padding scales correctly (none, small, medium, large)
3. Check that semantic HTML elements work (section, article, aside)
4. Test composition of multiple sections
5. Verify background colors and borders render properly

**Expected Behavior:**
- Section uses provider's spacing system for padding
- Semantic HTML elements render correctly
- Multiple sections compose naturally
- Background colors and styles apply consistently
- Content flows properly within sections

**Padding Sizes:**
- none: 0
- small: Minimal spacing
- medium: Standard spacing (default)
- large: Generous spacing for emphasis
        `,
      },
    },
  },
  render: () => (
    <>
      <Section padding="large" style={{ backgroundColor: '#e3f2fd' }}>
        <h2 style={{ margin: '0 0 16px 0' }}>Large Padding Section</h2>
        <p style={{ margin: 0 }}>
          This section uses large padding for emphasis. Switch providers to see how padding
          adapts to different spacing systems.
        </p>
      </Section>
      
      <Section padding="medium" style={{ backgroundColor: '#e8f5e9' }}>
        <h2 style={{ margin: '0 0 16px 0' }}>Medium Padding Section (Default)</h2>
        <p style={{ margin: 0 }}>
          Standard padding for general content sections.
        </p>
      </Section>
      
      <Section padding="small" style={{ backgroundColor: '#fff3e0' }}>
        <h2 style={{ margin: '0 0 16px 0' }}>Small Padding Section</h2>
        <p style={{ margin: 0 }}>
          Compact spacing for dense layouts.
        </p>
      </Section>
      
      <Section padding="none" style={{ backgroundColor: '#f3e5f5', border: '2px solid #ce93d8' }}>
        <div style={{ padding: '24px' }}>
          <h2 style={{ margin: '0 0 16px 0' }}>No Padding Section</h2>
          <p style={{ margin: 0 }}>
            This section has no padding from Section component. Border added to show bounds.
            Inner div provides custom padding.
          </p>
        </div>
      </Section>
    </>
  ),
};
