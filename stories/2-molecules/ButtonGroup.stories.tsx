import type { Meta, StoryObj } from '@storybook/react';
import { ButtonGroup } from '../../src/adapters/ButtonGroup';
import { Button } from '../../src/adapters/Button';

/**
 * ButtonGroup component for grouping related buttons together.
 * 
 * ## Features
 * - Horizontal or vertical orientation
 * - Different variants
 * - Size options
 * - Adapts to UI provider
 */
const meta = {
  title: 'Buttons/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'outlined', 'contained'],
      description: 'Button variant',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Button size',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Group orientation',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether all buttons are disabled',
    },
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default button group
 */
export const Default: Story = {
  args: {
    variant: 'contained',
    children: (
      <>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </>
    ),
  },
};

/**
 * Outlined variant
 */
export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: (
      <>
        <Button>Option A</Button>
        <Button>Option B</Button>
        <Button>Option C</Button>
      </>
    ),
  },
};

/**
 * Text variant
 */
export const Text: Story = {
  args: {
    variant: 'text',
    children: (
      <>
        <Button>Edit</Button>
        <Button>Delete</Button>
        <Button>Share</Button>
      </>
    ),
  },
};

/**
 * Small size
 */
export const Small: Story = {
  args: {
    variant: 'contained',
    size: 'small',
    children: (
      <>
        <Button>Small 1</Button>
        <Button>Small 2</Button>
        <Button>Small 3</Button>
      </>
    ),
  },
};

/**
 * Large size
 */
export const Large: Story = {
  args: {
    variant: 'outlined',
    size: 'large',
    children: (
      <>
        <Button>Large A</Button>
        <Button>Large B</Button>
      </>
    ),
  },
};

/**
 * Vertical orientation
 */
export const Vertical: Story = {
  args: {
    variant: 'outlined',
    orientation: 'vertical',
    children: (
      <>
        <Button>Top</Button>
        <Button>Middle</Button>
        <Button>Bottom</Button>
      </>
    ),
  },
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {
    variant: 'contained',
    disabled: true,
    children: (
      <>
        <Button>Disabled 1</Button>
        <Button>Disabled 2</Button>
        <Button>Disabled 3</Button>
      </>
    ),
  },
};

/**
 * View mode selector
 */
export const ViewModeSelector: Story = {
  args: {
    variant: 'outlined',
    size: 'small',
    children: (
      <>
        <Button>📋 List</Button>
        <Button>🔲 Grid</Button>
        <Button>📊 Chart</Button>
      </>
    ),
  },
};

/**
 * Text formatting
 */
export const TextFormatting: Story = {
  args: {
    variant: 'outlined',
    size: 'small',
    children: (
      <>
        <Button style={{ fontWeight: 'bold' }}>B</Button>
        <Button style={{ fontStyle: 'italic' }}>I</Button>
        <Button style={{ textDecoration: 'underline' }}>U</Button>
        <Button>S</Button>
      </>
    ),
  },
};

/**
 * Pagination controls
 */
export const PaginationControls: Story = {
  args: {
    variant: 'contained',
    children: (
      <>
        <Button>← Prev</Button>
        <Button>1</Button>
        <Button>2</Button>
        <Button>3</Button>
        <Button>Next →</Button>
      </>
    ),
  },
};

/**
 * Download options
 */
export const DownloadOptions: Story = {
  args: {
    variant: 'outlined',
    children: (
      <>
        <Button>PDF</Button>
        <Button>CSV</Button>
        <Button>Excel</Button>
        <Button>JSON</Button>
      </>
    ),
  },
};
