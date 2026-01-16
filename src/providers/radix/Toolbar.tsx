/**
 * Radix UI Toolbar Wrapper
 * Simple toolbar implementation
 */

import React from 'react';
import { Flex } from '@radix-ui/themes';
import type { ToolbarProps } from '../../core/types';

export const Toolbar: React.FC<ToolbarProps> = ({
  children,
  variant = 'regular',
  disableGutters = false,
  className,
}) => {
  return (
    <Flex
      align="center"
      gap="3"
      className={className}
      style={{
        minHeight: variant === 'dense' ? '48px' : '64px',
        padding: disableGutters ? 0 : '0 16px',
      }}
    >
      {children}
    </Flex>
  );
};

export default Toolbar;
