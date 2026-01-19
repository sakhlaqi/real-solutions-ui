/**
 * Adapter Toggle Component
 * 
 * Toggle is an alias for Switch. Uses MUI Switch for all providers.
 * @deprecated Use Switch instead of Toggle
 */

import React from 'react';
import { Switch as MUISwitch } from '../providers/mui';

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  color?: 'primary' | 'secondary' | 'default';
  size?: 'small' | 'medium';
}

/**
 * Adaptive Toggle Component (Alias for Switch)
 * 
 * @deprecated Use Switch instead
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
  return <MUISwitch {...props} />;
};

Toggle.displayName = 'AdapterToggle';
