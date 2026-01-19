/**
 * Adapter Timeline Component
 * 
 * Uses MUI Lab Timeline for all providers.
 */

import React from 'react';
import { Timeline as MUITimeline, MUITimelineProps as TimelineProps } from '../providers/mui';

/**
 * Adaptive Timeline Component
 * 
 * @example
 * ```tsx
 * <Timeline items={[
 *   { id: '1', time: '9:00 AM', title: 'Event 1', description: 'First event', color: 'primary' },
 *   { id: '2', time: '2:00 PM', title: 'Event 2', description: 'Second event', color: 'success' }
 * ]} position="alternate" />
 * ```
 */
export const Timeline: React.FC<TimelineProps> = (props) => {
  return <MUITimeline {...props} />;
};

Timeline.displayName = 'AdapterTimeline';
