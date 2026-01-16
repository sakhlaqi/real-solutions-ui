/**
 * Radix UI Separator/Divider Wrapper
 * Adapts Radix UI Separator to match internal Divider API
 */

import React from 'react';
import { Separator } from '@radix-ui/themes';
import type { DividerProps } from '../../core/types';

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  variant = 'fullWidth',
  className,
}) => {
  return (
    <Separator
      orientation={orientation}
      size="4"
      className={className}
      style={{
        margin: orientation === 'horizontal' ? '16px 0' : '0 16px',
      }}
    />
  );
};

export default Divider;
