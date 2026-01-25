/**
 * useTokens Hook
 * 
 * Provides access to resolved design tokens from context.
 * Tokens can be provided externally (from tenant theme) or use defaults.
 * 
 * The UI library is agnostic to where tokens come from - it simply consumes them.
 */

import { useContext } from 'react';
import { UIContext } from './UIProvider';
import type { DesignTokens as TokensType } from '../../theme/theme.types';

/**
 * Hook to access design tokens
 * 
 * Returns the current design tokens from context.
 * Falls back to default tokens if none provided.
 * 
 * @returns {TokensType} Design tokens
 * 
 * @example
 * ```tsx
 * const tokens = useTokens();
 * 
 * <div style={{
 *   backgroundColor: tokens.colors.background,
 *   color: tokens.colors.textPrimary,
 *   padding: tokens.spacing.lg,
 * }}>
 *   Content
 * </div>
 * ```
 */
export const useTokens = (): TokensType => {
  const context = useContext(UIContext);
  
  if (!context) {
    throw new Error('useTokens must be used within a UIProvider');
  }

  return context.tokens;
};

export default useTokens;
