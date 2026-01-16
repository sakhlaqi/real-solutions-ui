/**
 * Adaptive Switch Component
 * 
 * Automatically switches between internal and MUI implementations based on UIProvider.
 */

import React from 'react';
import { useUIContext } from '../core/context';
import { Toggle as InternalSwitch } from '../forms';
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
  const { provider } = useUIContext();
  
  if (provider === 'mui') {
    return <MUISwitch {...props} />;
  }
  
  // Map to internal Toggle component
  const { color, size, ...internalProps } = props;
  return <InternalSwitch {...internalProps} />;
};

Switch.displayName = 'AdapterSwitch';
