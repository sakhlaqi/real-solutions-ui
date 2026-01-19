import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TextareaAutosize } from './TextareaAutosize';

const meta: Meta<typeof TextareaAutosize> = {
  title: 'Adapters/TextareaAutosize',
  component: TextareaAutosize,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TextareaAutosize>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <TextareaAutosize {...args} value={value} onChange={setValue} />;
  },
  args: {
    placeholder: 'Type something...',
    minRows: 3,
  },
};

export const WithLabel: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <TextareaAutosize {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Description',
    placeholder: 'Enter description...',
    minRows: 3,
  },
};

export const WithMaxRows: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <TextareaAutosize {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Limited Height',
    placeholder: 'This textarea will grow up to 5 rows...',
    minRows: 2,
    maxRows: 5,
    helperText: 'Maximum 5 rows',
  },
};

export const WithError: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <TextareaAutosize {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Comments',
    placeholder: 'Enter comments...',
    minRows: 3,
    error: true,
    helperText: 'This field is required',
  },
};

export const Disabled: Story = {
  render: (args) => {
    return <TextareaAutosize {...args} />;
  },
  args: {
    label: 'Disabled Field',
    value: 'This textarea is disabled',
    disabled: true,
    minRows: 3,
  },
};

export const FullWidth: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <TextareaAutosize {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Full Width Textarea',
    placeholder: 'This takes the full width...',
    minRows: 4,
    fullWidth: true,
  },
};
