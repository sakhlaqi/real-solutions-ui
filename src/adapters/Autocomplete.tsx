/**
 * Adaptive Autocomplete Component
 * 
 * Automatically switches between internal and MUI implementations based on UIProvider.
 */

import React from 'react';
import { useUIContext } from '../core/context';
import { Autocomplete as InternalAutocomplete } from '../forms';
import { Autocomplete as MUIAutocomplete } from '../providers/mui';
import { Autocomplete as RadixAutocomplete } from '../providers/radix';

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
  const { provider } = useUIContext();
  
  if (provider === 'mui') {
    return <MUIAutocomplete {...props} />;
  }
  
  if (provider === 'radix') {
    return <RadixAutocomplete {...props} />;
  }
  
  // Transform options to add id field required by internal
  const { options, value, ...restProps } = props;
  const internalOptions = options.map(opt => ({
    id: opt.value,
    value: opt.value,
    label: opt.label,
  }));
  
  // Transform value to add id field if it exists
  const internalValue = value ? {
    id: value.value,
    value: value.value,
    label: value.label,
  } : null;
  
  return <InternalAutocomplete {...restProps} options={internalOptions} value={internalValue} />;
};

Autocomplete.displayName = 'AdapterAutocomplete';
