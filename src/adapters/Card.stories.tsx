import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../adapters/Card';

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
