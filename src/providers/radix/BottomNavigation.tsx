/**
 * Radix UI BottomNavigation Wrapper
 * Simple bottom navigation implementation
 */

import React from 'react';
import { Flex } from '@radix-ui/themes';
import type { BottomNavigationProps } from '../../core/types';

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  value: _value,
  onChange: _onChange,
  showLabels: _showLabels = true,
  children,
  className,
}) => {
  return (
    <Flex
      align="center"
      justify="between"
      className={className}
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'var(--color-background)',
        borderTop: '1px solid var(--gray-6)',
        padding: '8px 0',
        zIndex: 100,
      }}
    >
      {children}
    </Flex>
  );
};

export default BottomNavigation;
