/**
 * Radix UI Badge Wrapper
 * Adapts Radix UI Badge to match internal Badge API
 */

import React from 'react';
import { Badge as RadixBadge } from '@radix-ui/themes';
import type { BadgeProps } from '../../core/types';

export const Badge: React.FC<BadgeProps> = ({
  children,
  color = 'primary',
  variant = 'default',
  size = 'medium',
  className,
}) => {
  const radixColor = color === 'error' ? 'red' :
                     color === 'warning' ? 'orange' :
                     color === 'info' ? 'blue' :
                     color === 'success' ? 'green' :
                     color === 'secondary' ? 'gray' : 'blue';

  const radixVariant = variant === 'filled' ? 'solid' : 'soft';
  const radixSize = size === 'small' ? '1' : size === 'medium' ? '2' : '2';

  return (
    <RadixBadge
      color={radixColor as any}
      variant={radixVariant as any}
      size={radixSize as any}
      className={className}
    >
      {children}
    </RadixBadge>
  );
};

export default Badge;
