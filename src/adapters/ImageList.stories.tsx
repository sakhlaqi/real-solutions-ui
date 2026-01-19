import type { Meta, StoryObj } from '@storybook/react';
import { ImageList } from './ImageList';

/**
 * ImageList component displays images in an organized grid layout.
 * 
 * **Now using MUI ImageList implementation** for optimized image grids with multiple layout variants.
 * 
 * ## Features
 * - Multiple layout variants (standard, quilted, woven, masonry)
 * - Configurable columns and gaps
 * - Support for image titles and captions
 * - Responsive grid layout
 */
const meta: Meta<typeof ImageList> = {
  title: 'Layout/ImageList',
  component: ImageList,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof ImageList>;

const sampleImages = [
  {
    src: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=300&h=300&fit=crop',
    alt: 'Breakfast',
    title: 'Breakfast',
  },
  {
    src: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=300&h=300&fit=crop',
    alt: 'Burger',
    title: 'Burger',
  },
  {
    src: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=300&h=300&fit=crop',
    alt: 'Camera',
    title: 'Camera',
  },
  {
    src: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?w=300&h=300&fit=crop',
    alt: 'Coffee',
    title: 'Coffee',
  },
  {
    src: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8?w=300&h=300&fit=crop',
    alt: 'Hats',
    title: 'Hats',
  },
  {
    src: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=300&h=300&fit=crop',
    alt: 'Honey',
    title: 'Honey',
  },
];

export const Standard: Story = {
  args: {
    items: sampleImages,
    cols: 3,
    gap: 8,
    variant: 'standard',
    rowHeight: 200,
  },
};

export const Quilted: Story = {
  args: {
    items: sampleImages.map((img, index) => ({
      ...img,
      rows: index % 3 === 0 ? 2 : 1,
      cols: index % 4 === 0 ? 2 : 1,
    })),
    cols: 4,
    gap: 8,
    variant: 'quilted',
    rowHeight: 150,
  },
};

export const Masonry: Story = {
  args: {
    items: sampleImages,
    cols: 3,
    gap: 8,
    variant: 'masonry',
  },
};

export const Woven: Story = {
  args: {
    items: sampleImages,
    cols: 3,
    gap: 8,
    variant: 'woven',
    rowHeight: 200,
  },
};

export const WithClickHandler: Story = {
  args: {
    items: sampleImages,
    cols: 3,
    gap: 8,
    variant: 'standard',
    rowHeight: 200,
    onItemClick: (item, index) => {
      alert(`Clicked ${item.title} at index ${index}`);
    },
  },
};
