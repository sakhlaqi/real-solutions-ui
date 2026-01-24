import type { Meta, StoryObj } from '@storybook/react';
import { SimpleTreeView } from '../../src/adapters/SimpleTreeView';
import { TreeItem } from '../../src/adapters/TreeItem';
import React from 'react';
import {
  Folder as FolderIcon,
  FolderOpen as FolderOpenIcon,
  InsertDriveFile as FileIcon,
  Image as ImageIcon,
  PictureAsPdf as PdfIcon,
  Description as DescriptionIcon,
  Code as CodeIcon,
} from '@mui/icons-material';

const meta: Meta<typeof TreeItem> = {
  title: 'Data Display/TreeItem',
  component: TreeItem,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Individual tree item component for building custom tree structures. Use with SimpleTreeView for maximum control over tree rendering.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TreeItem>;

export const Default: Story = {
  render: () => (
    <SimpleTreeView items={[]}>
      <TreeItem itemId="1" label="Parent Item">
        <TreeItem itemId="1-1" label="Child Item 1" />
        <TreeItem itemId="1-2" label="Child Item 2" />
        <TreeItem itemId="1-3" label="Child Item 3" />
      </TreeItem>
    </SimpleTreeView>
  ),
};

export const Nested: Story = {
  render: () => (
    <SimpleTreeView items={[]} defaultExpanded={['1', '1-1']}>
      <TreeItem itemId="1" label="Level 1">
        <TreeItem itemId="1-1" label="Level 2">
          <TreeItem itemId="1-1-1" label="Level 3">
            <TreeItem itemId="1-1-1-1" label="Level 4" />
          </TreeItem>
        </TreeItem>
        <TreeItem itemId="1-2" label="Level 2" />
      </TreeItem>
    </SimpleTreeView>
  ),
};

export const WithDisabled: Story = {
  render: () => (
    <SimpleTreeView items={[]}>
      <TreeItem itemId="1" label="Available Items">
        <TreeItem itemId="1-1" label="Available Item 1" />
        <TreeItem itemId="1-2" label="Available Item 2" />
      </TreeItem>
      <TreeItem itemId="2" label="Disabled Section" disabled>
        <TreeItem itemId="2-1" label="Disabled Item 1" />
        <TreeItem itemId="2-2" label="Disabled Item 2" />
      </TreeItem>
      <TreeItem itemId="3" label="Mixed">
        <TreeItem itemId="3-1" label="Available" />
        <TreeItem itemId="3-2" label="Disabled" disabled />
        <TreeItem itemId="3-3" label="Available" />
      </TreeItem>
    </SimpleTreeView>
  ),
};

export const FileExplorer: Story = {
  render: () => (
    <SimpleTreeView items={[]} defaultExpanded={['documents', 'work']}>
      <TreeItem itemId="documents" label="Documents">
        <TreeItem itemId="work" label="Work">
          <TreeItem itemId="resume" label="Resume.pdf" />
          <TreeItem itemId="cover-letter" label="Cover Letter.docx" />
        </TreeItem>
        <TreeItem itemId="personal" label="Personal">
          <TreeItem itemId="vacation" label="Vacation Photos" />
          <TreeItem itemId="receipts" label="Receipts" />
        </TreeItem>
      </TreeItem>
      <TreeItem itemId="pictures" label="Pictures">
        <TreeItem itemId="2024" label="2024" />
        <TreeItem itemId="2023" label="2023" />
      </TreeItem>
      <TreeItem itemId="downloads" label="Downloads">
        <TreeItem itemId="setup" label="setup.exe" />
        <TreeItem itemId="data" label="data.csv" />
      </TreeItem>
    </SimpleTreeView>
  ),
};

export const CodeStructure: Story = {
  render: () => (
    <SimpleTreeView items={[]} defaultExpanded={['src', 'components', 'pages']}>
      <TreeItem itemId="src" label="src">
        <TreeItem itemId="components" label="components">
          <TreeItem itemId="Button.tsx" label="Button.tsx" />
          <TreeItem itemId="Input.tsx" label="Input.tsx" />
          <TreeItem itemId="Modal.tsx" label="Modal.tsx" />
          <TreeItem itemId="Card.tsx" label="Card.tsx" />
        </TreeItem>
        <TreeItem itemId="pages" label="pages">
          <TreeItem itemId="Home.tsx" label="Home.tsx" />
          <TreeItem itemId="About.tsx" label="About.tsx" />
          <TreeItem itemId="Contact.tsx" label="Contact.tsx" />
        </TreeItem>
        <TreeItem itemId="utils" label="utils">
          <TreeItem itemId="helpers.ts" label="helpers.ts" />
          <TreeItem itemId="constants.ts" label="constants.ts" />
          <TreeItem itemId="api.ts" label="api.ts" />
        </TreeItem>
        <TreeItem itemId="styles" label="styles">
          <TreeItem itemId="global.css" label="global.css" />
          <TreeItem itemId="theme.ts" label="theme.ts" />
        </TreeItem>
      </TreeItem>
      <TreeItem itemId="public" label="public">
        <TreeItem itemId="index.html" label="index.html" />
        <TreeItem itemId="favicon.ico" label="favicon.ico" />
      </TreeItem>
      <TreeItem itemId="package.json" label="package.json" />
      <TreeItem itemId="tsconfig.json" label="tsconfig.json" />
    </SimpleTreeView>
  ),
};

export const OrganizationChart: Story = {
  render: () => (
    <SimpleTreeView items={[]} defaultExpanded={['ceo', 'engineering', 'sales']}>
      <TreeItem itemId="ceo" label="CEO">
        <TreeItem itemId="engineering" label="Engineering">
          <TreeItem itemId="frontend" label="Frontend Team">
            <TreeItem itemId="fe-lead" label="Frontend Lead" />
            <TreeItem itemId="fe-dev1" label="Senior Developer" />
            <TreeItem itemId="fe-dev2" label="Junior Developer" />
          </TreeItem>
          <TreeItem itemId="backend" label="Backend Team">
            <TreeItem itemId="be-lead" label="Backend Lead" />
            <TreeItem itemId="be-dev1" label="Senior Developer" />
            <TreeItem itemId="be-dev2" label="Junior Developer" />
          </TreeItem>
          <TreeItem itemId="qa" label="QA Team">
            <TreeItem itemId="qa-lead" label="QA Lead" />
            <TreeItem itemId="qa-eng" label="QA Engineer" />
          </TreeItem>
        </TreeItem>
        <TreeItem itemId="sales" label="Sales">
          <TreeItem itemId="sales-manager" label="Sales Manager" />
          <TreeItem itemId="sales-rep1" label="Sales Rep 1" />
          <TreeItem itemId="sales-rep2" label="Sales Rep 2" />
        </TreeItem>
        <TreeItem itemId="marketing" label="Marketing">
          <TreeItem itemId="marketing-manager" label="Marketing Manager" />
          <TreeItem itemId="content" label="Content Team" />
          <TreeItem itemId="design" label="Design Team" />
        </TreeItem>
      </TreeItem>
    </SimpleTreeView>
  ),
};

export const NavigationMenu: Story = {
  render: () => (
    <SimpleTreeView items={[]} defaultSelected="dashboard">
      <TreeItem itemId="dashboard" label="Dashboard" />
      <TreeItem itemId="products" label="Products">
        <TreeItem itemId="all-products" label="All Products" />
        <TreeItem itemId="categories" label="Categories" />
        <TreeItem itemId="inventory" label="Inventory" />
      </TreeItem>
      <TreeItem itemId="orders" label="Orders">
        <TreeItem itemId="pending" label="Pending" />
        <TreeItem itemId="completed" label="Completed" />
        <TreeItem itemId="cancelled" label="Cancelled" />
      </TreeItem>
      <TreeItem itemId="customers" label="Customers">
        <TreeItem itemId="all-customers" label="All Customers" />
        <TreeItem itemId="groups" label="Customer Groups" />
      </TreeItem>
      <TreeItem itemId="reports" label="Reports">
        <TreeItem itemId="sales-report" label="Sales Report" />
        <TreeItem itemId="analytics" label="Analytics" />
      </TreeItem>
      <TreeItem itemId="settings" label="Settings" />
    </SimpleTreeView>
  ),
};

export const WithCheckboxSelection: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string[]>([]);

    return (
      <div>
        <SimpleTreeView
          items={[]}
          checkboxSelection
          multiSelect
          defaultExpanded={['apps', 'docs']}
          selected={selected}
          onNodeSelect={(event, nodeIds) => {
            setSelected(Array.isArray(nodeIds) ? nodeIds : nodeIds ? [nodeIds] : []);
          }}
        >
          <TreeItem itemId="apps" label="Applications">
            <TreeItem itemId="calendar" label="Calendar" />
            <TreeItem itemId="chrome" label="Chrome" />
            <TreeItem itemId="webstorm" label="Webstorm" />
          </TreeItem>
          <TreeItem itemId="docs" label="Documents">
            <TreeItem itemId="work" label="Work">
              <TreeItem itemId="project-a" label="Project A" />
              <TreeItem itemId="project-b" label="Project B" />
            </TreeItem>
            <TreeItem itemId="personal" label="Personal" />
          </TreeItem>
          <TreeItem itemId="downloads" label="Downloads">
            <TreeItem itemId="oct" label="October" />
            <TreeItem itemId="nov" label="November" />
          </TreeItem>
        </SimpleTreeView>
        <div style={{ marginTop: '1rem', padding: '1rem', background: '#f5f5f5', borderRadius: '4px' }}>
          <strong>Selected Items:</strong> {selected.length > 0 ? selected.join(', ') : 'None'}
        </div>
      </div>
    );
  },
};

