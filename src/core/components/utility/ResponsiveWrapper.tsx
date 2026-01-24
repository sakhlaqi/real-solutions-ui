import React from 'react';

export interface ResponsiveWrapperProps {
  children: React.ReactNode;
  mobile?: React.ReactNode;
  tablet?: React.ReactNode;
  desktop?: React.ReactNode;
  breakpoint?: 'mobile' | 'tablet' | 'desktop';
}

export const ResponsiveWrapper: React.FC<ResponsiveWrapperProps> = ({
  children,
  mobile,
  tablet,
  desktop,
  breakpoint,
}) => {
  const [currentBreakpoint, setCurrentBreakpoint] = React.useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  React.useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setCurrentBreakpoint('mobile');
      } else if (width < 1024) {
        setCurrentBreakpoint('tablet');
      } else {
        setCurrentBreakpoint('desktop');
      }
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);

    return () => {
      window.removeEventListener('resize', updateBreakpoint);
    };
  }, []);

  if (breakpoint && currentBreakpoint !== breakpoint) {
    return null;
  }

  if (currentBreakpoint === 'mobile' && mobile) {
    return <>{mobile}</>;
  }

  if (currentBreakpoint === 'tablet' && tablet) {
    return <>{tablet}</>;
  }

  if (currentBreakpoint === 'desktop' && desktop) {
    return <>{desktop}</>;
  }

  return <>{children}</>;
};
