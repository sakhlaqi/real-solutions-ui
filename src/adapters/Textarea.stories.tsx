import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';
import { useState } from 'react';

const meta: Meta<typeof Textarea> = {
  title: 'Forms/Textarea',
  component: Textarea,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text here...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter description',
  },
};

export const WithRows: Story = {
  args: {
    label: 'Comments',
    placeholder: 'Enter your comments',
    rows: 6,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself',
    helperText: 'Maximum 500 characters',
    rows: 4,
  },
};

export const WithError: Story = {
  args: {
    label: 'Message',
    placeholder: 'Enter message',
    error: 'This field is required',
    rows: 4,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    value: 'This textarea is disabled',
    disabled: true,
    rows: 3,
  },
};

export const Required: Story = {
  args: {
    label: 'Required Field',
    placeholder: 'This field is required',
    required: true,
    rows: 4,
  },
};

export const WithMaxLength: Story = {
  args: {
    label: 'Tweet',
    placeholder: 'What\'s happening?',
    maxLength: 280,
    helperText: 'Maximum 280 characters',
    rows: 4,
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div style={{ maxWidth: 500 }}>
        <Textarea
          label="Controlled Textarea"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type something..."
          helperText={`Character count: ${value.length}`}
          rows={5}
        />
        <div style={{ marginTop: '1rem', fontSize: '0.875rem' }}>
          <strong>Value:</strong> {value || '(empty)'}
        </div>
      </div>
    );
  },
};

export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      comments: '',
    });

    return (
      <form style={{ maxWidth: 500 }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <Textarea
            label="Title"
            placeholder="Enter title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            rows={2}
          />
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <Textarea
            label="Description"
            placeholder="Enter description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            helperText="Provide a detailed description"
            rows={4}
          />
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <Textarea
            label="Additional Comments"
            placeholder="Enter any additional comments"
            value={formData.comments}
            onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
            rows={3}
          />
        </div>
      </form>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: 500 }}>
      <Textarea
        label="Small (2 rows)"
        placeholder="Small textarea"
        rows={2}
      />
      <Textarea
        label="Medium (4 rows)"
        placeholder="Medium textarea"
        rows={4}
      />
      <Textarea
        label="Large (8 rows)"
        placeholder="Large textarea"
        rows={8}
      />
    </div>
  ),
};
