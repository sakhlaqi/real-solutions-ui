/**
 * Radix UI RadioGroup Wrapper
 * Adapts Radix UI RadioGroup to match internal RadioGroup API
 */

import React from 'react';
import * as RadixRadioGroup from '@radix-ui/react-radio-group';
import { Flex, Text } from '@radix-ui/themes';
import type { RadioGroupProps } from '../../core/types';

export const RadioGroup: React.FC<RadioGroupProps> = ({
  value,
  onChange,
  options,
  label,
  disabled = false,
  orientation = 'vertical',
  size: _size = 'medium',
  className,
}) => {
  const handleValueChange = (newValue: string) => {
    if (onChange) {
      onChange({ target: { value: newValue } } as any);
    }
  };

  return (
    <Flex direction="column" gap="2">
      {label && (
        <Text as="label" size="2" weight="medium">
          {label}
        </Text>
      )}
      <RadixRadioGroup.Root
        value={value}
        onValueChange={handleValueChange}
        disabled={disabled}
        className={className}
      >
        <Flex direction={orientation === 'vertical' ? 'column' : 'row'} gap="2">
          {options.map((option) => (
            <Text as="label" key={option.value} size="2">
              <Flex gap="2" align="center">
                <RadixRadioGroup.Item value={option.value} disabled={option.disabled} />
                {option.label}
              </Flex>
            </Text>
          ))}
        </Flex>
      </RadixRadioGroup.Root>
    </Flex>
  );
};

export default RadioGroup;
