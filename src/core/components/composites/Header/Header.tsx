import React from 'react';
import { HeaderCompositeProps } from './types';
import { useUIContext } from '../../../context';
import { Button, Breadcrumbs, Typography, Stack, Box } from '../../../../index';

/**
 * Header Composite
 * 
 * A page header component with title, breadcrumbs, and action buttons.
 * Provides consistent header styling and layout across pages.
 * 
 * @example
 * ```tsx
 * <HeaderComposite
 *   title="Employee Management"
 *   subtitle="Manage your team members"
 *   breadcrumbs={[
 *     { label: 'Home', path: '/' },
 *     { label: 'HR', path: '/hr' },
 *     { label: 'Employees' }
 *   ]}
 *   actions={[
 *     { id: 'add', label: 'Add Employee', onClick: handleAdd, variant: 'contained' },
 *     { id: 'export', label: 'Export', onClick: handleExport }
 *   ]}
 * />
 * ```
 */
export const HeaderComposite: React.FC<HeaderCompositeProps> = ({
  title,
  subtitle,
  breadcrumbs,
  actions = [],
  showBackButton = false,
  onBack,
  children,
  className = '',
  testId = 'header-composite',
}) => {
  const { theme } = useUIContext();
  const tokens = theme.tokens;

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing.md,
    padding: tokens.spacing.lg,
    backgroundColor: tokens.colors.background.paper,
    borderBottom: `1px solid ${tokens.colors.divider}`,
  };

  const topRowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: tokens.spacing.md,
  };

  const titleSectionStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacing.xs,
    flex: 1,
  };

  const titleRowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacing.md,
  };

  const actionsStyle: React.CSSProperties = {
    display: 'flex',
    gap: tokens.spacing.sm,
    alignItems: 'center',
  };

  const backButtonStyle: React.CSSProperties = {
    padding: tokens.spacing.sm,
    minWidth: 'auto',
    fontSize: tokens.typography.fontSize.lg,
  };

  return (
    <header style={containerStyle} className={className} data-testid={testId}>
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs
          items={breadcrumbs.map((item) => ({
            label: item.label,
            href: item.path,
            onClick: item.onClick,
          }))}
          testId={`${testId}-breadcrumbs`}
        />
      )}

      {/* Title and Actions Row */}
      <div style={topRowStyle}>
        <div style={titleSectionStyle}>
          <div style={titleRowStyle}>
            {/* Back Button */}
            {showBackButton && (
              <Button
                onClick={onBack}
                variant="text"
                style={backButtonStyle}
                testId={`${testId}-back-button`}
                aria-label="Go back"
              >
                ←
              </Button>
            )}

            {/* Title */}
            <Typography
              variant="h4"
              style={{
                margin: 0,
                color: tokens.colors.text.primary,
                fontWeight: 600,
              }}
              testId={`${testId}-title`}
            >
              {title}
            </Typography>
          </div>

          {/* Subtitle */}
          {subtitle && (
            <Typography
              variant="body1"
              style={{
                margin: 0,
                color: tokens.colors.text.secondary,
              }}
              testId={`${testId}-subtitle`}
            >
              {subtitle}
            </Typography>
          )}
        </div>

        {/* Actions and Custom Content */}
        <div style={actionsStyle}>
          {/* Action Buttons */}
          {actions.map((action) => (
            <Button
              key={action.id}
              onClick={action.onClick}
              disabled={action.disabled}
              variant={action.variant || 'outlined'}
              testId={`${testId}-action-${action.id}`}
            >
              {action.icon}
              {action.label}
            </Button>
          ))}

          {/* Custom Content */}
          {children}
        </div>
      </div>
    </header>
  );
};

HeaderComposite.displayName = 'HeaderComposite';
