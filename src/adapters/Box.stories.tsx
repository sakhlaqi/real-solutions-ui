import type { Meta, StoryObj } from '@storybook/react';
import { Box } from './Box';

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
