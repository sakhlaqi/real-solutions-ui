import React from 'react';
import './Chip.css';

export interface ChipProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  onDelete?: () => void;
  icon?: React.ReactNode;
  avatar?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export const Chip: React.FC<ChipProps> = ({
  children,
  variant = 'default',
  size = 'md',
  onDelete,
  icon,
  avatar,
  className = '',
  disabled = false,
}) => {
  const classes = [
    'chip',
    `chip-${variant}`,
    `chip-${size}`,
    onDelete ? 'chip-deletable' : '',
    disabled ? 'chip-disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes}>
      {avatar && <span className="chip-avatar">{avatar}</span>}
      {icon && <span className="chip-icon">{icon}</span>}
      <span className="chip-label">{children}</span>
      {onDelete && !disabled && (
        <button
          type="button"
          className="chip-delete-button"
          onClick={onDelete}
          aria-label="Delete"
        >
          ×
        </button>
      )}
    </span>
  );
};
