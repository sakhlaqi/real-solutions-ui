import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from '../../src/adapters/Breadcrumbs';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Navigation/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Details' },
    ],
  },
};

export const TwoLevels: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Current Page' },
    ],
  },
};

export const ManyLevels: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Category', href: '/category' },
      { label: 'Subcategory', href: '/category/sub' },
      { label: 'Product Type', href: '/category/sub/type' },
      { label: 'Product Details' },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      { label: '🏠 Home', href: '/' },
      { label: '📦 Products', href: '/products' },
      { label: '📄 Details' },
    ],
  },
};

export const LongLabels: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Very Long Category Name That Might Wrap', href: '/category' },
      { label: 'Another Long Subcategory Name', href: '/category/sub' },
      { label: 'Current Page With Long Name' },
    ],
  },
};

export const Interactive: Story = {
  args: {
    items: [
      { label: 'Home', href: '/', onClick: () => alert('Home clicked') },
      { label: 'Products', href: '/products', onClick: () => alert('Products clicked') },
      { label: 'Details' },
    ],
  },
};
