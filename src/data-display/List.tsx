import React from 'react';
import './List.css';

export interface ListItemProps {
  children: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  className?: string;
}

export const ListItem: React.FC<ListItemProps> = ({
  children,
  prefix,
  suffix,
  onClick,
  active = false,
  disabled = false,
  className = '',
}) => {
  const classes = [
    'list-item',
    onClick ? 'list-item-clickable' : '',
    active ? 'list-item-active' : '',
    disabled ? 'list-item-disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = () => {
    if (onClick && !disabled) {
      onClick();
    }
  };

  return (
    <li className={classes} onClick={handleClick}>
      {prefix && <span className="list-item-prefix">{prefix}</span>}
      <span className="list-item-content">{children}</span>
      {suffix && <span className="list-item-suffix">{suffix}</span>}
    </li>
  );
};

export interface ListProps {
  children: React.ReactNode;
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  divided?: boolean;
  className?: string;
}

export const List: React.FC<ListProps> = ({
  children,
  spacing = 'md',
  divided = false,
  className = '',
}) => {
  const classes = [
    'list',
    `list-spacing-${spacing}`,
    divided ? 'list-divided' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <ul className={classes}>{children}</ul>;
};
