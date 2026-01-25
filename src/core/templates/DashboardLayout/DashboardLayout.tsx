import React from 'react';
import { DashboardLayoutProps } from './types';
import { useUIContext } from '../../context';

/**
 * Dashboard Layout Template
 * 
 * A flexible dashboard layout with header, sidebar, main content, and footer slots.
 * Provides a standard application layout structure without prescribing specific components.
 * 
 * @example
 * ```tsx
 * <DashboardLayout
 *   slots={{
 *     header: <HeaderComposite title="Dashboard" />,
 *     sidebar: <NavigationSidebar />,
 *     main: <DashboardContent />,
 *     footer: <Footer />
 *   }}
 *   sidebarVisible={true}
 *   sidebarWidth={280}
 * />
 * ```
 */
export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  slots,
  sidebarVisible = true,
  sidebarWidth = 280,
  className = '',
  style,
  testId = 'dashboard-layout',
}) => {
  const { tokens } = useUIContext();

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: tokens.colors.background,
    color: tokens.colors.textPrimary,
    ...style,
  };

  const headerStyle: React.CSSProperties = {
    flexShrink: 0,
    backgroundColor: tokens.colors.surface,
    borderBottom: `1px solid ${tokens.colors.border}`,
    zIndex: 1000,
  };

  const bodyStyle: React.CSSProperties = {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  };

  const sidebarStyle: React.CSSProperties = {
    width: sidebarVisible ? `${sidebarWidth}px` : 0,
    flexShrink: 0,
    backgroundColor: tokens.colors.surface,
    borderRight: sidebarVisible ? `1px solid ${tokens.colors.border}` : 'none',
    overflow: 'auto',
    transition: 'width 0.3s ease',
  };

  const mainStyle: React.CSSProperties = {
    flex: 1,
    overflow: 'auto',
    padding: tokens.spacing.lg,
  };

  const footerStyle: React.CSSProperties = {
    flexShrink: 0,
    backgroundColor: tokens.colors.surface,
    borderTop: `1px solid ${tokens.colors.border}`,
    padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
  };

  return (
    <div style={containerStyle} className={className} data-testid={testId}>
      {slots.header && (
        <header style={headerStyle} data-testid={`${testId}-header`}>
          {slots.header}
        </header>
      )}
      
      <div style={bodyStyle} data-testid={`${testId}-body`}>
        {slots.sidebar && sidebarVisible && (
          <aside style={sidebarStyle} data-testid={`${testId}-sidebar`}>
            {slots.sidebar}
          </aside>
        )}
        
        <main style={mainStyle} data-testid={`${testId}-main`}>
          {slots.main}
        </main>
      </div>
      
      {slots.footer && (
        <footer style={footerStyle} data-testid={`${testId}-footer`}>
          {slots.footer}
        </footer>
      )}
    </div>
  );
};

DashboardLayout.displayName = 'DashboardLayout';
