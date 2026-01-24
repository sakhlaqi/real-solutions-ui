import React, { createContext, useContext } from 'react';
import type { RenderContext as RenderContextType } from './types';

/**
 * Render Context
 * 
 * Provides rendering context throughout the component tree
 */

/**
 * Default render context
 */
const defaultRenderContext: RenderContextType = {
  depth: 0,
  maxDepth: 50,
  provider: 'mui', // Default to MUI provider
  tenantId: 'tenant-1',
  theme: {
    mode: 'light',
  },
  featureFlags: {
    darkMode: false,
    advancedSearch: true,
    betaFeatures: false,
    exportData: true,
    notifications: true,
  },
};

/**
 * React Context for Render Context
 */
const RenderContext = createContext<RenderContextType>(defaultRenderContext);

/**
 * Render Context Provider Props
 */
interface RenderContextProviderProps {
  children: React.ReactNode;
  value: RenderContextType;
}

/**
 * Render Context Provider
 */
export function RenderContextProvider({ children, value }: RenderContextProviderProps) {
  return (
    <RenderContext.Provider value={value}>
      {children}
    </RenderContext.Provider>
  );
}

/**
 * Use Render Context Hook
 */
export function useRenderContext(): RenderContextType {
  return useContext(RenderContext);
}

/**
 * Use Render Depth Hook
 */
export function useRenderDepth(): number {
  const context = useRenderContext();
  return context.depth;
}

/**
 * Use UI Provider Hook
 */
export function useUIProvider(): string {
  const context = useRenderContext();
  return context.provider || 'mui';
}

/**
 * Create Child Context
 * Creates a new context for child components
 */
export function createChildContext(
  parent: RenderContextType,
  componentKey?: string
): RenderContextType {
  return {
    ...parent,
    depth: parent.depth + 1,
    parent: componentKey,
  };
}

/**
 * Check if max depth exceeded
 */
export function isMaxDepthExceeded(context: RenderContextType): boolean {
  const maxDepth = context.maxDepth || 50;
  return context.depth >= maxDepth;
}