export const MultiSelect: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string[]>([]);

    return (
      <div>
        <SimpleTreeView
          items={[]}
          multiSelect
          defaultExpanded={['1', '2']}
          selected={selected}
          onNodeSelect={(event, nodeIds) => {
            setSelected(Array.isArray(nodeIds) ? nodeIds : nodeIds ? [nodeIds] : []);
          }}
        >
          <TreeItem itemId="1" label="Category 1">
            <TreeItem itemId="1-1" label="Item 1-1" />
            <TreeItem itemId="1-2" label="Item 1-2" />
            <TreeItem itemId="1-3" label="Item 1-3" />
          </TreeItem>
          <TreeItem itemId="2" label="Category 2">
            <TreeItem itemId="2-1" label="Item 2-1" />
            <TreeItem itemId="2-2" label="Item 2-2" />
          </TreeItem>
          <TreeItem itemId="3" label="Category 3">
            <TreeItem itemId="3-1" label="Item 3-1" />
          </TreeItem>
        </SimpleTreeView>
        <div style={{ marginTop: '1rem', padding: '1rem', background: '#f5f5f5', borderRadius: '4px' }}>
          <strong>Selected Items:</strong> {selected.length > 0 ? selected.join(', ') : 'None'}<br />
          <small>Hold Ctrl/Cmd to select multiple items</small>
        </div>
      </div>
    );
  },
};

