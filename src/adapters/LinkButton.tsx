/**
 * Adapter LinkButton Component
 * 
 * Dynamically switches between internal, MUI, and Radix implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { LinkButton as InternalLinkButton, LinkButtonProps } from '../core/components/buttons';

/**
 * Adaptive LinkButton Component
 * 
 * @example
 * ```tsx
 * <LinkButton href="/home" variant="primary">
 *   Go Home
 * </LinkButton>
 * ```
 */
export const LinkButton: React.FC<LinkButtonProps> = (props) => {
  // LinkButton always uses internal implementation for consistency
  // across navigation patterns
  return <InternalLinkButton {...props} />;
};

LinkButton.displayName = 'AdapterLinkButton';
