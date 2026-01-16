/**
 * Header Component
 * Page header with logo and navigation
 */

import React from 'react';
import './Header.css';

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  sticky?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  children,
  sticky = false,
  className = '',
  ...props
}) => {
  const classes = ['header', sticky ? 'header-sticky' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={classes} {...props}>
      <div className="header-container">{children}</div>
    </header>
  );
};
