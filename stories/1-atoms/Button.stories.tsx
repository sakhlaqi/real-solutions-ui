import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../src/adapters/Button';
import { BaseButtonProps } from '../../src/core/types';

/**
 * Button component that adapts to the selected UI provider.
 * 
 * ## Supported Providers
 * - **internal**: Custom in-house implementation
 * - **mui**: Material-UI Button
 * - **radix**: Radix UI Button (via Themes)
 * - **shadcn**: shadcn/ui Button (Radix + Tailwind)
 * 
 * ## Usage
 * Switch providers using the toolbar at the top of the page.
 */
const meta = {
  title: 'Buttons/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component that adapts to different UI providers while maintaining a consistent API.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'text'],
      description: 'The visual style variant of the button',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'warning', 'info', 'success'],
      description: 'The color theme of the button',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the button takes full width',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default button with contained variant
 */
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'contained',
    color: 'primary',
  },
};

/**
 * All button variants side by side
 */
export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button {...args} variant="contained">Contained</Button>
      <Button {...args} variant="outlined">Outlined</Button>
      <Button {...args} variant="text">Text</Button>
    </div>
  ),
  args: {
    color: 'primary',
  },
};

/**
 * All available color options
 */
export const Colors: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button {...args} color="primary">Primary</Button>
      <Button {...args} color="secondary">Secondary</Button>
      <Button {...args} color="error">Error</Button>
      <Button {...args} color="warning">Warning</Button>
      <Button {...args} color="info">Info</Button>
      <Button {...args} color="success">Success</Button>
    </div>
  ),
  args: {
    variant: 'contained',
  },
};

/**
 * Different button sizes
 */
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button {...args} size="small">Small</Button>
      <Button {...args} size="medium">Medium</Button>
      <Button {...args} size="large">Large</Button>
    </div>
  ),
  args: {
    variant: 'contained',
    color: 'primary',
  },
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button {...args} variant="contained" disabled>Contained</Button>
      <Button {...args} variant="outlined" disabled>Outlined</Button>
      <Button {...args} variant="text" disabled>Text</Button>
    </div>
  ),
  args: {
    color: 'primary',
  },
};

/**
 * Full width button
 */
export const FullWidth: Story = {
  args: {
    children: 'Full Width Button',
    variant: 'contained',
    color: 'primary',
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px', maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Button with icons
 */
export const WithIcons: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button {...args} startIcon={<span>→</span>}>Start Icon</Button>
      <Button {...args} endIcon={<span>←</span>}>End Icon</Button>
      <Button {...args} startIcon={<span>→</span>} endIcon={<span>←</span>}>Both Icons</Button>
    </div>
  ),
  args: {
    variant: 'contained',
    color: 'primary',
  },
};

/**
 * Interactive example with click handler
 */
export const Interactive: Story = {
  args: {
    children: 'Click Me',
    variant: 'contained',
    color: 'primary',
    onClick: () => alert('Button clicked!'),
  },
};
