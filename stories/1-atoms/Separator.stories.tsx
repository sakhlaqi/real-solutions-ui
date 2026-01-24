import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from '../../src/adapters/Separator';

/**
 * Separator component for visually dividing content.
 * 
 * ## Features
 * - Horizontal and vertical orientations
 * - Semantic or decorative
 * - Adapts to UI provider
 */
const meta = {
  title: 'Data Display/Separator',
  component: Separator,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Horizontal separator
 */
export const Horizontal: Story = {
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <p>Content above the separator</p>
      <Separator />
      <p>Content below the separator</p>
    </div>
  ),
  args: {},
};

/**
 * Vertical separator
 */
export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', height: '100px' }}>
      <div>Left Content</div>
      <Separator orientation="vertical" />
      <div>Right Content</div>
    </div>
  ),
  args: {
    orientation: 'vertical',
  },
};

/**
 * In a toolbar/menu
 */
export const InToolbar: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '0.5rem',
      padding: '0.5rem',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9'
    }}>
      <button style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white' }}>
        File
      </button>
      <button style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white' }}>
        Edit
      </button>
      <Separator orientation="vertical" style={{ height: '24px' }} />
      <button style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white' }}>
        View
      </button>
      <button style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white' }}>
        Help
      </button>
    </div>
  ),
  args: {},
};

/**
 * Between sections
 */
export const BetweenSections: Story = {
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <div>
        <h3>Section 1</h3>
        <p>This is the first section with some content. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <Separator style={{ margin: '2rem 0' }} />
      <div>
        <h3>Section 2</h3>
        <p>This is the second section with different content. Sed do eiusmod tempor incididunt ut labore.</p>
      </div>
      <Separator style={{ margin: '2rem 0' }} />
      <div>
        <h3>Section 3</h3>
        <p>This is the third section. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
      </div>
    </div>
  ),
  args: {},
};

/**
 * In a list
 */
export const InList: Story = {
  render: () => (
    <div style={{ maxWidth: '400px', border: '1px solid #ddd', borderRadius: '8px', padding: '1rem' }}>
      <div style={{ padding: '0.5rem 0' }}>
        <strong>Item 1</strong>
        <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: '#666' }}>Description for item 1</p>
      </div>
      <Separator style={{ margin: '1rem 0' }} />
      <div style={{ padding: '0.5rem 0' }}>
        <strong>Item 2</strong>
        <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: '#666' }}>Description for item 2</p>
      </div>
      <Separator style={{ margin: '1rem 0' }} />
      <div style={{ padding: '0.5rem 0' }}>
        <strong>Item 3</strong>
        <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: '#666' }}>Description for item 3</p>
      </div>
    </div>
  ),
  args: {},
};
