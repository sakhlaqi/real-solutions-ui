/**
 * Main Layout Component
 * Basic page layout with header and footer
 */

import React from 'react';
import './MainLayout.css';

export interface MainLayoutProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  header,
  footer,
  children,
}) => {
  return (
    <div className="main-layout">
      {header}
      <main className="main-layout-content">{children}</main>
      {footer}
    </div>
  );
};
