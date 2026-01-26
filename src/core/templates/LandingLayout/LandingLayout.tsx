import React from 'react';
import { LandingLayoutProps } from './types';
import { useUIContext } from '../../context';

/**
 * Landing Layout Template
 * 
 * A conversion-optimized layout for landing pages.
 * 
 * Features:
 * - No sidebar distractions
 * - Transparent header option for hero overlap
 * - Full-width section support
 * - Minimal footer
 * - Smooth scrolling
 * - Optimized for conversions
 * 
 * Perfect for:
 * - Product launches
 * - Campaign landing pages
 * - Lead generation pages
 * - Event registrations
 * - Download pages
 * 
 * @example
 * ```tsx
 * <LandingLayout
 *   slots={{
 *     header: <MinimalNav />,
 *     main: (
 *       <>
 *         <HeroSection />
 *         <BenefitsSection />
 *         <SocialProofSection />
 *         <PricingSection />
 *         <CTASection />
 *       </>
 *     ),
 *     footer: <MinimalFooter />
 *   }}
 *   transparentHeader={true}
 *   smoothScroll={true}
 *   maxWidth={1200}
 * />
 * ```
 */
export const LandingLayout: React.FC<LandingLayoutProps> = ({
  slots,
  stickyHeader = true,
  transparentHeader = false,
  maxWidth = 1200,
  smoothScroll = true,
  className = '',
  style,
  testId = 'landing-layout',
}) => {
  const { tokens } = useUIContext();

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: tokens.colors.background,
    color: tokens.colors.textPrimary,
    scrollBehavior: smoothScroll ? 'smooth' : 'auto',
    ...style,
  };

  const headerStyle: React.CSSProperties = {
    position: stickyHeader || transparentHeader ? 'sticky' : 'relative',
    top: 0,
    zIndex: 1000,
    flexShrink: 0,
    backgroundColor: transparentHeader 
      ? 'transparent' 
      : tokens.colors.surface,
    borderBottom: transparentHeader 
      ? 'none' 
      : `1px solid ${tokens.colors.border}`,
    boxShadow: stickyHeader && !transparentHeader ? tokens.shadows.sm : 'none',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
  };

  const mainStyle: React.CSSProperties = {
    flex: 1,
    width: '100%',
    maxWidth: maxWidth === 'full' ? '100%' : `${maxWidth}px`,
    margin: maxWidth === 'full' ? 0 : '0 auto',
  };

  const footerStyle: React.CSSProperties = {
    flexShrink: 0,
    backgroundColor: tokens.colors.surface,
    borderTop: `1px solid ${tokens.colors.border}`,
  };

  return (
    <div style={containerStyle} className={className} data-testid={testId}>
      {slots.header && (
        <header style={headerStyle} data-testid={`${testId}-header`}>
          {slots.header}
        </header>
      )}
      
      <main style={mainStyle} data-testid={`${testId}-main`}>
        {slots.main}
      </main>
      
      {slots.footer && (
        <footer style={footerStyle} data-testid={`${testId}-footer`}>
          {slots.footer}
        </footer>
      )}
    </div>
  );
};

LandingLayout.displayName = 'LandingLayout';
