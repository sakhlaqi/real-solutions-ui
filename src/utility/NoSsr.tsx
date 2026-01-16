import React, { useState, useEffect } from 'react';

export interface NoSsrProps {
  children: React.ReactNode;
  defer?: boolean;
  fallback?: React.ReactNode;
}

export const NoSsr: React.FC<NoSsrProps> = ({ children, defer = false, fallback = null }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!defer) {
      setIsMounted(true);
    } else {
      // Defer until after hydration
      const timer = setTimeout(() => {
        setIsMounted(true);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [defer]);

  return isMounted ? <>{children}</> : <>{fallback}</>;
};
