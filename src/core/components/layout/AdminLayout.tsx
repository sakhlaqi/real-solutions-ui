/**
 * Admin Layout Component
 * Layout for admin pages with sidebar navigation
 */

import React from 'react';
import './AdminLayout.css';

export interface AdminLayoutProps {
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  sidebar,
  header,
  children,
}) => {
  return (
    <div className="admin-layout">
      {sidebar && <aside className="admin-sidebar">{sidebar}</aside>}
      <div className="admin-main">
        {header && <div className="admin-header">{header}</div>}
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
};
