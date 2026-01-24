/**
 * Footer Component
 * Page footer with content
 */

import React from 'react';
import './Footer.css';

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export const Footer: React.FC<FooterProps> = ({
  children,
  className = '',
  ...props
}) => {
  const classes = ['footer', className].filter(Boolean).join(' ');

  return (
    <footer className={classes} {...props}>
      <div className="footer-container">{children}</div>
    </footer>
  );
};
