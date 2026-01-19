/**
 * MUI Timeline Adapter
 */

import React from 'react';
import MuiTimeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

export interface MUITimelineItem {
  id: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  time?: string;
  icon?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'grey';
}

export interface TimelineProps {
  items: MUITimelineItem[];
  position?: 'left' | 'right' | 'alternate';
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({
  items,
  position = 'right',
  className = '',
}) => {
  return (
    <MuiTimeline position={position} className={className}>
      {items.map((item, index) => (
        <TimelineItem key={item.id}>
          {position === 'alternate' && item.time && (
            <TimelineOppositeContent color="text.secondary">
              {item.time}
            </TimelineOppositeContent>
          )}
          
          <TimelineSeparator>
            <TimelineDot color={item.color || 'primary'}>
              {item.icon}
            </TimelineDot>
            {index < items.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          
          <TimelineContent>
            {position !== 'alternate' && item.time && (
              <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '4px' }}>
                {item.time}
              </div>
            )}
            <div style={{ fontWeight: 600 }}>{item.title}</div>
            {item.description && (
              <div style={{ fontSize: '0.875rem', marginTop: '4px' }}>
                {item.description}
              </div>
            )}
          </TimelineContent>
        </TimelineItem>
      ))}
    </MuiTimeline>
  );
};
