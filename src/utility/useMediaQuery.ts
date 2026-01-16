import { useState, useEffect } from 'react';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const breakpoints: Record<Breakpoint, number> = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
};

export function useMediaQuery(query: string): boolean;
export function useMediaQuery(breakpoint: Breakpoint, direction?: 'up' | 'down'): boolean;
export function useMediaQuery(
  queryOrBreakpoint: string | Breakpoint,
  direction: 'up' | 'down' = 'up'
): boolean {
  const getQuery = (): string => {
    if (typeof queryOrBreakpoint === 'string' && queryOrBreakpoint.includes('(')) {
      return queryOrBreakpoint;
    }

    const breakpoint = queryOrBreakpoint as Breakpoint;
    const px = breakpoints[breakpoint];
    
    if (direction === 'up') {
      return `(min-width: ${px}px)`;
    } else {
      return `(max-width: ${px - 1}px)`;
    }
  };

  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(getQuery()).matches;
  });

  useEffect(() => {
    const query = getQuery();
    const mediaQueryList = window.matchMedia(query);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Modern browsers
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', handleChange);
    } else {
      // Legacy browsers
      mediaQueryList.addListener(handleChange);
    }

    // Update initial value
    setMatches(mediaQueryList.matches);

    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener('change', handleChange);
      } else {
        mediaQueryList.removeListener(handleChange);
      }
    };
  }, [queryOrBreakpoint, direction]);

  return matches;
}
