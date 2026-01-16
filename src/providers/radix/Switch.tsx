/**
 * Radix UI Switch Wrapper
 * Adapts Radix UI Switch to match internal Switch API
 */

import React from 'react';
import { Switch as RadixSwitch, Text, Flex } from '@radix-ui/themes';
import type { SwitchProps } from '../../core/types';

export const Switch: React.FC<SwitchProps> = ({
  label,
  checked,
  onChange,
  disabled = false,
  size = 'medium',
  className,
}) => {
  const handleCheckedChange = (newChecked: boolean) => {
    if (onChange) {
      onChange({ target: { checked: newChecked } } as any);
    }
  };

  // Map our size to Radix size
  const radixSize = size === 'small' ? '1' : size === 'medium' ? '2' : '3';

  return (
    <Flex gap="2" align="center">
      <RadixSwitch
        checked={checked}
        onCheckedChange={handleCheckedChange}
        disabled={disabled}
        size={radixSize as any}
        className={className}
      />
      {label && (
        <Text as="label" size="2" style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}>
          {label}
        </Text>
      )}
    </Flex>
  );
};

export default Switch;
