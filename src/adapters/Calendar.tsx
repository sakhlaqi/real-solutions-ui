/**
 * Adaptive Calendar Component
 * 
 * Automatically switches between provider implementations based on UIProvider.
 */

import React from 'react';
import { useUIContext } from '../core/context';
import { Calendar as ShadcnCalendar } from '../providers/shadcn';

export interface CalendarProps {
  mode?: 'single' | 'multiple' | 'range';
  selected?: Date | Date[];
  onSelect?: (date: Date | Date[] | undefined) => void;
  className?: string;
  disabled?: boolean;
}

/**
 * Adaptive Calendar Component
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
export const Calendar: React.FC<CalendarProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'shadcn' || provider === 'radix') {
    return <ShadcnCalendar {...props as any} />;
  }
  
  // Fallback to shadcn for other providers
  return <ShadcnCalendar {...props as any} />;
};

Calendar.displayName = 'AdapterCalendar';
