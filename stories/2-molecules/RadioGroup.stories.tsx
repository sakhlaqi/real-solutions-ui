import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from '../../src/adapters/RadioGroup';
import { useState } from 'react';

/**
 * RadioGroup component that adapts to the selected UI provider.
 * 
 * ## Supported Providers
 * - **internal**: Custom in-house implementation
 * - **mui**: Material-UI RadioGroup

 */
const meta = {
  title: 'Forms/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: 'boolean',
    },
    row: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const basicOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

export const Default: Story = {
  args: {
    value: 'option1',
    onChange: () => {},
    options: basicOptions,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Choose an option',
    value: 'option1',
    onChange: () => {},
    options: basicOptions,
  },
};

export const Horizontal: Story = {
  args: {
    label: 'Horizontal layout',
    value: 'option1',
    onChange: () => {},
    options: basicOptions,
    row: true,
  },
};

export const Vertical: Story = {
  args: {
    label: 'Vertical layout',
    value: 'option1',
    onChange: () => {},
    options: basicOptions,
    row: false,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled radio group',
    value: 'option1',
    onChange: () => {},
    options: basicOptions,
    disabled: true,
  },
};

export const WithDisabledOption: Story = {
  args: {
    label: 'With disabled option',
    value: 'option1',
    onChange: () => {},
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2 (disabled)', disabled: true },
      { value: 'option3', label: 'Option 3' },
    ],
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <RadioGroup
        label="Small"
        value="option1"
        onChange={() => {}}
        options={basicOptions}
        size="small"
      />
      <RadioGroup
        label="Medium"
        value="option1"
        onChange={() => {}}
        options={basicOptions}
        size="medium"
      />
      <RadioGroup
        label="Large"
        value="option1"
        onChange={() => {}}
        options={basicOptions}
        size="large"
      />
    </div>
  ),
};

export const ManyOptions: Story = {
  args: {
    label: 'Select your favorite color',
    value: 'red',
    onChange: () => {},
    options: [
      { value: 'red', label: 'Red' },
      { value: 'blue', label: 'Blue' },
      { value: 'green', label: 'Green' },
      { value: 'yellow', label: 'Yellow' },
      { value: 'purple', label: 'Purple' },
      { value: 'orange', label: 'Orange' },
    ],
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('option1');
    return (
      <div>
        <RadioGroup
          label="Choose an option"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          options={basicOptions}
        />
        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f5f5f5' }}>
          Selected: <strong>{value}</strong>
        </div>
      </div>
    );
  },
};

export const Quiz: Story = {
  render: () => {
    const [answer, setAnswer] = useState('');
    const [submitted, setSubmitted] = useState(false);
    
    return (
      <div style={{ maxWidth: '400px' }}>
        <h3 style={{ marginTop: 0 }}>What is 2 + 2?</h3>
        <RadioGroup
          value={answer}
          onChange={(value) => {
            setAnswer(value);
            setSubmitted(false);
          }}
          options={[
            { value: '3', label: '3' },
            { value: '4', label: '4' },
            { value: '5', label: '5' },
            { value: '22', label: '22' },
          ]}
        />
        <button
          onClick={() => setSubmitted(true)}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
          }}
          disabled={!answer}
        >
          Submit
        </button>
        {submitted && (
          <div
            style={{
              marginTop: '1rem',
              padding: '1rem',
              backgroundColor: answer === '4' ? '#d4edda' : '#f8d7da',
              color: answer === '4' ? '#155724' : '#721c24',
              borderRadius: '4px',
            }}
          >
            {answer === '4' ? '✓ Correct!' : '✗ Incorrect. Try again!'}
          </div>
        )}
      </div>
    );
  },
};
