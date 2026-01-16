/**
 * Radix UI AppBar Wrapper
 * Simple app bar/header implementation
 */

import React from 'react';
import { Flex, Container } from '@radix-ui/themes';
import type { AppBarProps } from '../../core/types';

export const AppBar: React.FC<AppBarProps> = ({
  position = 'fixed',
  color = 'primary',
  elevation = 4,
  children,
  className,
}) => {
  return (
    <div
      className={className}
      style={{
        position: position,
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: color === 'primary' ? 'var(--blue-9)' : 'var(--gray-2)',
        color: color === 'primary' ? 'white' : 'var(--gray-12)',
        boxShadow: `0 ${elevation}px ${elevation * 2}px rgba(0, 0, 0, 0.1)`,
        zIndex: 100,
        padding: '16px',
      }}
    >
      <Container>
        <Flex align="center" justify="between">
          {children}
        </Flex>
      </Container>
    </div>
  );
};

export default AppBar;
