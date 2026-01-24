import type { Meta, StoryObj } from '@storybook/react';
import { Masonry } from '../../src/adapters/Masonry';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

/**
 * Masonry component creates a masonry layout (Pinterest-style grid).
 * Uses MUI Lab Masonry component.
 * 
 * Features:
 * - Responsive column count
 * - Customizable spacing
 * - Automatic item positioning
 * - Variable height support
 */
const meta = {
  title: 'Layout/Masonry',
  component: Masonry,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: 'number',
      description: 'Number of columns (can be number or responsive object)',
    },
    spacing: {
      control: 'number',
      description: 'Spacing between items in theme spacing units',
    },
  },
} satisfies Meta<typeof Masonry>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data with varying heights
const sampleItems = [
  { id: 1, height: 150, title: 'Item 1', color: '#1976d2' },
  { id: 2, height: 200, title: 'Item 2', color: '#dc004e' },
  { id: 3, height: 120, title: 'Item 3', color: '#388e3c' },
  { id: 4, height: 180, title: 'Item 4', color: '#f57c00' },
  { id: 5, height: 160, title: 'Item 5', color: '#7b1fa2' },
  { id: 6, height: 140, title: 'Item 6', color: '#0288d1' },
  { id: 7, height: 190, title: 'Item 7', color: '#c62828' },
  { id: 8, height: 130, title: 'Item 8', color: '#2e7d32' },
  { id: 9, height: 170, title: 'Item 9', color: '#ef6c00' },
];

/**
 * Default masonry with 3 columns
 */
export const Default: Story = {
  args: {
    columns: 3,
    spacing: 2,
  },
  render: (args) => (
    <Masonry {...args}>
      {sampleItems.map((item) => (
        <div
          key={item.id}
          style={{
            height: item.height,
            backgroundColor: item.color,
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          {item.title}
        </div>
      ))}
    </Masonry>
  ),
};

/**
 * Masonry with Material-UI Cards
 */
export const WithCards: Story = {
  args: {
    columns: 4,
    spacing: 2,
  },
  render: (args) => (
    <Masonry {...args}>
      {[
        { title: 'Delicious Recipe', desc: 'A quick and easy recipe for dinner', height: 200 },
        { title: 'Travel Guide', desc: 'Best places to visit in Europe', height: 180 },
        { title: 'Tech News', desc: 'Latest updates in the tech world', height: 220 },
        { title: 'Fitness Tips', desc: 'Get in shape with these exercises', height: 160 },
        { title: 'Book Review', desc: 'Must-read books of 2024', height: 190 },
        { title: 'Movie Night', desc: 'Top movies to watch this weekend', height: 170 },
        { title: 'DIY Project', desc: 'Home improvement ideas', height: 210 },
        { title: 'Fashion Trends', desc: 'What to wear this season', height: 150 },
      ].map((item, index) => (
        <Card key={index}>
          <CardMedia
            component="div"
            sx={{
              height: item.height,
              background: `linear-gradient(45deg, ${['#2196F3', '#FF5722', '#4CAF50', '#FFC107'][index % 4]} 30%, ${['#3F51B5', '#E91E63', '#009688', '#FF9800'][index % 4]} 90%)`,
            }}
          />
          <CardContent>
            <Typography variant="h6" component="div">
              {item.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.desc}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Masonry>
  ),
};

/**
 * Responsive masonry with different column counts per breakpoint
 */
export const Responsive: Story = {
  args: {
    columns: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 },
    spacing: 2,
  },
  render: (args) => (
    <Masonry {...args}>
      {sampleItems.map((item) => (
        <Card key={item.id}>
          <div
            style={{
              height: item.height,
              backgroundColor: item.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h6" style={{ color: 'white' }}>
              {item.title}
            </Typography>
          </div>
          <CardContent>
            <Typography variant="body2">
              Responsive item that adapts to screen size
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Masonry>
  ),
};

/**
 * Two columns layout
 */
export const TwoColumns: Story = {
  args: {
    columns: 2,
    spacing: 3,
  },
  render: (args) => (
    <Masonry {...args}>
      {sampleItems.slice(0, 6).map((item) => (
        <Card key={item.id} sx={{ boxShadow: 3 }}>
          <div
            style={{
              height: item.height,
              background: `linear-gradient(135deg, ${item.color}aa 0%, ${item.color} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h5" style={{ color: 'white', fontWeight: 'bold' }}>
              {item.title}
            </Typography>
          </div>
          <CardContent>
            <Typography variant="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Masonry>
  ),
};

/**
 * Compact layout with small spacing
 */
export const Compact: Story = {
  args: {
    columns: 5,
    spacing: 1,
  },
  render: (args) => (
    <Masonry {...args}>
      {sampleItems.map((item) => (
        <div
          key={item.id}
          style={{
            height: item.height * 0.7,
            backgroundColor: item.color,
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '12px',
          }}
        >
          {item.title}
        </div>
      ))}
    </Masonry>
  ),
};

/**
 * Wide spacing layout
 */
export const WideSpacing: Story = {
  args: {
    columns: 3,
    spacing: 4,
  },
  render: (args) => (
    <Masonry {...args}>
      {sampleItems.slice(0, 6).map((item) => (
        <Card key={item.id} elevation={8}>
          <div
            style={{
              height: item.height,
              backgroundColor: item.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h4" style={{ color: 'white' }}>
              {item.id}
            </Typography>
          </div>
          <CardContent>
            <Typography variant="h6">{item.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              Wide spacing creates a more spacious layout
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Masonry>
  ),
};
