/**
 * Adapter EmptyState Component
 * 
 * Dynamically switches between internal, MUI, and Radix implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { EmptyState as InternalEmptyState, EmptyStateProps } from '../feedback';

/**
 * Adaptive EmptyState Component
 * 
 * @example
 * ```tsx
 * <EmptyState
 *   title="No results found"
 *   description="Try adjusting your search"
 *   icon={<SearchIcon />}
 * />
 * ```
 */
export const EmptyState: React.FC<EmptyStateProps> = (props) => {
  // EmptyState always uses internal implementation
  return <InternalEmptyState {...props} />;
};

EmptyState.displayName = 'AdapterEmptyState';
