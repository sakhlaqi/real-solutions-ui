/**
 * Adapter GridItem Component
 * 
 * Dynamically switches between internal, MUI, and Radix implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { GridItem as InternalGridItem, GridItemProps } from '../layout';

/**
 * Adaptive GridItem Component
 * 
 * @example
 * ```tsx
 * <Grid columns={12}>
 *   <GridItem colSpan={6}>Column 1</GridItem>
 *   <GridItem colSpan={6}>Column 2</GridItem>
 * </Grid>
 * ```
 */
export const GridItem: React.FC<GridItemProps> = (props) => {
  // GridItem always uses internal implementation
  return <InternalGridItem {...props} />;
};

GridItem.displayName = 'AdapterGridItem';
