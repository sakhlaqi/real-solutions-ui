import type { Meta, StoryObj } from '@storybook/react';
import { RichTreeView } from './RichTreeView';
import React from 'react';

const meta: Meta<typeof RichTreeView> = {
  title: 'Data Display/RichTreeView',
  component: RichTreeView,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'An advanced tree view component with rich features and better performance for large datasets. Uses a data-driven approach for rendering tree structures.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RichTreeView>;

const basicItems = [
  {
    id: '1',
    label: 'Applications',
    children: [
      { id: '1-1', label: 'Calendar' },
      { id: '1-2', label: 'Chrome' },
      { id: '1-3', label: 'Webstorm' },
    ],
  },
  {
    id: '2',
    label: 'Documents',
    children: [
      {
        id: '2-1',
        label: 'Work',
        children: [
          { id: '2-1-1', label: 'Project A' },
          { id: '2-1-2', label: 'Project B' },
        ],
      },
      { id: '2-2', label: 'Personal' },
    ],
  },
  {
    id: '3',
    label: 'Downloads',
    children: [
      { id: '3-1', label: 'October' },
      { id: '3-2', label: 'November' },
      { id: '3-3', label: 'December' },
    ],
  },
];

export const Default: Story = {
  args: {
    items: basicItems,
  },
};

export const DefaultExpanded: Story = {
  args: {
    items: basicItems,
    defaultExpanded: ['1', '2', '2-1'],
  },
};

export const DefaultSelected: Story = {
  args: {
    items: basicItems,
    defaultSelected: '2-1-1',
    defaultExpanded: ['2', '2-1'],
  },
};

export const MultiSelect: Story = {
  args: {
    items: basicItems,
    multiSelect: true,
    defaultExpanded: ['1', '2'],
    defaultSelected: ['1-1', '2-2'],
  },
};

export const CheckboxSelection: Story = {
  args: {
    items: basicItems,
    checkboxSelection: true,
    multiSelect: true,
    defaultExpanded: ['1', '2', '2-1'],
  },
};

export const ProductCategories: Story = {
  args: {
    items: [
      {
        id: 'electronics',
        label: 'Electronics',
        children: [
          {
            id: 'computers',
            label: 'Computers',
            children: [
              { id: 'laptops', label: 'Laptops' },
              { id: 'desktops', label: 'Desktops' },
              { id: 'tablets', label: 'Tablets' },
            ],
          },
          {
            id: 'phones',
            label: 'Phones',
            children: [
              { id: 'smartphones', label: 'Smartphones' },
              { id: 'feature-phones', label: 'Feature Phones' },
            ],
          },
          {
            id: 'accessories',
            label: 'Accessories',
            children: [
              { id: 'chargers', label: 'Chargers' },
              { id: 'cases', label: 'Cases' },
              { id: 'headphones', label: 'Headphones' },
            ],
          },
        ],
      },
      {
        id: 'clothing',
        label: 'Clothing',
        children: [
          {
            id: 'mens',
            label: "Men's Clothing",
            children: [
              { id: 'mens-shirts', label: 'Shirts' },
              { id: 'mens-pants', label: 'Pants' },
              { id: 'mens-shoes', label: 'Shoes' },
            ],
          },
          {
            id: 'womens',
            label: "Women's Clothing",
            children: [
              { id: 'womens-dresses', label: 'Dresses' },
              { id: 'womens-shoes', label: 'Shoes' },
              { id: 'womens-accessories', label: 'Accessories' },
            ],
          },
        ],
      },
      {
        id: 'books',
        label: 'Books',
        children: [
          { id: 'fiction', label: 'Fiction' },
          { id: 'non-fiction', label: 'Non-Fiction' },
          { id: 'educational', label: 'Educational' },
        ],
      },
    ],
    defaultExpanded: ['electronics', 'computers'],
  },
};

export const WithDisabledItems: Story = {
  args: {
    items: [
      {
        id: '1',
        label: 'Available',
        children: [
          { id: '1-1', label: 'Item 1' },
          { id: '1-2', label: 'Item 2' },
        ],
      },
      {
        id: '2',
        label: 'Disabled Section',
        disabled: true,
        children: [
          { id: '2-1', label: 'Disabled Item 1' },
          { id: '2-2', label: 'Disabled Item 2' },
        ],
      },
      {
        id: '3',
        label: 'Mixed',
        children: [
          { id: '3-1', label: 'Available' },
          { id: '3-2', label: 'Disabled', disabled: true },
          { id: '3-3', label: 'Available' },
        ],
      },
    ],
    defaultExpanded: ['1', '2', '3'],
  },
};

export const ProjectStructure: Story = {
  args: {
    items: [
      {
        id: 'src',
        label: 'src',
        children: [
          {
            id: 'components',
            label: 'components',
            children: [
              { id: 'Button.tsx', label: 'Button.tsx' },
              { id: 'Input.tsx', label: 'Input.tsx' },
              { id: 'Modal.tsx', label: 'Modal.tsx' },
            ],
          },
          {
            id: 'pages',
            label: 'pages',
            children: [
              { id: 'Home.tsx', label: 'Home.tsx' },
              { id: 'About.tsx', label: 'About.tsx' },
              { id: 'Contact.tsx', label: 'Contact.tsx' },
            ],
          },
          {
            id: 'utils',
            label: 'utils',
            children: [
              { id: 'helpers.ts', label: 'helpers.ts' },
              { id: 'constants.ts', label: 'constants.ts' },
            ],
          },
        ],
      },
      {
        id: 'public',
        label: 'public',
        children: [
          { id: 'index.html', label: 'index.html' },
          { id: 'favicon.ico', label: 'favicon.ico' },
        ],
      },
      { id: 'package.json', label: 'package.json' },
      { id: 'tsconfig.json', label: 'tsconfig.json' },
      { id: 'README.md', label: 'README.md' },
    ],
    defaultExpanded: ['src', 'components', 'pages'],
  },
};

export const LargeDataset: Story = {
  render: () => {
    const generateItems = (prefix: string, depth: number, maxDepth: number): any[] => {
      if (depth >= maxDepth) return [];
      
      return Array.from({ length: 10 }, (_, i) => ({
        id: `${prefix}-${i}`,
        label: `Item ${prefix}-${i}`,
        children: generateItems(`${prefix}-${i}`, depth + 1, maxDepth),
      }));
    };

    const items = generateItems('root', 0, 4);

    return (
      <div style={{ height: '500px', overflow: 'auto' }}>
        <RichTreeView
          items={items}
          defaultExpanded={['root-0', 'root-0-0']}
        />
      </div>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [expanded, setExpanded] = React.useState<string[]>(['1']);
    const [selected, setSelected] = React.useState<string | string[]>('1-1');

    return (
      <div>
        <div style={{ marginBottom: '1rem' }}>
          <button
            onClick={() => setExpanded(['1', '2', '2-1'])}
            style={{
              padding: '0.5rem 1rem',
              marginRight: '0.5rem',
              border: '1px solid #1976d2',
              background: '#1976d2',
              color: 'white',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Expand All
          </button>
          <button
            onClick={() => setExpanded([])}
            style={{
              padding: '0.5rem 1rem',
              marginRight: '0.5rem',
              border: '1px solid #d32f2f',
              background: '#d32f2f',
              color: 'white',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Collapse All
          </button>
          <button
            onClick={() => setSelected(['1-1', '2-2', '3-1'])}
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid #2e7d32',
              background: '#2e7d32',
              color: 'white',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Select Multiple
          </button>
        </div>
        <RichTreeView
          items={basicItems}
          expanded={expanded}
          selected={selected}
          multiSelect
          onNodeToggle={(event, nodeIds) => setExpanded(nodeIds)}
          onNodeSelect={(event, nodeIds) => setSelected(nodeIds as string | string[])}
        />
        <div style={{ marginTop: '1rem', padding: '1rem', background: '#f5f5f5', borderRadius: '4px' }}>
          <strong>Expanded:</strong> {expanded.join(', ') || 'None'}<br />
          <strong>Selected:</strong> {Array.isArray(selected) ? selected.join(', ') : selected || 'None'}
        </div>
      </div>
    );
  },
};

export const WithCheckboxes: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string[]>([]);

    return (
      <div>
        <RichTreeView
          items={basicItems}
          checkboxSelection
          multiSelect
          defaultExpanded={['1', '2', '2-1']}
          selected={selected}
          onNodeSelect={(event, nodeIds) => {
            setSelected(Array.isArray(nodeIds) ? nodeIds : nodeIds ? [nodeIds] : []);
          }}
        />
        <div style={{ marginTop: '1rem', padding: '1rem', background: '#f5f5f5', borderRadius: '4px' }}>
          <strong>Selected Items:</strong> {selected.length > 0 ? selected.join(', ') : 'None'}
        </div>
      </div>
    );
  },
};

export const FileSystemExplorer: Story = {
  args: {
    items: [
      {
        id: 'root',
        label: '/',
        children: [
          {
            id: 'home',
            label: 'home',
            children: [
              {
                id: 'user',
                label: 'user',
                children: [
                  { id: 'documents', label: 'Documents' },
                  { id: 'downloads', label: 'Downloads' },
                  { id: 'pictures', label: 'Pictures' },
                  { id: 'videos', label: 'Videos' },
                ],
              },
            ],
          },
          {
            id: 'var',
            label: 'var',
            children: [
              { id: 'log', label: 'log' },
              { id: 'cache', label: 'cache' },
              { id: 'tmp', label: 'tmp' },
            ],
          },
          {
            id: 'usr',
            label: 'usr',
            children: [
              { id: 'bin', label: 'bin' },
              { id: 'lib', label: 'lib' },
              { id: 'local', label: 'local' },
            ],
          },
        ],
      },
    ],
    defaultExpanded: ['root', 'home', 'user'],
  },
};
