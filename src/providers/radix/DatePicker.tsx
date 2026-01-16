/**
 * Radix UI DatePicker Wrapper
 * Minimal date picker using native HTML input
 * Note: For full-featured date picker, consider integrating react-day-picker with Radix Popover
 */

import React from 'react';
import { TextField, Text, Flex } from '@radix-ui/themes';
import type { DatePickerProps } from '../../core/types';

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  disabled = false,
  error,
  helperText,
  fullWidth = false,
  className,
}) => {
  return (
    <Flex direction="column" gap="1" style={{ width: fullWidth ? '100%' : undefined }}>
      {label && (
        <Text as="label" size="2" weight="medium">
          {label}
        </Text>
      )}
      <input
        type="date"
        value={value as string}
        onChange={onChange as any}
        disabled={disabled}
        className={className}
        style={{
          padding: '8px 12px',
          fontSize: '1rem',
          borderRadius: '6px',
          border: `1px solid ${error ? 'var(--red-9)' : 'var(--gray-7)'}`,
          backgroundColor: 'var(--color-background)',
          width: fullWidth ? '100%' : 'auto',
        }}
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

export default DatePicker;
