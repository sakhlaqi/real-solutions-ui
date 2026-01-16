/**
 * Radix UI Autocomplete Wrapper
 * Simple combobox-style autocomplete
 */

import React, { useState } from 'react';
import { TextField, Flex, Card } from '@radix-ui/themes';
import type { AutocompleteProps } from '../../core/types';

export const Autocomplete: React.FC<AutocompleteProps> = ({
  options,
  value,
  onChange,
  label,
  placeholder,
  disabled = false,
  fullWidth = false,
  className,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <Flex direction="column" gap="1" style={{ width: fullWidth ? '100%' : undefined, position: 'relative' }}>
      {label && <label>{label}</label>}
      <TextField.Root
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setShowOptions(true);
        }}
        placeholder={placeholder}
        disabled={disabled}
        className={className}
        onFocus={() => setShowOptions(true)}
        onBlur={() => setTimeout(() => setShowOptions(false), 200)}
      />
      {showOptions && filteredOptions.length > 0 && (
        <Card
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 1000,
            maxHeight: '200px',
            overflow: 'auto',
            marginTop: '4px',
          }}
        >
          {filteredOptions.map((option, index) => (
            <div
              key={index}
              onClick={() => {
                setInputValue(option.label);
                if (onChange) {
                  onChange(option);
                }
                setShowOptions(false);
              }}
              style={{
                padding: '8px 12px',
                cursor: 'pointer',
              }}
            >
              {option.label}
            </div>
          ))}
        </Card>
      )}
    </Flex>
  );
};

export default Autocomplete;
