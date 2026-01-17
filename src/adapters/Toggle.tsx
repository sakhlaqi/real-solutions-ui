/**
 * Adapter Toggle Component
 * 
 * Dynamically switches between internal, MUI, and Radix implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { Toggle as InternalToggle, ToggleProps } from '../forms';

/**
 * Adaptive Toggle Component
 * 
 * @example
 * ```tsx
 * <Toggle
 *   label="Enable notifications"
 *   checked={enabled}
 *   onChange={setEnabled}
 * />
 * ```
 */
export const Toggle: React.FC<ToggleProps> = (props) => {
  // Toggle always uses internal implementation
  return <InternalToggle {...props} />;
};

Toggle.displayName = 'AdapterToggle';
