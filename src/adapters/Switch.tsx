/**
 * Adaptive Switch Component
 * 
 * Uses MUI Switch for all providers.
 */

import React from 'react';
import { Switch as MUISwitch } from '../providers/mui';

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  color?: 'primary' | 'secondary' | 'default';
  size?: 'small' | 'medium';
}

/**
 * Adaptive Switch Component
 * 
 * @example
 * ```tsx
 * <Switch checked={enabled} onChange={setEnabled} label="Enable notifications" />
 * ```
 */
export const Switch: React.FC<SwitchProps> = (props) => {
  return <MUISwitch {...props} />;
};

Switch.displayName = 'AdapterSwitch';
