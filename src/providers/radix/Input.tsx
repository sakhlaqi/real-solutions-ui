/**
 * Radix UI Input Wrapper
 * Adapts Radix UI TextField to match internal Input API
 */

import React from 'react';
import { TextField, Text, Flex } from '@radix-ui/themes';
import type { BaseInputProps } from '../../core/types';

export const Input: React.FC<BaseInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
  required = false,
  error,
  helperText,
  type = 'text',
  fullWidth = false,
  size = 'medium',
  className,
  ...props
}) => {
  // Map our size to Radix size
  const radixSize = size === 'small' ? '1' : size === 'medium' ? '2' : '3';

  return (
    <Flex direction="column" gap="1" style={{ width: fullWidth ? '100%' : undefined }}>
      {label && (
        <Text as="label" size="2" weight="medium">
          {label}
          {required && <Text color="red"> *</Text>}
        </Text>
      )}
      <TextField.Root
        value={value as string}
        onChange={onChange as any}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        type={type}
        size={radixSize as any}
        className={className}
        color={error ? 'red' : undefined}
        {...props}
      />
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

export default Input;
