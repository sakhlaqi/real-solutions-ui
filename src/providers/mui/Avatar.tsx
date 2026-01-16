/**
 * MUI Avatar Wrapper Component
 */

import React from 'react';
import { Avatar as MUIAvatar } from '@mui/material';

export interface AvatarProps {
  src?: string;
  alt?: string;
  children?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  variant?: 'circular' | 'rounded' | 'square';
  color?: string;
}

/**
 * MUI Avatar wrapper component
 */
export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  children,
  size = 'medium',
  variant = 'circular',
  color,
}) => {
  // Map size to MUI dimensions
  const sizeMap = {
    small: { width: 32, height: 32 },
    medium: { width: 40, height: 40 },
    large: { width: 56, height: 56 },
  };

  return (
    <MUIAvatar
      src={src}
      alt={alt}
      variant={variant}
      sx={{
        ...sizeMap[size],
        bgcolor: color,
      }}
    >
      {children}
    </MUIAvatar>
  );
};

Avatar.displayName = 'MUIAvatar';
