import type { Meta, StoryObj } from '@storybook/react';
import { SimpleTreeView } from '../../src/adapters/SimpleTreeView';
import {
  Folder as FolderIcon,
  InsertDriveFile as FileIcon,
  Image as ImageIcon,
  Description as DescriptionIcon,
  PictureAsPdf as PdfIcon,
} from '@mui/icons-material';

const meta: Meta<typeof SimpleTreeView> = {
  title: 'Data Display/SimpleTreeView',
  component: SimpleTreeView,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A simple tree view component for displaying hierarchical data with basic features. Perfect for file explorers, navigation menus, and organizational structures.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SimpleTreeView>;

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

export const FileExplorer: Story = {
  args: {
    items: [
      {
        id: 'root',
        label: 'My Computer',
        children: [
          {
            id: 'documents',
            label: 'Documents',
            children: [
              { id: 'resume', label: 'Resume.pdf' },
              { id: 'cover-letter', label: 'Cover Letter.docx' },
              {
                id: 'projects',
                label: 'Projects',
                children: [
                  { id: 'project-a', label: 'Project A' },
                  { id: 'project-b', label: 'Project B' },
                ],
              },
            ],
          },
          {
            id: 'pictures',
            label: 'Pictures',
            children: [
              { id: 'vacation', label: 'Vacation 2024' },
              { id: 'family', label: 'Family Photos' },
            ],
          },
          {
            id: 'downloads',
            label: 'Downloads',
            children: [
              { id: 'file1', label: 'setup.exe' },
              { id: 'file2', label: 'data.csv' },
            ],
          },
        ],
      },
    ],
    defaultExpanded: ['root'],
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

export const OrganizationChart: Story = {
  args: {
    items: [
      {
        id: 'ceo',
        label: 'CEO - John Smith',
        children: [
          {
            id: 'cto',
            label: 'CTO - Jane Doe',
            children: [
              {
                id: 'dev-team',
                label: 'Development Team',
                children: [
                  { id: 'dev1', label: 'Senior Developer' },
                  { id: 'dev2', label: 'Junior Developer' },
                ],
              },
              {
                id: 'qa-team',
                label: 'QA Team',
                children: [
                  { id: 'qa1', label: 'QA Lead' },
                  { id: 'qa2', label: 'QA Engineer' },
                ],
              },
            ],
          },
          {
            id: 'cfo',
            label: 'CFO - Bob Johnson',
            children: [
              { id: 'accounting', label: 'Accounting Department' },
              { id: 'finance', label: 'Finance Department' },
            ],
          },
        ],
      },
    ],
    defaultExpanded: ['ceo', 'cto', 'cfo'],
  },
};

export const NavigationMenu: Story = {
  args: {
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
      },
      {
        id: 'products',
        label: 'Products',
        children: [
          { id: 'all-products', label: 'All Products' },
          { id: 'categories', label: 'Categories' },
          { id: 'inventory', label: 'Inventory' },
        ],
      },
      {
        id: 'orders',
        label: 'Orders',
        children: [
          { id: 'pending', label: 'Pending Orders' },
          { id: 'completed', label: 'Completed Orders' },
          { id: 'cancelled', label: 'Cancelled Orders' },
        ],
      },
      {
        id: 'customers',
        label: 'Customers',
        children: [
          { id: 'all-customers', label: 'All Customers' },
          { id: 'groups', label: 'Customer Groups' },
        ],
      },
      {
        id: 'reports',
        label: 'Reports',
        children: [
          { id: 'sales', label: 'Sales Report' },
          { id: 'analytics', label: 'Analytics' },
          { id: 'performance', label: 'Performance' },
        ],
      },
      {
        id: 'settings',
        label: 'Settings',
      },
    ],
    defaultSelected: 'dashboard',
  },
};

export const LargeDataset: Story = {
  render: () => {
    const generateItems = (prefix: string, depth: number, maxDepth: number) => {
      if (depth >= maxDepth) return [];
      
      return Array.from({ length: 5 }, (_, i) => ({
        id: `${prefix}-${i}`,
        label: `${depth === 0 ? 'Root' : 'Item'} ${prefix}-${i}`,
        children: generateItems(`${prefix}-${i}`, depth + 1, maxDepth),
      }));
    };

    return (
      <SimpleTreeView
        items={generateItems('root', 0, 3)}
        defaultExpanded={['root-0', 'root-0-0']}
      />
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [expanded, setExpanded] = React.useState<string[]>(['1']);
    const [selected, setSelected] = React.useState<string | string[] | null>('1-1');

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
              border: '1px solid #d32f2f',
              background: '#d32f2f',
              color: 'white',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Collapse All
          </button>
        </div>
        <SimpleTreeView
          items={basicItems}
          expanded={expanded}
          selected={selected}
          onNodeToggle={(event, nodeIds) => setExpanded(nodeIds)}
          onNodeSelect={(event, nodeIds) => setSelected(nodeIds)}
        />
        <div style={{ marginTop: '1rem', padding: '1rem', background: '#f5f5f5', borderRadius: '4px' }}>
          <strong>Expanded:</strong> {expanded.join(', ') || 'None'}<br />
          <strong>Selected:</strong> {selected?.toString() || 'None'}
        </div>
      </div>
    );
  },
};
