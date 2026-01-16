/**
 * Radix UI Checkbox Wrapper
 * Adapts Radix UI Checkbox to match internal Checkbox API
 */

import React from 'react';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import { Text, Flex } from '@radix-ui/themes';
import type { CheckboxProps } from '../../core/types';

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  disabled = false,
  indeterminate = false,
  className,
}) => {
  const handleCheckedChange = (newChecked: boolean) => {
    if (onChange) {
      onChange({ target: { checked: newChecked } } as any);
    }
  };

  return (
    <Flex gap="2" align="center">
      <RadixCheckbox.Root
        checked={indeterminate ? 'indeterminate' : checked}
        onCheckedChange={handleCheckedChange}
        disabled={disabled}
        className={className}
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '4px',
          border: '2px solid var(--gray-7)',
          backgroundColor: checked ? 'var(--blue-9)' : 'var(--color-background)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1,
        }}
      >
        <RadixCheckbox.Indicator>
          <CheckIcon width={16} height={16} color="white" />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      {label && (
        <Text as="label" size="2" style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}>
          {label}
        </Text>
      )}
    </Flex>
  );
};

export default Checkbox;
