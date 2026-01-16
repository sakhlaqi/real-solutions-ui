/**
 * Adaptive ToggleButton Component
 * 
 * Automatically switches between internal and MUI implementations based on UIProvider.
 */

import React from 'react';
import { useUIContext } from '../core/context';
import { ToggleButton as InternalToggleButton } from '../buttons';
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
  const { provider } = useUIContext();
  
  if (provider === 'mui') {
    return <MUIToggleButton {...props} />;
  }
  
  // Transform props for internal - wrap in options array
  const { value, onChange, children, disabled, className } = props;
  const internalProps = {
    value,
    onChange: (newValue: string | string[]) => {
      if (onChange && typeof newValue === 'string') {
        onChange(newValue);
      }
    },
    options: [
      {
        value,
        label: children,
      },
    ],
    multiple: false,
    disabled,
    className,
  };

  return <InternalToggleButton {...internalProps} />;
};

ToggleButton.displayName = 'AdapterToggleButton';
