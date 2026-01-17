/**
 * Adapter Section Component
 * 
 * Dynamically switches between internal, MUI, and Radix implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { Section as InternalSection, SectionProps } from '../layout';

/**
 * Adaptive Section Component
 * 
 * @example
 * ```tsx
 * <Section padding="lg">
 *   <h2>Section Title</h2>
 *   <p>Content</p>
 * </Section>
 * ```
 */
export const Section: React.FC<SectionProps> = (props) => {
  // Section always uses internal implementation
  return <InternalSection {...props} />;
};

Section.displayName = 'AdapterSection';
