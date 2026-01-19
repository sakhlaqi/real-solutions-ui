/**
 * Adapter Alert Component
 * 
 * Uses MUI Alert for all providers.
 */

import React from 'react';
import { BaseAlertProps } from '../core/types';
import { Alert as MUIAlert } from '../providers/mui';

/**
 * Adaptive Alert Component
 * 
 * @example
 * ```tsx
 * <Alert severity="success" onClose={() => console.log('closed')}>
 *   Operation completed successfully!
 * </Alert>
 * ```
 */
export const Alert: React.FC<BaseAlertProps> = (props) => {
  return <MUIAlert {...props} />;
};

Alert.displayName = 'AdapterAlert';
