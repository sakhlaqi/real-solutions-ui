/**
 * UI Provider Context
 * 
 * Manages the UI implementation provider (internal vs MUI) and theme configuration.
 * Consumers use this context to switch between different UI implementations.
 */

import React, { createContext, useContext, useMemo, useState } from 'react';
import { UIProvider as UIProviderType, ThemeConfig } from '../types';

interface UIContextValue {
  provider: UIProviderType;
  setProvider: (provider: UIProviderType) => void;
  theme: ThemeConfig;
  setTheme: (theme: ThemeConfig) => void;
  toggleThemeMode: () => void;
}

const UIContext = createContext<UIContextValue | undefined>(undefined);

export interface UIProviderProps {
  children: React.ReactNode;
  defaultProvider?: UIProviderType;
  defaultTheme?: ThemeConfig;
}

const defaultThemeConfig: ThemeConfig = {
  mode: 'light',
  primaryColor: '#1976d2',
  secondaryColor: '#dc004e',
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  borderRadius: 8,
  spacing: 8,
};

/**
 * UIProvider Component
 * 
 * Wraps the application to provide UI implementation and theme configuration.
 * 
 * @example
 * ```tsx
 * <UIProvider defaultProvider="internal" defaultTheme={{ mode: 'dark' }}>
 *   <App />
 * </UIProvider>
 * ```
 */
export const UIProvider: React.FC<UIProviderProps> = ({
  children,
  defaultProvider = 'internal',
  defaultTheme = defaultThemeConfig,
}) => {
  const [provider, setProvider] = useState<UIProviderType>(defaultProvider);
  const [theme, setTheme] = useState<ThemeConfig>({
    ...defaultThemeConfig,
    ...defaultTheme,
  });

  const toggleThemeMode = () => {
    setTheme((prev) => ({
      ...prev,
      mode: prev.mode === 'light' ? 'dark' : 'light',
    }));
  };

  const value = useMemo(
    () => ({
      provider,
      setProvider,
      theme,
      setTheme,
      toggleThemeMode,
    }),
    [provider, theme]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

/**
 * useUIContext Hook
 * 
 * Access the UI provider and theme configuration.
 * 
 * @example
 * ```tsx
 * const { provider, setProvider, theme, toggleThemeMode } = useUIContext();
 * 
 * // Switch to MUI provider
 * setProvider('mui');
 * 
 * // Toggle dark mode
 * toggleThemeMode();
 * ```
 */
export const useUIContext = (): UIContextValue => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUIContext must be used within a UIProvider');
  }
  return context;
};

/**
 * withUIProvider HOC
 * 
 * Higher-order component to wrap components with UIProvider.
 */
export const withUIProvider = <P extends object>(
  Component: React.ComponentType<P>,
  providerProps?: Omit<UIProviderProps, 'children'>
) => {
  return (props: P) => (
    <UIProvider {...providerProps}>
      <Component {...props} />
    </UIProvider>
  );
};
