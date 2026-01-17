/**
 * Adapter Container Component
 * 
 * Dynamically switches between internal, MUI, and Radix implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { Container as InternalContainer, ContainerProps } from '../layout';

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
  // Container always uses internal implementation
  return <InternalContainer {...props} />;
};

Container.displayName = 'AdapterContainer';
