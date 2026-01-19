import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from './Flex';

/**
 * Flex component for creating flexible layouts with CSS flexbox.
 * 
 * ## Features
 * - Row or column direction
 * - Alignment options (justify, align)
 * - Gap spacing
 * - Wrapping support
 */
const meta = {
  title: 'Layout/Flex',
  component: Flex,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'column'],
      description: 'Flex direction',
    },
    justify: {
      control: 'select',
      options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'],
      description: 'Justify content',
    },
    align: {
      control: 'select',
      options: ['flex-start', 'center', 'flex-end', 'stretch'],
      description: 'Align items',
    },
    gap: {
      control: 'number',
      description: 'Gap between items',
    },
    wrap: {
      control: 'boolean',
      description: 'Whether items should wrap',
    },
  },
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default flex row
 */
export const Default: Story = {
  args: {
    direction: 'row',
    gap: 16,
    children: (
      <>
        <div style={{ padding: '16px', background: '#e3f2fd', borderRadius: '4px' }}>Item 1</div>
        <div style={{ padding: '16px', background: '#e8f5e9', borderRadius: '4px' }}>Item 2</div>
        <div style={{ padding: '16px', background: '#fff3e0', borderRadius: '4px' }}>Item 3</div>
      </>
    ),
  },
};

/**
 * Column direction
 */
export const Column: Story = {
  args: {
    direction: 'column',
    gap: 16,
    children: (
      <>
        <div style={{ padding: '16px', background: '#e3f2fd', borderRadius: '4px' }}>Item 1</div>
        <div style={{ padding: '16px', background: '#e8f5e9', borderRadius: '4px' }}>Item 2</div>
        <div style={{ padding: '16px', background: '#fff3e0', borderRadius: '4px' }}>Item 3</div>
      </>
    ),
  },
};

/**
 * Centered content
 */
export const Centered: Story = {
  args: {
    direction: 'row',
    justify: 'center',
    align: 'center',
    gap: 16,
    style: { minHeight: '200px', background: '#f5f5f5', borderRadius: '8px' },
    children: (
      <>
        <div style={{ padding: '16px', background: '#e3f2fd', borderRadius: '4px' }}>Centered</div>
        <div style={{ padding: '16px', background: '#e8f5e9', borderRadius: '4px' }}>Content</div>
      </>
    ),
  },
};

/**
 * Space between items
 */
export const SpaceBetween: Story = {
  args: {
    direction: 'row',
    justify: 'space-between',
    align: 'center',
    style: { padding: '16px', background: '#f5f5f5', borderRadius: '8px' },
    children: (
      <>
        <div style={{ padding: '16px', background: '#e3f2fd', borderRadius: '4px' }}>Left</div>
        <div style={{ padding: '16px', background: '#e8f5e9', borderRadius: '4px' }}>Center</div>
        <div style={{ padding: '16px', background: '#fff3e0', borderRadius: '4px' }}>Right</div>
      </>
    ),
  },
};

/**
 * Space around items
 */
export const SpaceAround: Story = {
  args: {
    direction: 'row',
    justify: 'space-around',
    align: 'center',
    style: { padding: '16px', background: '#f5f5f5', borderRadius: '8px' },
    children: (
      <>
        <div style={{ padding: '16px', background: '#f3e5f5', borderRadius: '4px' }}>Item 1</div>
        <div style={{ padding: '16px', background: '#fce4ec', borderRadius: '4px' }}>Item 2</div>
        <div style={{ padding: '16px', background: '#e8eaf6', borderRadius: '4px' }}>Item 3</div>
      </>
    ),
  },
};

/**
 * Wrapping items
 */
export const WithWrap: Story = {
  args: {
    direction: 'row',
    wrap: true,
    gap: 16,
    style: { maxWidth: '400px' },
    children: (
      <>
        <div style={{ padding: '16px', background: '#e3f2fd', borderRadius: '4px' }}>Item 1</div>
        <div style={{ padding: '16px', background: '#e8f5e9', borderRadius: '4px' }}>Item 2</div>
        <div style={{ padding: '16px', background: '#fff3e0', borderRadius: '4px' }}>Item 3</div>
        <div style={{ padding: '16px', background: '#f3e5f5', borderRadius: '4px' }}>Item 4</div>
        <div style={{ padding: '16px', background: '#fce4ec', borderRadius: '4px' }}>Item 5</div>
        <div style={{ padding: '16px', background: '#e8eaf6', borderRadius: '4px' }}>Item 6</div>
      </>
    ),
  },
};

/**
 * Align end
 */
export const AlignEnd: Story = {
  args: {
    direction: 'row',
    justify: 'flex-end',
    gap: 16,
    style: { padding: '16px', background: '#f5f5f5', borderRadius: '8px' },
    children: (
      <>
        <div style={{ padding: '16px', background: '#e3f2fd', borderRadius: '4px' }}>Item 1</div>
        <div style={{ padding: '16px', background: '#e8f5e9', borderRadius: '4px' }}>Item 2</div>
      </>
    ),
  },
};
