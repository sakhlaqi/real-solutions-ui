/**
 * Radix UI Charts Wrapper
 * Minimal chart placeholder
 * Note: Radix UI doesn't include charting. For production, integrate Chart.js, Recharts, or similar
 */

import React from 'react';
import { Card, Text } from '@radix-ui/themes';
import type { ChartsProps } from '../../core/types';

export const Charts: React.FC<ChartsProps> = ({
  type = 'line',
  data,
  title,
  width,
  height = 300,
  className,
}) => {
  return (
    <Card className={className} style={{ width, height }}>
      <Text size="4" weight="bold" mb="3">
        {title || `${type.charAt(0).toUpperCase() + type.slice(1)} Chart`}
      </Text>
      <div
        style={{
          width: '100%',
          height: 'calc(100% - 40px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--gray-2)',
          borderRadius: '6px',
        }}
      >
        <Text color="gray">
          Chart placeholder - integrate Chart.js or Recharts for full functionality
        </Text>
      </div>
    </Card>
  );
};

export default Charts;
