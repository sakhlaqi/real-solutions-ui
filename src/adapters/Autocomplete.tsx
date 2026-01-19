/**
 * Adaptive Autocomplete Component
 * 
 * Uses MUI Autocomplete for all providers.
 * Internal implementation is deprecated in favor of MUI's production-ready component.
 */

import React from 'react';
import { Autocomplete as MUIAutocomplete } from '../providers/mui';

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
 * Adaptive Autocomplete Component
 * 
 * Note: This component now uses MUI implementation for all providers.
 * 
 * @example
 * ```tsx
 * <Autocomplete
 *   options={cities}
 *   value={selectedCity}
 *   onChange={setSelectedCity}
 *   label="Select City"
 * />
 * ```
 */
export const Autocomplete: React.FC<AutocompleteProps> = (props) => {
  return <MUIAutocomplete {...props} />;
};

Autocomplete.displayName = 'AdapterAutocomplete';
