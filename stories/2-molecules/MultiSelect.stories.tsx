import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { MultiSelect } from '../../src/adapters/MultiSelect';

/**
 * MultiSelect component for selecting multiple options from a dropdown.
 * 
 * ## Features
 * - Multiple selection with chips
 * - Search/filter options
 * - Clear all selections
 * - Custom option rendering
 */
const meta = {
  title: 'Forms/MultiSelect',
  component: MultiSelect,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the select',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled',
    },
  },
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const frameworkOptions = [
  { id: 'react', value: 'react', label: 'React' },
  { id: 'vue', value: 'vue', label: 'Vue.js' },
  { id: 'angular', value: 'angular', label: 'Angular' },
  { id: 'svelte', value: 'svelte', label: 'Svelte' },
  { id: 'nextjs', value: 'nextjs', label: 'Next.js' },
  { id: 'nuxt', value: 'nuxt', label: 'Nuxt.js' },
];

/**
 * Default multi-select
 */
export const Default: Story = {
  args: {
    label: 'Select Frameworks',
    placeholder: 'Choose frameworks...',
    options: frameworkOptions,
  },
};

/**
 * With pre-selected values
 */
export const WithPreselectedValues: Story = {
  args: {
    label: 'Favorite Frameworks',
    options: frameworkOptions,
    value: [
      { id: 'react', value: 'react', label: 'React' },
      { id: 'nextjs', value: 'nextjs', label: 'Next.js' },
    ],
  },
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {
    label: 'Disabled Multi-Select',
    options: frameworkOptions,
    value: [{ id: 'react', value: 'react', label: 'React' }],
    disabled: true,
  },
};

/**
 * Interactive example
 */
export const Interactive: Story = {
  render: () => {
    const [selected, setSelected] = useState<any[]>([]);
    
    return (
      <div style={{ minWidth: '400px' }}>
        <MultiSelect
          label="Select Technologies"
          placeholder="Choose your tech stack..."
          options={frameworkOptions}
          value={selected}
          onChange={(value) => setSelected(value)}
        />
        <div style={{ marginTop: '16px', padding: '16px', background: '#f5f5f5', borderRadius: '4px' }}>
          <strong>Selected ({selected.length}):</strong>
          {selected.length > 0 ? (
            <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
              {selected.map(item => (
                <li key={item.id}>{item.label}</li>
              ))}
            </ul>
          ) : (
            <p style={{ margin: '8px 0' }}>No selections</p>
          )}
        </div>
      </div>
    );
  },
};

/**
 * With many options
 */
export const ManyOptions: Story = {
  render: () => {
    const [selected, setSelected] = useState<any[]>([]);
    
    const countries = [
      { id: 'us', value: 'us', label: 'United States' },
      { id: 'uk', value: 'uk', label: 'United Kingdom' },
      { id: 'ca', value: 'ca', label: 'Canada' },
      { id: 'au', value: 'au', label: 'Australia' },
      { id: 'de', value: 'de', label: 'Germany' },
      { id: 'fr', value: 'fr', label: 'France' },
      { id: 'es', value: 'es', label: 'Spain' },
      { id: 'it', value: 'it', label: 'Italy' },
      { id: 'jp', value: 'jp', label: 'Japan' },
      { id: 'cn', value: 'cn', label: 'China' },
      { id: 'in', value: 'in', label: 'India' },
      { id: 'br', value: 'br', label: 'Brazil' },
      { id: 'mx', value: 'mx', label: 'Mexico' },
      { id: 'ru', value: 'ru', label: 'Russia' },
      { id: 'za', value: 'za', label: 'South Africa' },
    ];
    
    return (
      <div style={{ minWidth: '400px' }}>
        <MultiSelect
          label="Select Countries"
          placeholder="Choose countries..."
          options={countries}
          value={selected}
          onChange={(value) => setSelected(value)}
        />
      </div>
    );
  },
};

/**
 * Programming languages selection
 */
export const ProgrammingLanguages: Story = {
  render: () => {
    const [selected, setSelected] = useState<any[]>([
      { id: 'javascript', value: 'javascript', label: 'JavaScript' },
      { id: 'python', value: 'python', label: 'Python' },
    ]);
    
    const languages = [
      { id: 'javascript', value: 'javascript', label: 'JavaScript' },
      { id: 'typescript', value: 'typescript', label: 'TypeScript' },
      { id: 'python', value: 'python', label: 'Python' },
      { id: 'java', value: 'java', label: 'Java' },
      { id: 'csharp', value: 'csharp', label: 'C#' },
      { id: 'go', value: 'go', label: 'Go' },
      { id: 'rust', value: 'rust', label: 'Rust' },
      { id: 'php', value: 'php', label: 'PHP' },
      { id: 'ruby', value: 'ruby', label: 'Ruby' },
      { id: 'swift', value: 'swift', label: 'Swift' },
    ];
    
    return (
      <div style={{ minWidth: '400px' }}>
        <MultiSelect
          label="Programming Languages"
          placeholder="Select languages you know..."
          options={languages}
          value={selected}
          onChange={(value) => setSelected(value)}
        />
        <div style={{ marginTop: '16px', padding: '12px', background: '#e3f2fd', borderRadius: '4px' }}>
          You know {selected.length} programming language{selected.length !== 1 ? 's' : ''}
        </div>
      </div>
    );
  },
};
