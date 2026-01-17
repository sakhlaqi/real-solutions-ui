/**
 * Adapter Lightbox Component
 * 
 * Dynamically switches between internal, MUI, and Radix implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { Lightbox as InternalLightbox, LightboxProps } from '../overlay';

/**
 * Adaptive Lightbox Component
 * 
 * @example
 * ```tsx
 * <Lightbox
 *   images={images}
 *   currentIndex={0}
 *   onClose={() => setOpen(false)}
 * />
 * ```
 */
export const Lightbox: React.FC<LightboxProps> = (props) => {
  // Lightbox always uses internal implementation
  return <InternalLightbox {...props} />;
};

Lightbox.displayName = 'AdapterLightbox';
