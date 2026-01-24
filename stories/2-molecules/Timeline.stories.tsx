import type { Meta, StoryObj } from '@storybook/react';
import { Timeline } from '../../src/adapters/Timeline';
import { FiberManualRecord, Work, School, Star } from '@mui/icons-material';

/**
 * Timeline component displays a list of events in chronological order.
 * Uses MUI Lab Timeline component.
 * 
 * Features:
 * - Multiple position layouts (left, right, alternate)
 * - Customizable colors
 * - Icon support
 * - Time display
 */
const meta = {
  title: 'Data Display/Timeline',
  component: Timeline,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['left', 'right', 'alternate'],
      description: 'Timeline alignment',
    },
  },
} satisfies Meta<typeof Timeline>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default timeline with right-aligned content
 */
export const Default: Story = {
  args: {
    position: 'right',
    items: [
      {
        id: '1',
        time: '9:00 AM',
        title: 'Meeting with Team',
        description: 'Discuss project requirements and timeline',
        color: 'primary',
      },
      {
        id: '2',
        time: '11:30 AM',
        title: 'Code Review',
        description: 'Review pull requests from the team',
        color: 'info',
      },
      {
        id: '3',
        time: '2:00 PM',
        title: 'Lunch Break',
        description: 'Take a break and recharge',
        color: 'success',
      },
      {
        id: '4',
        time: '4:00 PM',
        title: 'Deploy to Production',
        description: 'Deploy latest features to production environment',
        color: 'warning',
      },
    ],
  },
};

/**
 * Alternate timeline with content on both sides
 */
export const Alternate: Story = {
  args: {
    position: 'alternate',
    items: [
      {
        id: '1',
        time: '2020',
        title: 'Company Founded',
        description: 'Started our journey in a small garage',
        color: 'primary',
        icon: <Star fontSize="small" />,
      },
      {
        id: '2',
        time: '2021',
        title: 'First Product Launch',
        description: 'Released our flagship product to the market',
        color: 'success',
        icon: <Work fontSize="small" />,
      },
      {
        id: '3',
        time: '2022',
        title: 'Series A Funding',
        description: 'Raised $10M in Series A funding',
        color: 'info',
        icon: <FiberManualRecord fontSize="small" />,
      },
      {
        id: '4',
        time: '2023',
        title: 'Team Expansion',
        description: 'Grew to 50+ employees across 3 offices',
        color: 'secondary',
        icon: <School fontSize="small" />,
      },
      {
        id: '5',
        time: '2024',
        title: 'International Launch',
        description: 'Expanded to 15 countries worldwide',
        color: 'warning',
        icon: <Star fontSize="small" />,
      },
    ],
  },
};

/**
 * Left-aligned timeline
 */
export const LeftAligned: Story = {
  args: {
    position: 'left',
    items: [
      {
        id: '1',
        time: 'Jan 2024',
        title: 'Project Kickoff',
        description: 'Initial planning and requirements gathering',
        color: 'primary',
      },
      {
        id: '2',
        time: 'Feb 2024',
        title: 'Design Phase',
        description: 'UI/UX design and prototyping',
        color: 'secondary',
      },
      {
        id: '3',
        time: 'Mar 2024',
        title: 'Development',
        description: 'Core feature implementation',
        color: 'info',
      },
      {
        id: '4',
        time: 'Apr 2024',
        title: 'Testing',
        description: 'QA and user acceptance testing',
        color: 'warning',
      },
      {
        id: '5',
        time: 'May 2024',
        title: 'Launch',
        description: 'Product release and monitoring',
        color: 'success',
      },
    ],
  },
};

/**
 * Timeline with custom icons
 */
export const WithIcons: Story = {
  args: {
    position: 'right',
    items: [
      {
        id: '1',
        time: 'Step 1',
        title: 'Registration',
        description: 'User creates an account',
        color: 'primary',
        icon: <FiberManualRecord fontSize="small" />,
      },
      {
        id: '2',
        time: 'Step 2',
        title: 'Verification',
        description: 'Email verification required',
        color: 'info',
        icon: <Work fontSize="small" />,
      },
      {
        id: '3',
        time: 'Step 3',
        title: 'Profile Setup',
        description: 'Complete your profile information',
        color: 'warning',
        icon: <School fontSize="small" />,
      },
      {
        id: '4',
        time: 'Step 4',
        title: 'Ready to Go!',
        description: 'Start using all features',
        color: 'success',
        icon: <Star fontSize="small" />,
      },
    ],
  },
};

/**
 * Simple timeline without descriptions
 */
export const Simple: Story = {
  args: {
    position: 'right',
    items: [
      {
        id: '1',
        time: '9:00',
        title: 'Wake up',
        color: 'primary',
      },
      {
        id: '2',
        time: '10:00',
        title: 'Breakfast',
        color: 'secondary',
      },
      {
        id: '3',
        time: '12:00',
        title: 'Work',
        color: 'info',
      },
      {
        id: '4',
        time: '18:00',
        title: 'Dinner',
        color: 'success',
      },
      {
        id: '5',
        time: '22:00',
        title: 'Sleep',
        color: 'grey',
      },
    ],
  },
};
