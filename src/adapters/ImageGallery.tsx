/**
 * Adapter ImageGallery Component
 * 
 * Dynamically switches between internal, MUI, and Radix implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { ImageGallery as InternalImageGallery, ImageGalleryProps } from '../media';

/**
 * Adaptive ImageGallery Component
 * 
 * @example
 * ```tsx
 * <ImageGallery
 *   images={images}
 *   columns={3}
 *   onImageClick={handleImageClick}
 * />
 * ```
 */
export const ImageGallery: React.FC<ImageGalleryProps> = (props) => {
  // ImageGallery always uses internal implementation
  return <InternalImageGallery {...props} />;
};

ImageGallery.displayName = 'AdapterImageGallery';
