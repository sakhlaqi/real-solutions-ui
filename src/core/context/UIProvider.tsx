/**
 * UI Provider Context
 * 
 * Manages the UI implementation provider (internal or MUI) and design tokens.
 * Consumers use this context to access design tokens and switch between UI implementations.
 * 
 * The provider is agnostic to where tokens come from - they can be provided externally
 * (e.g., from a tenant theme system) or use built-in defaults.
 */

import React, { createContext, useMemo, useState, useEffect } from 'react';
import { UIProvider as UIProviderType, ThemeConfig } from '../types';
import type { DesignTokens } from '../../theme/theme.types';
import { getDefaultTokens } from './defaultTokens';

export interface UIContextValue {
  provider: UIProviderType;
  setProvider: (provider: UIProviderType) => void;
  theme: ThemeConfig;
  setTheme: (theme: ThemeConfig) => void;
  toggleThemeMode: () => void;
  tokens: DesignTokens;
  setTokens: (tokens: DesignTokens) => void;
}

export const UIContext = createContext<UIContextValue | undefined>(undefined);

export interface UIProviderProps {
  children: React.ReactNode;
  defaultProvider?: UIProviderType;
  defaultTheme?: ThemeConfig;
  /**
   * External design tokens (e.g., from tenant theme system)
   * If not provided, will use default tokens based on theme mode
   */
  tokens?: DesignTokens;
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
 * Wraps the application to provide UI implementation and design tokens.
 * 
 * @example
 * ```tsx
 * // Using default tokens
 * <UIProvider defaultProvider="mui" defaultTheme={{ mode: 'dark' }}>
 *   <App />
 * </UIProvider>
 * 
 * // Using external tokens (e.g., from tenant theme)
 * <UIProvider tokens={resolvedTheme.tokens}>
 *   <App />
 * </UIProvider>
 * ```
 */
export const UIProvider: React.FC<UIProviderProps> = ({
  children,
  defaultProvider = 'mui',
  defaultTheme = defaultThemeConfig,
  tokens: externalTokens,
}) => {
  const [provider, setProvider] = useState<UIProviderType>(defaultProvider);
  const [theme, setTheme] = useState<ThemeConfig>({
    ...defaultThemeConfig,
    ...defaultTheme,
  });
  const [tokens, setTokens] = useState<DesignTokens>(
    externalTokens || getDefaultTokens(defaultTheme.mode || 'light')
  );

  // Update provider when defaultProvider prop changes (for Storybook)
  useEffect(() => {
    setProvider(defaultProvider);
  }, [defaultProvider]);

  // Update theme when defaultTheme prop changes (for Storybook)
  useEffect(() => {
    setTheme((prev) => ({
      ...prev,
      ...defaultTheme,
    }));
  }, [defaultTheme]);

  // Update tokens when external tokens change
  useEffect(() => {
    if (externalTokens) {
      setTokens(externalTokens);
    } else {
      // Use default tokens based on theme mode
      setTokens(getDefaultTokens(theme.mode));
    }
  }, [externalTokens, theme.mode]);

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
      tokens,
      setTokens,
    }),
    [provider, theme, tokens]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

/**
 * useUIContext Hook
 * 
 * Access the UI provider, theme configuration, and design tokens.
 * 
 * @example
 * ```tsx
 * const { provider, setProvider, theme, toggleThemeMode, tokens } = useUIContext();
 * 
 * // Switch to MUI provider
 * setProvider('mui');
 * 
 * // Toggle dark mode
 * toggleThemeMode();
 * 
 * // Access tokens
 * const primaryColor = tokens.colors.primary;
 * ```
 */
export const useUIContext = (): UIContextValue => {
  const context = React.useContext(UIContext);
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
