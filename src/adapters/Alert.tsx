/**
 * Adapter Alert Component
 * 
 * Dynamically switches between internal and MUI alert implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { BaseAlertProps } from '../core/types';
import { useUIContext } from '../core/context';
import { Alert as InternalAlert } from '../feedback';
import { Alert as MUIAlert } from '../providers/mui';

/**
 * Adaptive Alert Component
 * 
 * Automatically switches between internal and MUI implementations based on UIProvider.
 * 
 * @example
 * ```tsx
 * <Alert severity="success" onClose={() => console.log('closed')}>
 *   Operation completed successfully!
 * </Alert>
 * ```
 */
export const Alert: React.FC<BaseAlertProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'mui') {
    return <MUIAlert {...props} />;
  }
  
  // Transform MUI-style props to internal props
  const { severity, variant: muiVariant, ...restProps } = props;
  // Map MUI variants to internal variants, filter out non-matching ones
  let internalVariant: 'info' | 'success' | 'warning' | 'error' = 'info';
  if (severity && ['info', 'success', 'warning', 'error'].includes(severity)) {
    internalVariant = severity as 'info' | 'success' | 'warning' | 'error';
  }
  
  return <InternalAlert {...restProps} variant={internalVariant} />;
};

Alert.displayName = 'AdapterAlert';
