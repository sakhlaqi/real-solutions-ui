/**
 * Adaptive Avatar Component
 * 
 * Uses MUI Avatar for all providers.
 */

import React from 'react';
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
  return <MUIAvatar {...props} />;
};

Avatar.displayName = 'AdapterAvatar';
