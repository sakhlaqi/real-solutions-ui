/**
 * Example: Charts with MUI X Charts
 */

import React from 'react';
import { UIProvider, LineChart, BarChart, PieChart } from '../src';

export function ChartsExample() {
  const salesData = [
    { name: 'Revenue', data: [
      { x: 'Jan', y: 4000 },
      { x: 'Feb', y: 3000 },
      { x: 'Mar', y: 5000 },
      { x: 'Apr', y: 4500 },
      { x: 'May', y: 6000 },
      { x: 'Jun', y: 5500 },
    ]},
    { name: 'Profit', data: [
      { x: 'Jan', y: 2400 },
      { x: 'Feb', y: 1398 },
      { x: 'Mar', y: 9800 },
      { x: 'Apr', y: 3908 },
      { x: 'May', y: 4800 },
      { x: 'Jun', y: 3800 },
    ]},
  ];

  const categoryData = [
    { label: 'Electronics', value: 30 },
    { label: 'Clothing', value: 25 },
    { label: 'Food', value: 20 },
    { label: 'Books', value: 15 },
    { label: 'Other', value: 10 },
  ];

  return (
    <UIProvider defaultProvider="mui">
      <div style={{ padding: '2rem' }}>
        <h2>Analytics Dashboard (MUI X Charts)</h2>

        <div style={{ marginBottom: '3rem' }}>
          <h3>Sales Trend (Line Chart)</h3>
          <LineChart
            series={salesData}
            height={400}
            showGrid
            showLegend
            curve="smooth"
          />
        </div>

        <div style={{ marginBottom: '3rem' }}>
          <h3>Monthly Comparison (Bar Chart)</h3>
          <BarChart
            series={salesData}
            height={400}
            orientation="vertical"
            showLegend
          />
        </div>

        <div style={{ marginBottom: '3rem' }}>
          <h3>Category Distribution (Pie Chart)</h3>
          <PieChart
            data={categoryData}
            height={400}
            showLegend
          />
        </div>

        <div>
          <h3>Donut Chart</h3>
          <PieChart
            data={categoryData}
            height={400}
            showLegend
            innerRadius={60}
          />
        </div>
      </div>
    </UIProvider>
  );
}
