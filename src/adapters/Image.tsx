/**
 * Adapter Image Component
 * 
 * Dynamically switches between internal, MUI, and Radix implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { Image as InternalImage, ImageProps } from '../media';

/**
 * Adaptive Image Component
 * 
 * @example
 * ```tsx
 * <Image
 *   src="/path/to/image.jpg"
 *   alt="Description"
 *   loading="lazy"
 * />
 * ```
 */
export const Image: React.FC<ImageProps> = (props) => {
  // Image always uses internal implementation for consistent behavior
  return <InternalImage {...props} />;
};

Image.displayName = 'AdapterImage';
