import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'Data Display/Typography',
  component: Typography,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Headings: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="h5">Heading 5</Typography>
      <Typography variant="h6">Heading 6</Typography>
    </div>
  ),
};

export const Body: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Typography variant="body1">
        Body 1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>
      <Typography variant="body2">
        Body 2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Typography color="primary">Primary color text</Typography>
      <Typography color="secondary">Secondary color text</Typography>
      <Typography color="textPrimary">Text primary</Typography>
      <Typography color="textSecondary">Text secondary</Typography>
      <Typography color="error">Error color text</Typography>
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Typography align="left">Left aligned text (default)</Typography>
      <Typography align="center">Center aligned text</Typography>
      <Typography align="right">Right aligned text</Typography>
      <Typography align="justify">Justified text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Typography>
    </div>
  ),
};

export const GutterBottom: Story = {
  render: () => (
    <div>
      <Typography variant="h4" gutterBottom>
        Heading with gutter bottom
      </Typography>
      <Typography variant="body1">
        This paragraph follows a heading with gutterBottom, which adds margin below the heading.
      </Typography>
    </div>
  ),
};

export const NoWrap: Story = {
  render: () => (
    <div style={{ maxWidth: 200, border: '1px solid #e0e0e0', padding: '1rem' }}>
      <Typography noWrap>
        This is a very long text that would normally wrap but doesn't because noWrap is enabled.
      </Typography>
    </div>
  ),
};

export const Paragraph: Story = {
  render: () => (
    <div>
      <Typography variant="h3" gutterBottom>
        Article Title
      </Typography>
      <Typography variant="body1" gutterBottom>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Last updated: January 2026
      </Typography>
    </div>
  ),
};

export const BlogPost: Story = {
  render: () => (
    <article style={{ maxWidth: 600 }}>
      <Typography variant="overline" color="textSecondary" gutterBottom>
        Technology
      </Typography>
      <Typography variant="h2" gutterBottom>
        Getting Started with React and TypeScript
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        A comprehensive guide to building modern web applications
      </Typography>
      <Typography variant="body1" gutterBottom>
        React and TypeScript have become the go-to combination for building scalable, maintainable web applications. This article will guide you through the essential concepts and best practices.
      </Typography>
      <Typography variant="h4" gutterBottom>
        Why TypeScript?
      </Typography>
      <Typography variant="body1" gutterBottom>
        TypeScript adds static typing to JavaScript, helping catch errors during development rather than at runtime. This leads to more robust code and better developer experience.
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Published on January 17, 2026
      </Typography>
    </article>
  ),
};
