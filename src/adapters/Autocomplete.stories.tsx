import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Autocomplete } from './Autocomplete';

/**
 * Autocomplete component for searchable select with suggestions.
 * 
 * ## Features
 * - Searchable dropdown
 * - Auto-suggestions
 * - Custom filtering
 * - Adapts to UI provider
 */
const meta = {
  title: 'Forms/Autocomplete',
  component: Autocomplete,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the autocomplete',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the autocomplete is disabled',
    },
  },
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

const cities = [
  { value: 'nyc', label: 'New York' },
  { value: 'la', label: 'Los Angeles' },
  { value: 'chicago', label: 'Chicago' },
  { value: 'houston', label: 'Houston' },
  { value: 'phoenix', label: 'Phoenix' },
  { value: 'philadelphia', label: 'Philadelphia' },
  { value: 'san-antonio', label: 'San Antonio' },
  { value: 'san-diego', label: 'San Diego' },
  { value: 'dallas', label: 'Dallas' },
  { value: 'san-jose', label: 'San Jose' },
];

/**
 * Default autocomplete
 */
export const Default: Story = {
  args: {
    options: cities,
    label: 'Select City',
    placeholder: 'Start typing...',
    onChange: (value) => console.log('Selected:', value),
  },
};

/**
 * With pre-selected value
 */
export const WithPreselectedValue: Story = {
  args: {
    options: cities,
    label: 'City',
    value: cities[0],
    onChange: (value) => console.log('Selected:', value),
  },
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {
    options: cities,
    label: 'City (Disabled)',
    value: cities[2],
    disabled: true,
    onChange: (value) => console.log('Selected:', value),
  },
};

/**
 * Interactive example
 */
export const Interactive: Story = {
  render: () => {
    const [selectedCity, setSelectedCity] = useState<any>(null);
    
    return (
      <div style={{ minWidth: '320px' }}>
        <Autocomplete
          options={cities}
          value={selectedCity}
          onChange={setSelectedCity}
          label="Choose Your City"
          placeholder="Type to search..."
        />
        <div style={{ marginTop: '16px', padding: '16px', background: '#f5f5f5', borderRadius: '4px' }}>
          <strong>Selected:</strong>
          <p style={{ margin: '8px 0 0 0' }}>
            {selectedCity ? selectedCity.label : 'None'}
          </p>
        </div>
      </div>
    );
  },
};

/**
 * Country selector
 */
export const CountrySelector: Story = {
  render: () => {
    const [selectedCountry, setSelectedCountry] = useState<any>(null);
    
    const countries = [
      { value: 'us', label: 'United States' },
      { value: 'uk', label: 'United Kingdom' },
      { value: 'ca', label: 'Canada' },
      { value: 'au', label: 'Australia' },
      { value: 'de', label: 'Germany' },
      { value: 'fr', label: 'France' },
      { value: 'jp', label: 'Japan' },
      { value: 'cn', label: 'China' },
      { value: 'in', label: 'India' },
      { value: 'br', label: 'Brazil' },
    ];
    
    return (
      <div style={{ minWidth: '350px' }}>
        <Autocomplete
          options={countries}
          value={selectedCountry}
          onChange={setSelectedCountry}
          label="Country"
          placeholder="Select your country..."
        />
        {selectedCountry && (
          <div style={{ marginTop: '16px', padding: '16px', background: '#e3f2fd', borderRadius: '4px' }}>
            🌍 Selected: <strong>{selectedCountry.label}</strong>
          </div>
        )}
      </div>
    );
  },
};

/**
 * Programming language selector
 */
export const ProgrammingLanguage: Story = {
  render: () => {
    const [selectedLang, setSelectedLang] = useState<any>(null);
    
    const languages = [
      { value: 'js', label: 'JavaScript' },
      { value: 'ts', label: 'TypeScript' },
      { value: 'py', label: 'Python' },
      { value: 'java', label: 'Java' },
      { value: 'cpp', label: 'C++' },
      { value: 'csharp', label: 'C#' },
      { value: 'go', label: 'Go' },
      { value: 'rust', label: 'Rust' },
      { value: 'swift', label: 'Swift' },
      { value: 'kotlin', label: 'Kotlin' },
    ];
    
    return (
      <div style={{ minWidth: '350px' }}>
        <h3 style={{ margin: '0 0 16px 0' }}>Favorite Programming Language</h3>
        <Autocomplete
          options={languages}
          value={selectedLang}
          onChange={setSelectedLang}
          label="Language"
          placeholder="Search languages..."
        />
        {selectedLang && (
          <div style={{ marginTop: '16px', padding: '16px', background: '#e8f5e9', borderRadius: '4px' }}>
            <p style={{ margin: 0 }}>
              Great choice! <strong>{selectedLang.label}</strong> is a powerful language.
            </p>
          </div>
        )}
      </div>
    );
  },
};

/**
 * University search
 */
export const UniversitySearch: Story = {
  render: () => {
    const [selectedUni, setSelectedUni] = useState<any>(null);
    
    const universities = [
      { value: 'mit', label: 'Massachusetts Institute of Technology' },
      { value: 'stanford', label: 'Stanford University' },
      { value: 'harvard', label: 'Harvard University' },
      { value: 'caltech', label: 'California Institute of Technology' },
      { value: 'oxford', label: 'University of Oxford' },
      { value: 'cambridge', label: 'University of Cambridge' },
      { value: 'princeton', label: 'Princeton University' },
      { value: 'yale', label: 'Yale University' },
      { value: 'columbia', label: 'Columbia University' },
      { value: 'uchicago', label: 'University of Chicago' },
    ];
    
    return (
      <div style={{ minWidth: '400px' }}>
        <h3 style={{ margin: '0 0 16px 0' }}>University Application</h3>
        <Autocomplete
          options={universities}
          value={selectedUni}
          onChange={setSelectedUni}
          label="Select University"
          placeholder="Search universities..."
        />
        {selectedUni && (
          <div style={{ marginTop: '16px', padding: '16px', background: '#f3e5f5', borderRadius: '4px' }}>
            <strong>Selected:</strong>
            <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>
              {selectedUni.label}
            </p>
          </div>
        )}
      </div>
    );
  },
};
