/**
 * MUI Autocomplete Wrapper Component
 */

import React from 'react';
import { Autocomplete as MUIAutocomplete, TextField } from '@mui/material';

export interface AutocompleteOption {
  value: string | number;
  label: string;
}

export interface AutocompleteProps {
  options: AutocompleteOption[];
  value?: AutocompleteOption | null;
  onChange: (value: AutocompleteOption | null) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  multiple?: boolean;
}

/**
 * MUI Autocomplete wrapper component
 */
export const Autocomplete: React.FC<AutocompleteProps> = ({
  options,
  value,
  onChange,
  label,
  placeholder,
  disabled = false,
  multiple = false,
}) => {
  const handleChange = (_event: any, newValue: AutocompleteOption | null) => {
    onChange(newValue);
  };

  return (
    <MUIAutocomplete
      options={options}
      value={value}
      onChange={handleChange}
      disabled={disabled}
      multiple={multiple as false}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          inputProps={{
            ...params.inputProps,
            // Prevent React warning about controlled input without onChange
            readOnly: false,
          }}
        />
      )}
    />
  );
};

Autocomplete.displayName = 'MUIAutocomplete';
