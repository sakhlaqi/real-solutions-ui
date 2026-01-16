import React from 'react';
import './Avatar.css';

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square';
  status?: 'online' | 'offline' | 'away' | 'busy';
  className?: string;
}

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  size = 'md',
  shape = 'circle',
  status,
  className = '',
}) => {
  const classes = [
    'avatar',
    `avatar-${size}`,
    `avatar-${shape}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = src ? (
    <img src={src} alt={alt || name || 'Avatar'} className="avatar-img" />
  ) : name ? (
    <span className="avatar-initials">{getInitials(name)}</span>
  ) : (
    <span className="avatar-fallback">👤</span>
  );

  return (
    <div className={classes}>
      {content}
      {status && <span className={`avatar-status avatar-status-${status}`} />}
    </div>
  );
};
