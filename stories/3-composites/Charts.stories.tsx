import type { Meta, StoryObj } from '@storybook/react';
import { LineChart, BarChart, PieChart } from '../../src/adapters/Charts';

/**
 * Chart components that adapt to the selected UI provider.
 * Currently uses MUI X Charts for all providers.
 * 
 * ## Supported Providers
 * - **internal**: Uses MUI X Charts (fallback)
 * - **mui**: MUI X Charts
 */
const meta = {
  title: 'Data Display/Charts',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;

// Sample data for charts
const monthlyData = [
  { x: 'Jan', y: 4000 },
  { x: 'Feb', y: 3000 },
  { x: 'Mar', y: 5000 },
  { x: 'Apr', y: 4500 },
  { x: 'May', y: 6000 },
  { x: 'Jun', y: 5500 },
];

const quarterlyData = [
  { x: 'Q1', y: 12000 },
  { x: 'Q2', y: 15000 },
  { x: 'Q3', y: 18000 },
  { x: 'Q4', y: 21000 },
];

const multiSeriesData = {
  series1: [
    { x: 'Jan', y: 4000 },
    { x: 'Feb', y: 3000 },
    { x: 'Mar', y: 5000 },
    { x: 'Apr', y: 4500 },
    { x: 'May', y: 6000 },
    { x: 'Jun', y: 5500 },
  ],
  series2: [
    { x: 'Jan', y: 2400 },
    { x: 'Feb', y: 1398 },
    { x: 'Mar', y: 9800 },
    { x: 'Apr', y: 3908 },
    { x: 'May', y: 4800 },
    { x: 'Jun', y: 3800 },
  ],
  series3: [
    { x: 'Jan', y: 2400 },
    { x: 'Feb', y: 3000 },
    { x: 'Mar', y: 2000 },
    { x: 'Apr', y: 2780 },
    { x: 'May', y: 1890 },
    { x: 'Jun', y: 2390 },
  ],
};

const categoryData = [
  { label: 'Product A', value: 400 },
  { label: 'Product B', value: 300 },
  { label: 'Product C', value: 300 },
  { label: 'Product D', value: 200 },
];

// LineChart Stories
export const LineChartBasic: StoryObj = {
  render: () => (
    <div style={{ width: '100%', height: 400 }}>
      <LineChart
        series={[
          {
            name: 'Sales',
            data: monthlyData,
            color: '#3b82f6',
          },
        ]}
        title="Monthly Sales"
        height={400}
      />
    </div>
  ),
};

export const LineChartMultipleSeries: StoryObj = {
  render: () => (
    <div style={{ width: '100%', height: 400 }}>
      <LineChart
        series={[
          {
            name: 'Revenue',
            data: multiSeriesData.series1,
            color: '#3b82f6',
          },
          {
            name: 'Expenses',
            data: multiSeriesData.series2,
            color: '#ef4444',
          },
          {
            name: 'Profit',
            data: multiSeriesData.series3,
            color: '#10b981',
          },
        ]}
        title="Financial Overview"
        height={400}
        showGrid={true}
      />
    </div>
  ),
};

export const LineChartSmooth: StoryObj = {
  render: () => (
    <div style={{ width: '100%', height: 400 }}>
      <LineChart
        series={[
          {
            name: 'Growth',
            data: monthlyData,
            color: '#8b5cf6',
          },
        ]}
        title="Smooth Curve"
        height={400}
        curve="smooth"
        showGrid={true}
      />
    </div>
  ),
};

export const LineChartNoGrid: StoryObj = {
  render: () => (
    <div style={{ width: '100%', height: 400 }}>
      <LineChart
        series={[
          {
            name: 'Temperature',
            data: [
              { x: 'Mon', y: 22 },
              { x: 'Tue', y: 25 },
              { x: 'Wed', y: 23 },
              { x: 'Thu', y: 28 },
              { x: 'Fri', y: 26 },
              { x: 'Sat', y: 24 },
              { x: 'Sun', y: 27 },
            ],
            color: '#f59e0b',
          },
        ]}
        title="Weekly Temperature (°C)"
        height={400}
        showGrid={false}
      />
    </div>
  ),
};

// BarChart Stories
export const BarChartBasic: StoryObj = {
  render: () => (
    <div style={{ width: '100%', height: 400 }}>
      <BarChart
        series={[
          {
            name: 'Revenue',
            data: quarterlyData,
            color: '#3b82f6',
          },
        ]}
        title="Quarterly Revenue"
        height={400}
      />
    </div>
  ),
};

export const BarChartMultipleSeries: StoryObj = {
  render: () => (
    <div style={{ width: '100%', height: 400 }}>
      <BarChart
        series={[
          {
            name: '2023',
            data: quarterlyData,
            color: '#3b82f6',
          },
          {
            name: '2024',
            data: [
              { x: 'Q1', y: 14000 },
              { x: 'Q2', y: 17000 },
              { x: 'Q3', y: 20000 },
              { x: 'Q4', y: 23000 },
            ],
            color: '#10b981',
          },
        ]}
        title="Year-over-Year Comparison"
        height={400}
      />
    </div>
  ),
};

export const BarChartStacked: StoryObj = {
  render: () => (
    <div style={{ width: '100%', height: 400 }}>
      <BarChart
        series={[
          {
            name: 'Online Sales',
            data: monthlyData,
            color: '#3b82f6',
          },
          {
            name: 'Store Sales',
            data: multiSeriesData.series2,
            color: '#10b981',
          },
        ]}
        title="Sales by Channel (Stacked)"
        height={400}
        stacked={true}
      />
    </div>
  ),
};

export const BarChartHorizontal: StoryObj = {
  render: () => (
    <div style={{ width: '100%', height: 400 }}>
      <BarChart
        series={[
          {
            name: 'Score',
            data: [
              { x: 'Team A', y: 85 },
              { x: 'Team B', y: 92 },
              { x: 'Team C', y: 78 },
              { x: 'Team D', y: 95 },
              { x: 'Team E', y: 88 },
            ],
            color: '#8b5cf6',
          },
        ]}
        title="Team Performance"
        height={400}
        orientation="horizontal"
      />
    </div>
  ),
};

// PieChart Stories
export const PieChartBasic: StoryObj = {
  render: () => (
    <div style={{ width: '100%', height: 400 }}>
      <PieChart
        data={categoryData}
        title="Product Distribution"
        height={400}
      />
    </div>
  ),
};

export const PieChartWithColors: StoryObj = {
  render: () => (
    <div style={{ width: '100%', height: 400 }}>
      <PieChart
        data={[
          { label: 'Direct', value: 4000, color: '#3b82f6' },
          { label: 'Social Media', value: 3000, color: '#8b5cf6' },
          { label: 'Email', value: 2000, color: '#10b981' },
          { label: 'Referral', value: 2780, color: '#f59e0b' },
          { label: 'Organic', value: 1890, color: '#ef4444' },
        ]}
        title="Traffic Sources"
        height={400}
        showLegend={true}
      />
    </div>
  ),
};

export const PieChartDonut: StoryObj = {
  render: () => (
    <div style={{ width: '100%', height: 400 }}>
      <PieChart
        data={[
          { label: 'Mobile', value: 45, color: '#3b82f6' },
          { label: 'Desktop', value: 35, color: '#10b981' },
          { label: 'Tablet', value: 20, color: '#f59e0b' },
        ]}
        title="Device Usage (%)"
        height={400}
        innerRadius={60}
        showLegend={true}
      />
    </div>
  ),
};

export const PieChartMarketShare: StoryObj = {
  render: () => (
    <div style={{ width: '100%', height: 400 }}>
      <PieChart
        data={[
          { label: 'Company A', value: 35, color: '#3b82f6' },
          { label: 'Company B', value: 28, color: '#8b5cf6' },
          { label: 'Company C', value: 20, color: '#10b981' },
          { label: 'Company D', value: 10, color: '#f59e0b' },
          { label: 'Others', value: 7, color: '#6b7280' },
        ]}
        title="Market Share 2024"
        height={400}
        showLegend={true}
      />
    </div>
  ),
};

// Combined Dashboard Story
export const ChartsDashboard: StoryObj = {
  render: () => (
    <div style={{ width: '100%', padding: '2rem' }}>
      <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>Sales Dashboard</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '2rem' }}>
        <div>
          <LineChart
            series={[
              {
                name: 'Sales',
                data: monthlyData,
                color: '#3b82f6',
              },
            ]}
            title="Monthly Sales Trend"
            height={300}
            showGrid={true}
          />
        </div>
        
        <div>
          <BarChart
            series={[
              {
                name: 'Revenue',
                data: quarterlyData,
                color: '#10b981',
              },
            ]}
            title="Quarterly Revenue"
            height={300}
          />
        </div>
        
        <div>
          <PieChart
            data={categoryData}
            title="Product Distribution"
            height={300}
          />
        </div>
        
        <div>
          <BarChart
            series={[
              {
                name: 'Online',
                data: [
                  { x: 'Jan', y: 3000 },
                  { x: 'Feb', y: 2000 },
                  { x: 'Mar', y: 4000 },
                  { x: 'Apr', y: 3500 },
                  { x: 'May', y: 5000 },
                  { x: 'Jun', y: 4500 },
                ],
                color: '#3b82f6',
              },
              {
                name: 'Store',
                data: [
                  { x: 'Jan', y: 1000 },
                  { x: 'Feb', y: 1000 },
                  { x: 'Mar', y: 1000 },
                  { x: 'Apr', y: 1000 },
                  { x: 'May', y: 1000 },
                  { x: 'Jun', y: 1000 },
                ],
                color: '#10b981',
              },
            ]}
            title="Sales by Channel"
            height={300}
            stacked={true}
          />
        </div>
      </div>
    </div>
  ),
};
