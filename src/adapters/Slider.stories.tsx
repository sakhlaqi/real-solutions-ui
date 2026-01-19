import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from '../adapters/Slider';
import { useState } from 'react';

/**
 * Slider component that adapts to the selected UI provider.
 * 
 * ## Supported Providers
 * - **internal**: Custom in-house implementation
 * - **mui**: Material-UI Slider
 * - **radix**: Radix UI Slider
 * - **shadcn**: shadcn/ui Slider (Radix + Tailwind)
 */
const meta = {
  title: 'Forms/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'warning', 'info', 'success'],
    },
    disabled: {
      control: 'boolean',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: 50,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px', padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithMinMax: Story = {
  args: {
    defaultValue: 30,
    min: 0,
    max: 100,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px', padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithStep: Story = {
  args: {
    defaultValue: 20,
    min: 0,
    max: 100,
    step: 10,
    marks: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px', padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
};

export const CustomMarks: Story = {
  args: {
    defaultValue: 20,
    min: 0,
    max: 100,
    marks: [
      { value: 0, label: '0°C' },
      { value: 25, label: '25°C' },
      { value: 50, label: '50°C' },
      { value: 75, label: '75°C' },
      { value: 100, label: '100°C' },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px', padding: '3rem' }}>
        <Story />
      </div>
    ),
  ],
};

export const Range: Story = {
  args: {
    defaultValue: [20, 60],
    min: 0,
    max: 100,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px', padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
};

export const Disabled: Story = {
  args: {
    defaultValue: 50,
    disabled: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px', padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
};

export const Sizes: Story = {
  render: () => (
    <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '3rem', padding: '2rem' }}>
      <div>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Small</div>
        <Slider defaultValue={30} size="small" />
      </div>
      <div>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Medium</div>
        <Slider defaultValue={50} size="medium" />
      </div>
      <div>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Large</div>
        <Slider defaultValue={70} size="large" />
      </div>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem' }}>
      <Slider defaultValue={50} color="primary" />
      <Slider defaultValue={50} color="secondary" />
      <Slider defaultValue={50} color="success" />
      <Slider defaultValue={50} color="error" />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState(50);
    return (
      <div style={{ width: '300px', padding: '2rem' }}>
        <div style={{ marginBottom: '1rem', textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
          {value}
        </div>
        <Slider
          value={value}
          onChange={(val) => setValue(val as number)}
          min={0}
          max={100}
        />
      </div>
    );
  },
};

export const Volume: Story = {
  render: () => {
    const [volume, setVolume] = useState(70);
    return (
      <div style={{ width: '300px', padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🔊</span>
          <Slider
            value={volume}
            onChange={(val) => setVolume(val as number)}
            min={0}
            max={100}
          />
          <span style={{ minWidth: '3rem', textAlign: 'right' }}>{volume}%</span>
        </div>
      </div>
    );
  },
};
