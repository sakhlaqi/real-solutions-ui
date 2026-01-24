import React from 'react';
import './IconButton.css';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  rounded?: boolean;
  ariaLabel: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  variant = 'ghost',
  size = 'md',
  rounded = false,
  ariaLabel,
  className = '',
  ...props
}) => {
  const classes = [
    'icon-btn',
    `icon-btn-${variant}`,
    `icon-btn-${size}`,
    rounded ? 'icon-btn-rounded' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} aria-label={ariaLabel} {...props}>
      {icon}
    </button>
  );
};
