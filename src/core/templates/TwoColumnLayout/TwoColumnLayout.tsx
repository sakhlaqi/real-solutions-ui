import React from 'react';
import { TwoColumnLayoutProps } from './types';
import { useUIContext } from '../../context';

/**
 * Two Column Layout Template
 * 
 * A responsive two-column layout with optional header and footer.
 * Ideal for master-detail views, form layouts, or content with sidebar.
 * 
 * @example
 * ```tsx
 * <TwoColumnLayout
 *   slots={{
 *     header: <PageHeader />,
 *     left: <ItemList />,
 *     right: <ItemDetails />,
 *     footer: <ActionBar />
 *   }}
 *   leftWidth={0.4}
 *   gap={16}
 * />
 * ```
 */
export const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({
  slots,
  leftWidth = 0.5,
  gap = 16,
  className = '',
  style,
  testId = 'two-column-layout',
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
  };

  const columnsContainerStyle: React.CSSProperties = {
    display: 'flex',
    flex: 1,
    gap: `${gap}px`,
    padding: tokens.spacing.lg,
    overflow: 'hidden',
  };

  const leftColumnStyle: React.CSSProperties = {
    flex: `0 0 ${leftWidth * 100}%`,
    overflow: 'auto',
    backgroundColor: tokens.colors.surface,
    borderRadius: tokens.radius.md,
    padding: tokens.spacing.md,
    boxShadow: tokens.shadows.sm,
  };

  const rightColumnStyle: React.CSSProperties = {
    flex: 1,
    overflow: 'auto',
    backgroundColor: tokens.colors.surface,
    borderRadius: tokens.radius.md,
    padding: tokens.spacing.md,
    boxShadow: tokens.shadows.sm,
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
      
      <div style={columnsContainerStyle} data-testid={`${testId}-columns`}>
        <div style={leftColumnStyle} data-testid={`${testId}-left`}>
          {slots.left}
        </div>
        
        <div style={rightColumnStyle} data-testid={`${testId}-right`}>
          {slots.right}
        </div>
      </div>
      
      {slots.footer && (
        <footer style={footerStyle} data-testid={`${testId}-footer`}>
          {slots.footer}
        </footer>
      )}
    </div>
  );
};

TwoColumnLayout.displayName = 'TwoColumnLayout';
