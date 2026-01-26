import React from 'react';
import { MarketingLayoutProps } from './types';
import { useUIContext } from '../../context';

/**
 * Marketing Layout Template
 * 
 * A flexible marketing website layout optimized for:
 * - Landing pages
 * - Product pages
 * - Marketing campaigns
 * - Content marketing sites
 * 
 * Features:
 * - Full-width sections support
 * - Sticky header navigation
 * - Optional sidebar (left/right positioned)
 * - Prominent footer area
 * - Responsive design
 * 
 * @example
 * ```tsx
 * <MarketingLayout
 *   slots={{
 *     header: <NavBar />,
 *     main: (
 *       <>
 *         <HeroSection />
 *         <FeaturesSection />
 *         <TestimonialsSection />
 *       </>
 *     ),
 *     sidebar: <TableOfContents />,
 *     footer: <MarketingFooter />
 *   }}
 *   stickyHeader={true}
 *   sidebarPosition="right"
 *   maxWidth={1280}
 * />
 * ```
 */
export const MarketingLayout: React.FC<MarketingLayoutProps> = ({
  slots,
  sidebarVisible = false,
  sidebarPosition = 'right',
  sidebarWidth = 280,
  stickyHeader = true,
  stickySidebar = false,
  maxWidth = 'full',
  className = '',
  style,
  testId = 'marketing-layout',
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
    position: stickyHeader ? 'sticky' : 'relative',
    top: 0,
    zIndex: 1000,
    flexShrink: 0,
    backgroundColor: tokens.colors.surface,
    borderBottom: `1px solid ${tokens.colors.border}`,
    boxShadow: stickyHeader ? tokens.shadows.md : 'none',
  };

  const bodyContainerStyle: React.CSSProperties = {
    display: 'flex',
    flex: 1,
    flexDirection: sidebarPosition === 'left' ? 'row' : 'row-reverse',
  };

  const contentWrapperStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0, // Allows flex item to shrink below content size
  };

  const mainStyle: React.CSSProperties = {
    flex: 1,
    width: '100%',
    maxWidth: maxWidth === 'full' ? '100%' : `${maxWidth}px`,
    margin: maxWidth === 'full' ? 0 : '0 auto',
  };

  const sidebarStyle: React.CSSProperties = {
    width: sidebarVisible ? `${sidebarWidth}px` : 0,
    flexShrink: 0,
    backgroundColor: tokens.colors.surface,
    borderLeft: sidebarVisible && sidebarPosition === 'right' 
      ? `1px solid ${tokens.colors.border}` 
      : 'none',
    borderRight: sidebarVisible && sidebarPosition === 'left' 
      ? `1px solid ${tokens.colors.border}` 
      : 'none',
    overflow: sidebarVisible ? 'auto' : 'hidden',
    transition: 'width 0.3s ease',
    position: stickySidebar ? 'sticky' : 'relative',
    top: stickySidebar ? '80px' : 'auto', // Account for header height
    alignSelf: 'flex-start',
    maxHeight: stickySidebar ? 'calc(100vh - 80px)' : 'none',
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
      
      <div style={bodyContainerStyle} data-testid={`${testId}-body`}>
        <div style={contentWrapperStyle}>
          <main style={mainStyle} data-testid={`${testId}-main`}>
            {slots.main}
          </main>
        </div>
        
        {slots.sidebar && sidebarVisible && (
          <aside style={sidebarStyle} data-testid={`${testId}-sidebar`}>
            {slots.sidebar}
          </aside>
        )}
      </div>
      
      {slots.footer && (
        <footer style={footerStyle} data-testid={`${testId}-footer`}>
          {slots.footer}
        </footer>
      )}
    </div>
  );
};

MarketingLayout.displayName = 'MarketingLayout';
