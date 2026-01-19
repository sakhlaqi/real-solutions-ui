/**
 * Adapter Container Component
 * 
 * Uses MUI Container for all providers.
 * MUI Container centers content horizontally with responsive max-width.
 */

import React from 'react';
import {
  Container as MUIContainer,
  MUIContainerProps as ContainerProps,
} from '../providers/mui';

export type { ContainerProps };

/**
 * Adaptive Container Component
 * 
 * @example
 * ```tsx
 * <Container maxWidth="lg">
 *   Content
 * </Container>
 * ```
 */
export const Container: React.FC<ContainerProps> = (props) => {
  return <MUIContainer {...props} />;
};

Container.displayName = 'AdapterContainer';
