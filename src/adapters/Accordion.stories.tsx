import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Data Display/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

const sampleItems = [
  {
    id: '1',
    title: 'What is React?',
    content: 'React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called "components".',
  },
  {
    id: '2',
    title: 'What is TypeScript?',
    content: 'TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.',
  },
  {
    id: '3',
    title: 'What is Storybook?',
    content: 'Storybook is a frontend workshop for building UI components and pages in isolation. It helps you develop and share hard-to-reach states and edge cases.',
  },
];

export const Default: Story = {
  args: {
    items: sampleItems,
  },
};

export const DefaultExpanded: Story = {
  args: {
    items: sampleItems,
    defaultExpanded: ['1'],
  },
};

export const MultipleExpanded: Story = {
  args: {
    items: sampleItems,
    multiple: true,
    defaultExpanded: ['1', '2'],
  },
};

export const SingleItem: Story = {
  args: {
    items: [sampleItems[0]],
  },
};

export const ManyItems: Story = {
  args: {
    items: [
      ...sampleItems,
      {
        id: '4',
        title: 'What is Vite?',
        content: 'Vite is a build tool that aims to provide a faster and leaner development experience for modern web projects.',
      },
      {
        id: '5',
        title: 'What is Tailwind CSS?',
        content: 'Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces.',
      },
    ],
  },
};

export const LongContent: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'Long Content Example',
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. 
        
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas mattis interdum enim vel venenatis. Praesent euismod sapien ac dui pharetra, sit amet fringilla odio hendrerit.

Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.`,
      },
      {
        id: '2',
        title: 'Another Panel',
        content: 'Shorter content here.',
      },
    ],
  },
};
