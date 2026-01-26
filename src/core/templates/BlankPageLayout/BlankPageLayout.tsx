import React from 'react';
import { BlankPageLayoutProps } from './types';
import { useUIContext } from '../../context';

/**
 * Blank Page Layout Template
 * 
 * A minimal layout providing maximum flexibility.
 * Perfect for custom designs that don't fit standard layouts.
 * 
 * Features:
 * - Single content slot
 * - Optional theme application
 * - Optional full-height container
 * - Optional max-width constraint
 * - Optional padding
 * - Complete creative control
 * 
 * Use cases:
 * - Custom landing pages
 * - 404/Error pages
 * - Coming soon pages
 * - Maintenance pages
 * - Login/Auth pages
 * - Full-screen experiences
 * - Creative portfolios
 * 
 * @example
 * ```tsx
 * // Minimal - no constraints
 * <BlankPageLayout
 *   slots={{ content: <CustomContent /> }}
 *   applyTheme={false}
 * />
 * 
 * // Themed with constraints
 * <BlankPageLayout
 *   slots={{ content: <LoginForm /> }}
 *   applyTheme={true}
 *   fullHeight={true}
 *   maxWidth={500}
 *   padding={24}
 * />
 * ```
 */
export const BlankPageLayout: React.FC<BlankPageLayoutProps> = ({
  slots,
  applyTheme = true,
  fullHeight = true,
  maxWidth = 'full',
  padding = 'none',
  className = '',
  style,
  testId = 'blank-page-layout',
}) => {
  const { tokens } = useUIContext();

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: fullHeight ? '100vh' : 'auto',
    width: '100%',
    backgroundColor: applyTheme ? tokens.colors.background : undefined,
    color: applyTheme ? tokens.colors.textPrimary : undefined,
    ...style,
  };

  const contentStyle: React.CSSProperties = {
    flex: 1,
    width: '100%',
    maxWidth: maxWidth === 'full' ? '100%' : `${maxWidth}px`,
    margin: maxWidth === 'full' ? 0 : '0 auto',
    padding: padding === 'none' ? 0 : `${padding}px`,
  };

  return (
    <div style={containerStyle} className={className} data-testid={testId}>
      <div style={contentStyle} data-testid={`${testId}-content`}>
        {slots.content}
      </div>
    </div>
  );
};

BlankPageLayout.displayName = 'BlankPageLayout';
