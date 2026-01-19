import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from './Stack';

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
