import type { Meta, StoryObj } from '@storybook/react';
import { Section } from './Section';

const meta: Meta<typeof Section> = {
  title: 'Adapters/Section',
  component: Section,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Section>;

export const Default: Story = {
  render: (args) => (
    <Section {...args}>
      <h2>Section Title</h2>
      <p>This is a section with default (medium) padding.</p>
    </Section>
  ),
};

export const NoPadding: Story = {
  render: (args) => (
    <Section {...args}>
      <h2>No Padding Section</h2>
      <p>This section has no padding.</p>
    </Section>
  ),
  args: {
    padding: 'none',
  },
};

export const SmallPadding: Story = {
  render: (args) => (
    <Section {...args}>
      <h2>Small Padding</h2>
      <p>This section has small padding.</p>
    </Section>
  ),
  args: {
    padding: 'small',
  },
};

export const MediumPadding: Story = {
  render: (args) => (
    <Section {...args}>
      <h2>Medium Padding</h2>
      <p>This section has medium padding (default).</p>
    </Section>
  ),
  args: {
    padding: 'medium',
  },
};

export const LargePadding: Story = {
  render: (args) => (
    <Section {...args}>
      <h2>Large Padding</h2>
      <p>This section has large padding.</p>
    </Section>
  ),
  args: {
    padding: 'large',
  },
};

export const AsArticle: Story = {
  render: (args) => (
    <Section {...args}>
      <h2>Article Section</h2>
      <p>This section is rendered as an article element.</p>
    </Section>
  ),
  args: {
    as: 'article',
  },
};

export const MultipleSection: Story = {
  render: () => (
    <>
      <Section padding="large" as="section" style={{ backgroundColor: '#f5f5f5' }}>
        <h2>Hero Section</h2>
        <p>Large padding for emphasis</p>
      </Section>
      <Section padding="medium" as="section">
        <h2>Content Section</h2>
        <p>Medium padding for main content</p>
      </Section>
      <Section padding="small" as="aside" style={{ backgroundColor: '#e3f2fd' }}>
        <h3>Sidebar</h3>
        <p>Small padding for compact layout</p>
      </Section>
    </>
  ),
};
