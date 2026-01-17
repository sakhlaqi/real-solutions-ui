/**
 * Adapter Timeline Component
 * 
 * Dynamically switches between internal, MUI, and Radix implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { Timeline as InternalTimeline, TimelineProps } from '../data-display';

/**
 * Adaptive Timeline Component
 * 
 * Note: MUI and Radix don't have native Timeline components,
 * so this always uses the internal implementation.
 * 
 * @example
 * ```tsx
 * <Timeline items={[
 *   { time: '9:00 AM', title: 'Event 1', description: 'First event' },
 *   { time: '2:00 PM', title: 'Event 2', description: 'Second event' }
 * ]} />
 * ```
 */
export const Timeline: React.FC<TimelineProps> = (props) => {
  // Timeline component always uses internal implementation
  // as MUI and Radix don't have equivalent components
  return <InternalTimeline {...props} />;
};

Timeline.displayName = 'AdapterTimeline';
