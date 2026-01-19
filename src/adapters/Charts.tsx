/**
 * Adapter Charts Components
 * 
 * Dynamically switches between internal and MUI chart implementations
 * based on the current UIProvider context.
 * 
 * Note: Internal chart components are not yet implemented.
 * When provider is 'internal', these will fall back to MUI charts.
 */

import React from 'react';
import { LineChartProps, BarChartProps, PieChartProps } from '../core/types';
import * as MUIComponents from '../providers/mui';

/**
 * Adaptive LineChart Component
 * 
 * Automatically switches between internal and MUI implementations based on UIProvider.
 * 
 * @example
 * ```tsx
 * <LineChart
 *   data={salesData}
 *   xAxis={{ dataKey: 'month' }}
 *   series={[{ dataKey: 'sales', label: 'Sales' }]}
 * />
 * ```
 */
export const LineChart: React.FC<LineChartProps> = (props) => {
  // MUI or internal (fallback to MUI for now)
  return <MUIComponents.LineChart {...props} />;
};

/**
 * Adaptive BarChart Component
 * 
 * Automatically switches between internal and MUI implementations based on UIProvider.
 * 
 * @example
 * ```tsx
 * <BarChart
 *   data={revenueData}
 *   xAxis={{ dataKey: 'quarter' }}
 *   series={[{ dataKey: 'revenue', label: 'Revenue' }]}
 * />
 * ```
 */
export const BarChart: React.FC<BarChartProps> = (props) => {
  // TODO: Implement internal chart components
  // For now, always use MUI charts regardless of provider
  //
  return <MUIComponents.BarChart {...props} />;
};

/**
 * Adaptive PieChart Component
 * 
 * Automatically switches between internal and MUI implementations based on UIProvider.
 * 
 * @example
 * ```tsx
 * <PieChart
 *   data={[
 *     { name: 'Group A', value: 400 },
 *     { name: 'Group B', value: 300 }
 *   ]}
 * />
 * ```
 */
export const PieChart: React.FC<PieChartProps> = (props) => {
  // TODO: Implement internal chart components
  // For now, always use MUI charts regardless of provider
  //
  return <MUIComponents.PieChart {...props} />;
};

LineChart.displayName = 'AdapterLineChart';
BarChart.displayName = 'AdapterBarChart';
PieChart.displayName = 'AdapterPieChart';
