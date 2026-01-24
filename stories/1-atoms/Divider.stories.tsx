import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from '../../src/adapters/Divider';

const meta: Meta<typeof Divider> = {
  title: 'Data Display/Divider',
  component: Divider,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  render: () => (
    <div>
      <p>Content above divider</p>
      <Divider />
      <p>Content below divider</p>
    </div>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <div style={{ padding: '1rem 0' }}>Section 1</div>
      <Divider orientation="horizontal" />
      <div style={{ padding: '1rem 0' }}>Section 2</div>
      <Divider orientation="horizontal" />
      <div style={{ padding: '1rem 0' }}>Section 3</div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', height: '100px', alignItems: 'center' }}>
      <div style={{ padding: '0 1rem' }}>Left</div>
      <Divider orientation="vertical" flexItem />
      <div style={{ padding: '0 1rem' }}>Middle</div>
      <Divider orientation="vertical" flexItem />
      <div style={{ padding: '0 1rem' }}>Right</div>
    </div>
  ),
};

export const InList: Story = {
  render: () => (
    <div style={{ width: '300px', border: '1px solid #e0e0e0', borderRadius: '4px' }}>
      <div style={{ padding: '1rem' }}>Item 1</div>
      <Divider />
      <div style={{ padding: '1rem' }}>Item 2</div>
      <Divider />
      <div style={{ padding: '1rem' }}>Item 3</div>
      <Divider />
      <div style={{ padding: '1rem' }}>Item 4</div>
    </div>
  ),
};

export const InCard: Story = {
  render: () => (
    <div style={{ width: '400px', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '1.5rem' }}>
      <h3 style={{ margin: '0 0 1rem 0' }}>Card Title</h3>
      <Divider />
      <p style={{ margin: '1rem 0' }}>This is the card content that appears below the divider.</p>
      <Divider />
      <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
        <button>Action 1</button>
        <button>Action 2</button>
      </div>
    </div>
  ),
};

export const VerticalInToolbar: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', padding: '0.5rem', border: '1px solid #e0e0e0', borderRadius: '4px' }}>
      <button style={{ padding: '0.5rem 1rem' }}>Button 1</button>
      <Divider orientation="vertical" flexItem />
      <button style={{ padding: '0.5rem 1rem' }}>Button 2</button>
      <Divider orientation="vertical" flexItem />
      <button style={{ padding: '0.5rem 1rem' }}>Button 3</button>
    </div>
  ),
};
