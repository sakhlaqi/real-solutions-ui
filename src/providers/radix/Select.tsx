/**
 * Radix UI Select Wrapper
 * Adapts Radix UI Select to match internal Select API
 */

import React from 'react';
import * as RadixSelect from '@radix-ui/react-select';
import { Text, Flex } from '@radix-ui/themes';
import type { SelectProps } from '../../core/types';

export const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  disabled = false,
  error,
  helperText,
  fullWidth = false,
  size = 'medium',
  className,
}) => {
  const handleValueChange = (newValue: string) => {
    if (onChange) {
      onChange({ target: { value: newValue } } as any);
    }
  };

  return (
    <Flex direction="column" gap="1" style={{ width: fullWidth ? '100%' : undefined }}>
      {label && (
        <Text as="label" size="2" weight="medium">
          {label}
        </Text>
      )}
      <RadixSelect.Root value={value as string} onValueChange={handleValueChange} disabled={disabled}>
        <RadixSelect.Trigger
          className={className}
          style={{
            padding: size === 'small' ? '0.375rem 0.75rem' : size === 'medium' ? '0.5rem 1rem' : '0.625rem 1.25rem',
            fontSize: size === 'small' ? '0.875rem' : size === 'medium' ? '1rem' : '1.125rem',
            borderRadius: '6px',
            border: `1px solid ${error ? 'var(--red-9)' : 'var(--gray-7)'}`,
            backgroundColor: 'var(--color-background)',
            width: fullWidth ? '100%' : 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.5 : 1,
          }}
        >
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon />
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content
            position="popper"
            style={{
              backgroundColor: 'var(--color-background)',
              border: '1px solid var(--gray-7)',
              borderRadius: '6px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              maxHeight: '300px',
              overflow: 'auto',
            }}
          >
            <RadixSelect.Viewport>
              {options
                .filter((option) => {
                  // Filter out options with empty string values as Radix UI doesn't allow them
                  const optionValue = typeof option === 'string' ? option : String(option.value);
                  return optionValue !== '';
                })
                .map((option) => {
                  const optionValue = typeof option === 'string' ? option : String(option.value);
                  return (
                    <RadixSelect.Item
                      key={optionValue}
                      value={optionValue}
                      style={{
                        padding: '0.5rem 1rem',
                        cursor: 'pointer',
                        outline: 'none',
                      }}
                    >
                      <RadixSelect.ItemText>
                        {typeof option === 'string' ? option : option.label}
                      </RadixSelect.ItemText>
                    </RadixSelect.Item>
                  );
                })}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
      {error && (
        <Text size="1" color="red">
          {error}
        </Text>
      )}
      {helperText && !error && (
        <Text size="1" color="gray">
          {helperText}
        </Text>
      )}
    </Flex>
  );
};

export default Select;
