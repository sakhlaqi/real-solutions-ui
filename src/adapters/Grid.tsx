/**
 * Adapter Grid Component
 * 
 * Dynamically switches between internal, MUI, and Radix implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { Grid as InternalGrid, GridProps } from '../layout';

/**
 * Adaptive Grid Component
 * 
 * @example
 * ```tsx
 * <Grid columns={12} gap={16}>
 *   <GridItem span={6}>Column 1</GridItem>
 *   <GridItem span={6}>Column 2</GridItem>
 * </Grid>
 * ```
 */
export const Grid: React.FC<GridProps> = (props) => {
  // Grid always uses internal implementation for consistent layout behavior
  return <InternalGrid {...props} />;
};

Grid.displayName = 'AdapterGrid';
