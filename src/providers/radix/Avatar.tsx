/**
 * Radix UI Avatar Wrapper
 * Adapts Radix UI Avatar to match internal Avatar API
 */

import React from 'react';
import { Avatar as RadixAvatar } from '@radix-ui/themes';
import type { AvatarProps } from '../../core/types';

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  children,
  size = 'medium',
  variant = 'circular',
  className,
}) => {
  const sizeMap = {
    small: '1',
    medium: '3',
    large: '5',
  };

  const radixSize = sizeMap[size];
  const radius = variant === 'rounded' ? 'medium' : variant === 'square' ? 'none' : 'full';

  return (
    <RadixAvatar
      src={src}
      fallback={alt ? alt.charAt(0).toUpperCase() : children?.toString().charAt(0).toUpperCase() || '?'}
      size={radixSize as any}
      radius={radius as any}
      className={className}
    />
  );
};

export default Avatar;
