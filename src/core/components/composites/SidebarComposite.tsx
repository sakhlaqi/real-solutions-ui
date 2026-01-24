import React, { useState } from 'react';
import { SidebarCompositeProps, NavigationItem } from './types';
import { useUIContext } from '../../context';
import { Button, List, Badge, Box } from '../../../index';

/**
 * Sidebar Composite
 * 
 * A navigation sidebar with collapsible sections and nested menu items.
 * Supports icons, badges, and active state highlighting.
 * 
 * @example
 * ```tsx
 * <SidebarComposite
 *   items={[
 *     {
 *       id: 'dashboard',
 *       label: 'Dashboard',
 *       icon: <DashboardIcon />,
 *       path: '/dashboard',
 *       active: true
 *     },
 *     {
 *       id: 'hr',
 *       label: 'HR',
 *       icon: <PeopleIcon />,
 *       children: [
 *         { id: 'employees', label: 'Employees', path: '/hr/employees' },
 *         { id: 'departments', label: 'Departments', path: '/hr/departments' }
 *       ]
 *     }
 *   ]}
 *   collapsible={true}
 *   onNavigate={(item) => navigate(item.path)}
 * />
 * ```
 */
export const SidebarComposite: React.FC<SidebarCompositeProps> = ({
  items,
  header,
  footer,
  collapsible = true,
  collapsed: controlledCollapsed,
  onCollapse,
  onNavigate,
  className = '',
  testId = 'sidebar-composite',
}) => {
  const { theme } = useUIContext();
  const tokens = theme.tokens;

  // Internal collapse state (used if not controlled)
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const collapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;

  // Track expanded parent items
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const handleCollapseToggle = () => {
    const newCollapsed = !collapsed;
    if (onCollapse) {
      onCollapse(newCollapsed);
    } else {
      setInternalCollapsed(newCollapsed);
    }
  };

  const handleItemClick = (item: NavigationItem) => {
    if (item.disabled) return;

    // If item has children, toggle expansion
    if (item.children && item.children.length > 0) {
      setExpandedItems((prev) => {
        const next = new Set(prev);
        if (next.has(item.id)) {
          next.delete(item.id);
        } else {
          next.add(item.id);
        }
        return next;
      });
    } else {
      // Navigate
      if (item.onClick) {
        item.onClick();
      } else if (onNavigate) {
        onNavigate(item);
      }
    }
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: collapsed ? '64px' : '280px',
    backgroundColor: tokens.colors.background.paper,
    borderRight: `1px solid ${tokens.colors.divider}`,
    transition: 'width 0.3s ease',
    overflow: 'hidden',
  };

  const headerStyle: React.CSSProperties = {
    padding: tokens.spacing.md,
    borderBottom: `1px solid ${tokens.colors.divider}`,
    flexShrink: 0,
  };

  const navStyle: React.CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: `${tokens.spacing.sm} 0`,
  };

  const footerStyle: React.CSSProperties = {
    padding: tokens.spacing.md,
    borderTop: `1px solid ${tokens.colors.divider}`,
    flexShrink: 0,
  };

  const getItemStyle = (item: NavigationItem, level: number = 0): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacing.md,
    padding: collapsed
      ? `${tokens.spacing.md} ${tokens.spacing.md}`
      : `${tokens.spacing.md} ${tokens.spacing.md} ${tokens.spacing.md} ${
          tokens.spacing.md + level * 16
        }px`,
    cursor: item.disabled ? 'not-allowed' : 'pointer',
    backgroundColor: item.active ? tokens.colors.primary.light : 'transparent',
    color: item.active ? tokens.colors.primary.main : tokens.colors.text.primary,
    opacity: item.disabled ? 0.5 : 1,
    transition: 'all 0.2s ease',
    borderLeft: item.active ? `3px solid ${tokens.colors.primary.main}` : '3px solid transparent',
    fontSize: tokens.typography.fontSize.md,
    fontWeight: item.active ? 600 : 400,
    whiteSpace: 'nowrap',
  });

  const iconStyle: React.CSSProperties = {
    flexShrink: 0,
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const labelStyle: React.CSSProperties = {
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    opacity: collapsed ? 0 : 1,
    transition: 'opacity 0.2s ease',
  };

  const renderNavigationItem = (item: NavigationItem, level: number = 0): React.ReactNode => {
    const isExpanded = expandedItems.has(item.id);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.id} data-testid={`${testId}-item-${item.id}`}>
        <div
          style={getItemStyle(item, level)}
          onClick={() => handleItemClick(item)}
          role="button"
          tabIndex={item.disabled ? -1 : 0}
          aria-disabled={item.disabled}
          aria-expanded={hasChildren ? isExpanded : undefined}
        >
          {/* Icon */}
          {item.icon && <div style={iconStyle}>{item.icon}</div>}

          {/* Label */}
          {!collapsed && <span style={labelStyle}>{item.label}</span>}

          {/* Badge */}
          {!collapsed && item.badge && (
            <Badge
              content={item.badge.toString()}
              color="primary"
              testId={`${testId}-badge-${item.id}`}
            />
          )}

          {/* Expand/Collapse Indicator */}
          {!collapsed && hasChildren && (
            <span style={{ fontSize: tokens.typography.fontSize.sm }}>
              {isExpanded ? '▼' : '▶'}
            </span>
          )}
        </div>

        {/* Children */}
        {!collapsed && hasChildren && isExpanded && (
          <div>
            {item.children!.map((child) => renderNavigationItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside style={containerStyle} className={className} data-testid={testId}>
      {/* Header */}
      {header && (
        <div style={headerStyle} data-testid={`${testId}-header`}>
          {header}
        </div>
      )}

      {/* Navigation */}
      <nav style={navStyle} data-testid={`${testId}-nav`}>
        {items.map((item) => renderNavigationItem(item))}
      </nav>

      {/* Footer */}
      {footer && (
        <div style={footerStyle} data-testid={`${testId}-footer`}>
          {footer}
        </div>
      )}

      {/* Collapse Toggle */}
      {collapsible && (
        <div style={{ padding: tokens.spacing.sm, borderTop: `1px solid ${tokens.colors.divider}` }}>
          <Button
            onClick={handleCollapseToggle}
            variant="text"
            style={{
              width: '100%',
              justifyContent: 'center',
            }}
            testId={`${testId}-collapse-toggle`}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? '▶' : '◀'}
          </Button>
        </div>
      )}
    </aside>
  );
};

SidebarComposite.displayName = 'SidebarComposite';
