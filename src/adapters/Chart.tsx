/**
 * Adaptive Chart Component
 * 
 * Automatically switches between provider implementations based on UIProvider.
 */

import React, { ReactNode } from 'react';
import { useUIContext } from '../core/context';
import { ChartContainer, ChartTooltip, ChartLegend } from '../providers/shadcn';

export interface ChartProps {
  children: ReactNode;
  config?: any;
  className?: string;
}

/**
 * Adaptive Chart Component
 * 
 * @example
 * ```tsx
 * <Chart config={chartConfig}>
 *   {children}
 * </Chart>
 * ```
 */
export const Chart: React.FC<ChartProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'shadcn' || provider === 'radix') {
    return <ChartContainer {...props as any} />;
  }
  
  // Fallback to shadcn for other providers
  return <ChartContainer {...props as any} />;
};

Chart.displayName = 'AdapterChart';

export { ChartTooltip, ChartLegend };
