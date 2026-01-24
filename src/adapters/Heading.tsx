/**
 * Adapter Heading Component
 * 
 * Dynamically switches between internal, MUI, and Radix implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { Heading as InternalHeading, HeadingProps } from '../core/components/typography';

/**
 * Adaptive Heading Component
 * 
 * @example
 * ```tsx
 * <Heading level={1}>Main Title</Heading>
 * <Heading level={2} color="primary">Subtitle</Heading>
 * ```
 */
export const Heading: React.FC<HeadingProps> = (props) => {
  // Heading always uses internal implementation
  return <InternalHeading {...props} />;
};

Heading.displayName = 'AdapterHeading';
