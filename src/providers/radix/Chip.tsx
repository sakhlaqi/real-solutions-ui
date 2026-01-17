/**
 * Radix UI Chip Wrapper
 * Uses Badge with close functionality
 */

import React from 'react';
import { Badge } from '@radix-ui/themes';
import { Cross2Icon } from '@radix-ui/react-icons';
import type { ChipProps } from '../../core/types';

export const Chip: React.FC<ChipProps> = ({
  label,
  onDelete,
  color = 'primary',
  variant = 'filled',
  size = 'medium',
  icon,
  avatar,
  className,
}) => {
  const radixColor = color === 'error' ? 'red' :
                     color === 'warning' ? 'orange' :
                     color === 'info' ? 'blue' :
                     color === 'success' ? 'green' :
                     color === 'secondary' ? 'gray' : 'blue';

  const radixVariant = variant === 'filled' ? 'solid' : 'soft';
  const radixSize = size === 'small' ? '1' : '2';

  return (
    <Badge
      color={radixColor as any}
      variant={radixVariant as any}
      size={radixSize as any}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
      }}
    >
      {avatar && <span style={{ marginRight: '4px' }}>{avatar}</span>}
      {icon && <span style={{ marginRight: '4px' }}>{icon}</span>}
      {label}
      {onDelete && (
        <button
          onClick={onDelete}
          style={{
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            padding: '2px',
            display: 'flex',
            marginLeft: '4px',
          }}
          aria-label="Delete"
        >
          <Cross2Icon width={12} height={12} />
        </button>
      )}
    </Badge>
  );
};

export default Chip;
