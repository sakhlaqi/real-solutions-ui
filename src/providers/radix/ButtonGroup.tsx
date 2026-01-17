/**
 * Radix UI ButtonGroup Wrapper
 * Groups buttons together
 */

import React from 'react';
import { Flex } from '@radix-ui/themes';
import type { ButtonGroupProps } from '../../core/types';

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  orientation = 'horizontal',
  variant: _variant = 'outlined',
  color: _color = 'primary',
  size: _size = 'medium',
  fullWidth = false,
  className,
}) => {
  return (
    <Flex
      direction={orientation === 'vertical' ? 'column' : 'row'}
      gap="0"
      className={className}
      style={{
        width: fullWidth ? '100%' : 'auto',
      }}
    >
      {children}
    </Flex>
  );
};

export default ButtonGroup;
