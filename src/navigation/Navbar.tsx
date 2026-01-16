import React from 'react';
import './Navbar.css';

export interface NavbarProps {
  children: React.ReactNode;
  logo?: React.ReactNode;
  actions?: React.ReactNode;
  sticky?: boolean;
  transparent?: boolean;
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  children,
  logo,
  actions,
  sticky = true,
  transparent = false,
  className = '',
}) => {
  const classes = [
    'navbar',
    sticky ? 'navbar-sticky' : '',
    transparent ? 'navbar-transparent' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <nav className={classes} role="navigation">
      {logo && <div className="navbar-logo">{logo}</div>}
      <div className="navbar-content">{children}</div>
      {actions && <div className="navbar-actions">{actions}</div>}
    </nav>
  );
};
