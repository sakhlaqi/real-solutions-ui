/**
 * Adapter ImageList Component
 * 
 * Dynamically switches between internal, MUI, and Radix implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { ImageList as InternalImageList, ImageListProps } from '../layout';

/**
 * Adaptive ImageList Component
 * 
 * @example
 * ```tsx
 * <ImageList cols={3} gap={8}>
 *   {images.map(img => (
 *     <img key={img.id} src={img.src} alt={img.alt} />
 *   ))}
 * </ImageList>
 * ```
 */
export const ImageList: React.FC<ImageListProps> = (props) => {
  // ImageList always uses internal implementation
  return <InternalImageList {...props} />;
};

ImageList.displayName = 'AdapterImageList';
