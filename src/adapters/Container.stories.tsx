import type { Meta, StoryObj } from '@storybook/react';
import { Container } from './Container';

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
