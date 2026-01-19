/**
 * MUI Charts Adapters
 */

import React from 'react';
import { LineChart as MuiLineChart } from '@mui/x-charts/LineChart';
import { BarChart as MuiBarChart } from '@mui/x-charts/BarChart';
import { PieChart as MuiPieChart } from '@mui/x-charts/PieChart';
import { LineChartProps, BarChartProps, PieChartProps } from '../../core/types';

export const LineChart: React.FC<LineChartProps> = ({
  series,
  width = '100%',
  height = 400,
  title,
  showGrid = true,
  curve = 'linear',
  className,
}) => {
  const chartSeries = series.map((s) => ({
    data: s.data.map((d) => d.y),
    label: s.name,
    color: s.color,
    curve: curve === 'smooth' ? ('natural' as const) : ('linear' as const),
  }));

  const xAxisData = series[0]?.data.map((d) => String(d.x)) || [];

  return (
    <div className={className}>
      {title && <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>{title}</h3>}
      <MuiLineChart
        series={chartSeries}
        xAxis={[{ scaleType: 'point', data: xAxisData }]}
        width={typeof width === 'number' ? width : undefined}
        height={typeof height === 'number' ? height : 400}
        grid={{ horizontal: showGrid }}
      />
    </div>
  );
};

LineChart.displayName = 'MUILineChart';

export const BarChart: React.FC<BarChartProps> = ({
  series,
  width = '100%',
  height = 400,
  title,
  orientation = 'vertical',
  stacked = false,
  className,
}) => {
  const chartSeries = series.map((s) => ({
    data: s.data.map((d) => d.y),
    label: s.name,
    color: s.color,
    stack: stacked ? 'total' : undefined,
  }));

  const categoryData = series[0]?.data.map((d) => String(d.x)) || [];

  return (
    <div className={className}>
      {title && <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>{title}</h3>}
      <MuiBarChart
        series={chartSeries}
        xAxis={orientation === 'vertical' ? [{ scaleType: 'band', data: categoryData }] : undefined}
        yAxis={orientation === 'horizontal' ? [{ scaleType: 'band', data: categoryData }] : undefined}
        width={typeof width === 'number' ? width : undefined}
        height={typeof height === 'number' ? height : 400}
        layout={orientation === 'horizontal' ? 'horizontal' : 'vertical'}
      />
    </div>
  );
};

BarChart.displayName = 'MUIBarChart';

export const PieChart: React.FC<PieChartProps> = ({
  data,
  width = '100%',
  height = 400,
  title,

  innerRadius = 0,
  className,
}) => {
  const chartData = data.map((d, index) => ({
    id: index,
    value: d.value,
    label: d.label,
    color: d.color,
  }));

  return (
    <div className={className}>
      {title && <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>{title}</h3>}
      <MuiPieChart
        series={[
          {
            data: chartData,
            innerRadius,
          },
        ]}
        width={typeof width === 'number' ? width : undefined}
        height={typeof height === 'number' ? height : 400}
      />
    </div>
  );
};

PieChart.displayName = 'MUIPieChart';
