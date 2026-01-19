/**
 * Adaptive ToggleButton Component
 * 
 * Uses MUI ToggleButton for all providers.
 */

import React from 'react';
import { ToggleButton as MUIToggleButton } from '../providers/mui';

export interface ToggleButtonProps {
  value: string;
  selected?: boolean;
  onChange?: (value: string) => void;
  children: React.ReactNode;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

/**
 * Adaptive ToggleButton Component
 * 
 * @example
 * ```tsx
 * <ToggleButton
 *   value="bold"
 *   selected={isBold}
 *   onChange={() => setIsBold(!isBold)}
 * >
 *   <BoldIcon />
 * </ToggleButton>
 * ```
 */
export const ToggleButton: React.FC<ToggleButtonProps> = (props) => {
  return <MUIToggleButton {...props} />;
};

ToggleButton.displayName = 'AdapterToggleButton';
