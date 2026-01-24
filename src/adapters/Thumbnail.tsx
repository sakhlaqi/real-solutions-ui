/**
 * Adapter Thumbnail Component
 * 
 * Dynamically switches between internal, MUI, and Radix implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { Thumbnail as InternalThumbnail, ThumbnailProps } from '../core/components/media';

/**
 * Adaptive Thumbnail Component
 * 
 * @example
 * ```tsx
 * <Thumbnail
 *   src="/path/to/image.jpg"
 *   alt="Thumbnail"
 *   size="small"
 * />
 * ```
 */
export const Thumbnail: React.FC<ThumbnailProps> = (props) => {
  // Thumbnail always uses internal implementation
  return <InternalThumbnail {...props} />;
};

Thumbnail.displayName = 'AdapterThumbnail';
