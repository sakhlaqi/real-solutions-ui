/**
 * Radix UI Textarea Wrapper
 * Uses TextArea from Radix Themes
 */

import React from 'react';
import { TextArea, Text, Flex } from '@radix-ui/themes';
import type { TextareaProps } from '../../core/types';

export const Textarea: React.FC<TextareaProps> = ({
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
  required = false,
  error,
  helperText,
  rows = 4,
  fullWidth = false,
  size = 'medium',
  className,
  ...props
}) => {
  const radixSize = size === 'small' ? '1' : size === 'medium' ? '2' : '3';

  return (
    <Flex direction="column" gap="1" style={{ width: fullWidth ? '100%' : undefined }}>
      {label && (
        <Text as="label" size="2" weight="medium">
          {label}
          {required && <Text color="red"> *</Text>}
        </Text>
      )}
      <TextArea
        value={value as string}
        onChange={onChange as any}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        rows={rows}
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

export default Textarea;
