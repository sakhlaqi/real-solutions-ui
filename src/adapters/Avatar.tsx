/**
 * Adaptive Avatar Component
 * 
 * Automatically switches between internal and MUI implementations based on UIProvider.
 */

import React from 'react';
import { useUIContext } from '../core/context';
import { Avatar as InternalAvatar } from '../data-display';
import { Avatar as MUIAvatar } from '../providers/mui';

export interface AvatarProps {
  src?: string;
  alt?: string;
  children?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  variant?: 'circular' | 'rounded' | 'square';
  color?: string;
}

/**
 * Adaptive Avatar Component
 * 
 * @example
 * ```tsx
 * <Avatar src="/avatar.jpg" alt="User" size="large" />
 * <Avatar>JD</Avatar>
 * ```
 */
export const Avatar: React.FC<AvatarProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'mui') {
    return <MUIAvatar {...props} />;
  }
  
  // Map size to internal size values
  const { size, ...restProps } = props;
  const sizeMap = { small: 'sm', medium: 'md', large: 'lg' } as const;
  const internalSize = size ? sizeMap[size] : 'md';
  
  return <InternalAvatar {...restProps} size={internalSize} />;
};

Avatar.displayName = 'AdapterAvatar';
