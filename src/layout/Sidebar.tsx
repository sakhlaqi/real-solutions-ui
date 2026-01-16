import React from 'react';
import './Sidebar.css';

export interface SidebarProps {
  children: React.ReactNode;
  position?: 'left' | 'right';
  width?: string | number;
  collapsible?: boolean;
  collapsed?: boolean;
  onToggle?: () => void;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  children,
  position = 'left',
  width = '280px',
  collapsible = false,
  collapsed = false,
  onToggle,
  className = '',
}) => {
  const style: React.CSSProperties = {
    width: collapsed ? '60px' : width,
  };

  const classes = [
    'sidebar',
    `sidebar-${position}`,
    collapsed ? 'sidebar-collapsed' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <aside className={classes} style={style}>
      {collapsible && (
        <button
          className="sidebar-toggle"
          onClick={onToggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? '→' : '←'}
        </button>
      )}
      <div className="sidebar-content">{children}</div>
    </aside>
  );
};
