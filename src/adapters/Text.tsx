/**
 * Adapter Text Component
 * 
 * Dynamically switches between internal, MUI, and Radix implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { Text as InternalText, TextProps } from '../core/components/typography';

/**
 * Adaptive Text Component
 * 
 * @example
 * ```tsx
 * <Text size="large">Body text</Text>
 * <Text weight="bold" color="primary">Bold text</Text>
 * ```
 */
export const Text: React.FC<TextProps> = (props) => {
  // Text always uses internal implementation
  return <InternalText {...props} />;
};

Text.displayName = 'AdapterText';
