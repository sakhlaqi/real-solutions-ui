import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from '../adapters/Tooltip';
import { Button } from '../adapters/Button';

/**
 * Tooltip component that adapts to the selected UI provider.
 * 
 * ## Supported Providers
 * - **internal**: Custom in-house implementation
 * - **mui**: Material-UI Tooltip
 */
const meta = {
  title: 'Overlay/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'This is a tooltip',
    children: <Button>Hover me</Button>,
  },
};

export const Placements: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '3rem', padding: '3rem' }}>
      <Tooltip title="Top tooltip" placement="top">
        <Button>Top</Button>
      </Tooltip>
      <Tooltip title="Bottom tooltip" placement="bottom">
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip title="Left tooltip" placement="left">
        <Button>Left</Button>
      </Tooltip>
      <Tooltip title="Right tooltip" placement="right">
        <Button>Right</Button>
      </Tooltip>
    </div>
  ),
};

export const LongText: Story = {
  args: {
    title: 'This is a much longer tooltip text that demonstrates how the tooltip handles multiple lines of content. It should wrap appropriately and remain readable.',
    children: <Button>Hover for long text</Button>,
  },
};

export const OnDisabledElement: Story = {
  render: () => (
    <Tooltip title="Cannot click disabled button">
      <span>
        <Button disabled>Disabled Button</Button>
      </span>
    </Tooltip>
  ),
};

export const Interactive: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Tooltip title="Save your work">
        <Button variant="contained" color="primary">Save</Button>
      </Tooltip>
      <Tooltip title="Delete this item">
        <Button variant="outlined" color="error">Delete</Button>
      </Tooltip>
      <Tooltip title="Get help">
        <Button variant="text">Help</Button>
      </Tooltip>
    </div>
  ),
};
