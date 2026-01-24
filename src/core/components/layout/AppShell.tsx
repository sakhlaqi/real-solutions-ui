import React from 'react';
import './AppShell.css';

export interface AppShellProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  sidebar?: React.ReactNode;
  navbar?: React.ReactNode;
  className?: string;
}

export const AppShell: React.FC<AppShellProps> = ({
  children,
  header,
  footer,
  sidebar,
  navbar,
  className = '',
}) => {
  return (
    <div className={`app-shell ${className}`}>
      {header && <div className="app-shell-header">{header}</div>}
      {navbar && <div className="app-shell-navbar">{navbar}</div>}
      <div className="app-shell-body">
        {sidebar && <div className="app-shell-sidebar">{sidebar}</div>}
        <main className="app-shell-main">{children}</main>
      </div>
      {footer && <div className="app-shell-footer">{footer}</div>}
    </div>
  );
};
