import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from '../../src/adapters/Progress';

const meta: Meta<typeof Progress> = {
  title: 'Feedback/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Indeterminate: Story = {
  args: {
    variant: 'indeterminate',
  },
};

export const Determinate: Story = {
  args: {
    variant: 'determinate',
    value: 65,
  },
};

export const LinearIndeterminate: Story = {
  args: {
    linear: true,
    variant: 'indeterminate',
  },
};

export const LinearDeterminate: Story = {
  args: {
    linear: true,
    variant: 'determinate',
    value: 75,
  },
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <Progress linear variant="determinate" value={100} color="primary" />
      <Progress linear variant="determinate" value={80} color="secondary" />
      <Progress linear variant="determinate" value={60} color="success" />
      <Progress linear variant="determinate" value={40} color="error" />
      <Progress linear variant="determinate" value={20} color="warning" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Progress variant="determinate" value={75} size={20} />
      <Progress variant="determinate" value={75} size={40} />
      <Progress variant="determinate" value={75} size={60} />
      <Progress variant="determinate" value={75} size={80} />
    </div>
  ),
};

export const ProgressStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <div>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>0%</div>
        <Progress linear variant="determinate" value={0} />
      </div>
      <div>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>25%</div>
        <Progress linear variant="determinate" value={25} />
      </div>
      <div>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>50%</div>
        <Progress linear variant="determinate" value={50} />
      </div>
      <div>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>75%</div>
        <Progress linear variant="determinate" value={75} />
      </div>
      <div>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>100%</div>
        <Progress linear variant="determinate" value={100} />
      </div>
    </div>
  ),
};

export const CircularSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <Progress variant="determinate" value={75} size={30} />
        <div style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>Small</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Progress variant="determinate" value={75} size={50} />
        <div style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>Medium</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Progress variant="determinate" value={75} size={70} />
        <div style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>Large</div>
      </div>
    </div>
  ),
};

export const LoadingStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
      <div>
        <div style={{ marginBottom: '1rem', textAlign: 'center' }}>Loading...</div>
        <Progress variant="indeterminate" color="primary" />
      </div>
      <div style={{ width: '300px' }}>
        <div style={{ marginBottom: '1rem', textAlign: 'center' }}>Processing file...</div>
        <Progress linear variant="indeterminate" color="secondary" />
      </div>
    </div>
  ),
};
