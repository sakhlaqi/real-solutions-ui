import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from '../../src/adapters/Pagination';
import { useState } from 'react';

const meta: Meta<typeof Pagination> = {
  title: 'Navigation/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return <Pagination count={10} page={page} onChange={setPage} />;
  },
};

export const WithManyPages: Story = {
  render: () => {
    const [page, setPage] = useState(5);
    return <Pagination count={20} page={page} onChange={setPage} />;
  },
};

export const WithFirstLast: Story = {
  render: () => {
    const [page, setPage] = useState(3);
    return (
      <Pagination
        count={15}
        page={page}
        onChange={setPage}
        showFirstButton
        showLastButton
      />
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [page, setPage] = useState(2);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Small</div>
          <Pagination count={5} page={page} onChange={setPage} size="small" />
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Medium</div>
          <Pagination count={5} page={page} onChange={setPage} size="medium" />
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Large</div>
          <Pagination count={5} page={page} onChange={setPage} size="large" />
        </div>
      </div>
    );
  },
};

export const Variants: Story = {
  render: () => {
    const [page, setPage] = useState(3);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Text</div>
          <Pagination count={10} page={page} onChange={setPage} variant="text" />
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Outlined</div>
          <Pagination count={10} page={page} onChange={setPage} variant="outlined" />
        </div>
      </div>
    );
  },
};

export const Shapes: Story = {
  render: () => {
    const [page, setPage] = useState(3);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Circular</div>
          <Pagination count={10} page={page} onChange={setPage} shape="circular" />
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Rounded</div>
          <Pagination count={10} page={page} onChange={setPage} shape="rounded" />
        </div>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return <Pagination count={10} page={5} onChange={() => {}} disabled />;
  },
};

export const BoundaryCount: Story = {
  render: () => {
    const [page, setPage] = useState(10);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Boundary Count: 1 (default)</div>
          <Pagination count={20} page={page} onChange={setPage} boundaryCount={1} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Boundary Count: 2</div>
          <Pagination count={20} page={page} onChange={setPage} boundaryCount={2} />
        </div>
      </div>
    );
  },
};

export const SiblingCount: Story = {
  render: () => {
    const [page, setPage] = useState(10);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Sibling Count: 1 (default)</div>
          <Pagination count={20} page={page} onChange={setPage} siblingCount={1} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Sibling Count: 2</div>
          <Pagination count={20} page={page} onChange={setPage} siblingCount={2} />
        </div>
      </div>
    );
  },
};

export const WithTable: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const rowsPerPage = 5;
    const totalItems = 47;
    const totalPages = Math.ceil(totalItems / rowsPerPage);

    const startItem = (page - 1) * rowsPerPage + 1;
    const endItem = Math.min(page * rowsPerPage, totalItems);

    return (
      <div style={{ width: 600 }}>
        <div style={{ border: '1px solid #e0e0e0', borderRadius: '4px', padding: '1rem', marginBottom: '1rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '2px solid #e0e0e0' }}>ID</th>
                <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '2px solid #e0e0e0' }}>Name</th>
                <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '2px solid #e0e0e0' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: rowsPerPage }, (_, i) => {
                const itemNum = startItem + i;
                if (itemNum > totalItems) return null;
                return (
                  <tr key={itemNum}>
                    <td style={{ padding: '0.5rem', borderBottom: '1px solid #e0e0e0' }}>{itemNum}</td>
                    <td style={{ padding: '0.5rem', borderBottom: '1px solid #e0e0e0' }}>Item {itemNum}</td>
                    <td style={{ padding: '0.5rem', borderBottom: '1px solid #e0e0e0' }}>Active</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '0.875rem', color: '#666' }}>
            Showing {startItem}-{endItem} of {totalItems}
          </div>
          <Pagination count={totalPages} page={page} onChange={setPage} />
        </div>
      </div>
    );
  },
};
