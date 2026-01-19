/**
 * Adapter MultiSelect Component
 * 
 * Dynamically switches between internal and MUI implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { MultiSelect as InternalMultiSelect, MultiSelectProps } from '../forms';

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
export const MultiSelect: React.FC<MultiSelectProps> = (props) => {
  // MultiSelect always uses internal implementation as it's a complex
  // component with chip display and selection logic
  return <InternalMultiSelect {...props} />;
};

MultiSelect.displayName = 'AdapterMultiSelect';
