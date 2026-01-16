/**
 * Adaptive Divider Component
 * 
 * Automatically switches between internal and MUI implementations based on UIProvider.
 */

import React from 'react';
import { useUIContext } from '../core/context';
import { Divider as InternalDivider } from '../layout';
import { Divider as MUIDivider } from '../providers/mui';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'fullWidth' | 'inset' | 'middle';
  flexItem?: boolean;
  className?: string;
}

/**
 * Adaptive Divider Component
 * 
 * @example
 * ```tsx
 * <Divider />
 * <Divider orientation="vertical" flexItem />
 * ```
 */
export const Divider: React.FC<DividerProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'mui') {
    return <MUIDivider {...props} />;
  }
  
  // Filter props not supported by internal
  const { variant, flexItem, ...internalProps } = props;
  return <InternalDivider {...internalProps} />;
};

Divider.displayName = 'AdapterDivider';
