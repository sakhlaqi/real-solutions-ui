/**
 * Radix UI ToggleButton Wrapper
 * Uses Radix Toggle
 */

import React from 'react';
import * as RadixToggle from '@radix-ui/react-toggle';
import type { ToggleButtonProps } from '../../core/types';

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  value,
  selected,
  onChange,
  children,
  disabled = false,
  size = 'medium',
  color: _color = 'primary',
  className,
}) => {
  return (
    <RadixToggle.Root
      pressed={selected}
      onPressedChange={(pressed) => onChange?.(pressed ? value : '')}
      disabled={disabled}
      className={className}
      style={{
        padding: size === 'small' ? '6px 12px' : size === 'medium' ? '8px 16px' : '10px 20px',
        fontSize: size === 'small' ? '0.875rem' : size === 'medium' ? '1rem' : '1.125rem',
        border: '1px solid var(--gray-7)',
        borderRadius: '6px',
        backgroundColor: selected ? 'var(--blue-9)' : 'transparent',
        color: selected ? 'white' : 'var(--gray-12)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {children}
    </RadixToggle.Root>
  );
};

export default ToggleButton;
