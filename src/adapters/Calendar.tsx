/**
 * Adaptive Calendar Component
 * 
 * Automatically switches between provider implementations based on UIProvider.
 * 
 * Note: Calendar is currently only available as a utility component.
 * Neither internal nor MUI providers have a built-in calendar implementation.
 */

import React from 'react';

export interface CalendarProps {
  mode?: 'single' | 'multiple' | 'range';
  selected?: Date | Date[];
  onSelect?: (date: Date | Date[] | undefined) => void;
  className?: string;
  disabled?: boolean;
}

/**
 * Calendar Component - Placeholder
 * 
 * @example
 * ```tsx
 * <Calendar
 *   mode="single"
 *   selected={date}
 *   onSelect={setDate}
 * />
 * ```
 */
export const Calendar: React.FC<CalendarProps> = () => {
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '4px' }}>
      <p>Calendar component is not available. Please use a date picker library.</p>
    </div>
  );
};

Calendar.displayName = 'AdapterCalendar';
