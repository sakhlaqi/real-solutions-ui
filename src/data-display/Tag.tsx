import React from 'react';
import './Tag.css';

export interface TagProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  outline?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export const Tag: React.FC<TagProps> = ({
  children,
  variant = 'default',
  size = 'md',
  outline = false,
  icon,
  className = '',
}) => {
  const classes = [
    'tag',
    `tag-${variant}`,
    `tag-${size}`,
    outline ? 'tag-outline' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes}>
      {icon && <span className="tag-icon">{icon}</span>}
      <span className="tag-label">{children}</span>
    </span>
  );
};
