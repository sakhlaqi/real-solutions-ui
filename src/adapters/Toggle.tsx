/**
 * Adapter Toggle Component
 * 
 * Dynamically switches between internal, MUI, Radix, and Shadcn implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { useUIContext } from '../core/context';
import { Toggle as InternalToggle, ToggleProps } from '../forms';
import { Toggle as ShadcnToggle } from '../providers/shadcn';

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
  const { provider } = useUIContext();
  
  if (provider === 'shadcn') {
    return <ShadcnToggle {...props as any} />;
  }
  
  // Toggle uses internal implementation for other providers
  return <InternalToggle {...props} />;
};

Toggle.displayName = 'AdapterToggle';
