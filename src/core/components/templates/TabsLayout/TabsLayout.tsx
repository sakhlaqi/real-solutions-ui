import React from 'react';
import { TabsLayoutProps } from './types';
import { useUIContext } from '../../../context';

/**
 * Tabs Layout Template
 * 
 * A layout with tabbed navigation and content panels.
 * Manages tab switching internally while accepting tab content as slots.
 * 
 * @example
 * ```tsx
 * <TabsLayout
 *   slots={{
 *     header: <PageTitle />,
 *     tabs: {
 *       overview: <OverviewPanel />,
 *       details: <DetailsPanel />,
 *       history: <HistoryPanel />
 *     },
 *     footer: <ActionButtons />
 *   }}
 *   activeTab="overview"
 *   onTabChange={(key) => console.log('Tab changed to:', key)}
 *   tabLabels={{
 *     overview: 'Overview',
 *     details: 'Details',
 *     history: 'History'
 *   }}
 * />
 * ```
 */
export const TabsLayout: React.FC<TabsLayoutProps> = ({
  slots,
  activeTab,
  onTabChange,
  tabLabels,
  className = '',
  style,
  testId = 'tabs-layout',
}) => {
  const { theme } = useUIContext();
  const tokens = theme.tokens;

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: tokens.colors.background.default,
    color: tokens.colors.text.primary,
    ...style,
  };

  const headerStyle: React.CSSProperties = {
    flexShrink: 0,
    backgroundColor: tokens.colors.background.paper,
    borderBottom: `1px solid ${tokens.colors.divider}`,
  };

  const tabsContainerStyle: React.CSSProperties = {
    display: 'flex',
    gap: tokens.spacing.xs,
    padding: `0 ${tokens.spacing.lg}`,
    backgroundColor: tokens.colors.background.paper,
    borderBottom: `1px solid ${tokens.colors.divider}`,
  };

  const getTabStyle = (tabKey: string): React.CSSProperties => ({
    padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: tabKey === activeTab ? `2px solid ${tokens.colors.primary.main}` : '2px solid transparent',
    color: tabKey === activeTab ? tokens.colors.primary.main : tokens.colors.text.secondary,
    fontWeight: tabKey === activeTab ? 600 : 400,
    fontSize: tokens.typography.fontSize.md,
    transition: 'all 0.2s ease',
    fontFamily: tokens.typography.fontFamily,
  });

  const contentStyle: React.CSSProperties = {
    flex: 1,
    overflow: 'auto',
    padding: tokens.spacing.lg,
  };

  const footerStyle: React.CSSProperties = {
    flexShrink: 0,
    backgroundColor: tokens.colors.background.paper,
    borderTop: `1px solid ${tokens.colors.divider}`,
    padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
  };

  const tabKeys = Object.keys(slots.tabs);

  return (
    <div style={containerStyle} className={className} data-testid={testId}>
      {slots.header && (
        <header style={headerStyle} data-testid={`${testId}-header`}>
          {slots.header}
        </header>
      )}
      
      <div style={tabsContainerStyle} role="tablist" data-testid={`${testId}-tabs`}>
        {tabKeys.map((tabKey) => (
          <button
            key={tabKey}
            role="tab"
            aria-selected={tabKey === activeTab}
            aria-controls={`${testId}-panel-${tabKey}`}
            id={`${testId}-tab-${tabKey}`}
            style={getTabStyle(tabKey)}
            onClick={() => onTabChange(tabKey)}
            data-testid={`${testId}-tab-${tabKey}`}
          >
            {tabLabels[tabKey] || tabKey}
          </button>
        ))}
      </div>
      
      <div
        style={contentStyle}
        role="tabpanel"
        id={`${testId}-panel-${activeTab}`}
        aria-labelledby={`${testId}-tab-${activeTab}`}
        data-testid={`${testId}-panel`}
      >
        {slots.tabs[activeTab]}
      </div>
      
      {slots.footer && (
        <footer style={footerStyle} data-testid={`${testId}-footer`}>
          {slots.footer}
        </footer>
      )}
    </div>
  );
};

TabsLayout.displayName = 'TabsLayout';
