/**
 * Adapter MultiSelect Component
 * 
 * Uses MUI Autocomplete for all providers.
 * Internal implementation is deprecated in favor of MUI's Autocomplete component.
 */

import React from 'react';
import { Autocomplete, TextField, Chip } from '@mui/material';

export interface MultiSelectOption {
  value: string;
  label: string;
}

export interface MultiSelectProps {
  value?: string[];
  onChange?: (value: string[]) => void;
  options: MultiSelectOption[];
  label?: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  searchable?: boolean;
  maxSelections?: number;
  className?: string;
}

/**
 * Adaptive MultiSelect Component
 * 
 * @example
 * ```tsx
 * <MultiSelect
 *   options={[
 *     { value: 'react', label: 'React' },
 *     { value: 'vue', label: 'Vue' },
 *     { value: 'angular', label: 'Angular' }
 *   ]}
 *   value={selected}
 *   onChange={setSelected}
 *   label="Select Frameworks"
 * />
 * ```
 */
export const MultiSelect: React.FC<MultiSelectProps> = ({
  value = [],
  onChange,
  options,
  label,
  placeholder,
  error = false,
  helperText,
  searchable = true,
  maxSelections,
  className,
}) => {
  const selectedOptions = options.filter((opt) => value.includes(opt.value));

  const handleChange = (_: any, newValue: MultiSelectOption[]) => {
    if (maxSelections && newValue.length > maxSelections) {
      return;
    }
    onChange?.(newValue.map((option) => option.value));
  };

  return (
    <Autocomplete
      multiple
      options={options}
      getOptionLabel={(option) => option.label}
      value={selectedOptions}
      onChange={handleChange}
      disableCloseOnSelect
      className={className}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          error={error}
          helperText={helperText}
        />
      )}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            label={option.label}
            {...getTagProps({ index })}
            key={option.value}
          />
        ))
      }
      isOptionEqualToValue={(option, value) => option.value === value.value}
      filterOptions={searchable ? undefined : () => options}
    />
  );
};

MultiSelect.displayName = 'AdapterMultiSelect';