export const ControlledExample: Story = {
  render: () => {
    const [expanded, setExpanded] = React.useState<string[]>(['1']);
    const [selected, setSelected] = React.useState<string>('1-1');

    return (
      <div>
        <div style={{ marginBottom: '1rem' }}>
          <button
            onClick={() => setExpanded(['1', '2'])}
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
          items={[]}
          expanded={expanded}
          selected={selected}
          onNodeToggle={(event, nodeIds) => setExpanded(nodeIds)}
          onNodeSelect={(event, nodeIds) => setSelected(nodeIds as string)}
        >
          <TreeItem itemId="1" label="Applications">
            <TreeItem itemId="1-1" label="Calendar" />
            <TreeItem itemId="1-2" label="Chrome" />
            <TreeItem itemId="1-3" label="Webstorm" />
          </TreeItem>
          <TreeItem itemId="2" label="Documents">
            <TreeItem itemId="2-1" label="Work" />
            <TreeItem itemId="2-2" label="Personal" />
          </TreeItem>
        </SimpleTreeView>
        <div style={{ marginTop: '1rem', padding: '1rem', background: '#f5f5f5', borderRadius: '4px' }}>
          <strong>Expanded:</strong> {expanded.join(', ') || 'None'}<br />
          <strong>Selected:</strong> {selected || 'None'}
        </div>
      </div>
    );
  },
};
