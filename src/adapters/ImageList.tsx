/**
 * Adapter ImageList Component
 * 
 * Uses MUI ImageList implementation.
 * Internal implementation is deprecated.
 */

import React from 'react';
import { ImageList as MUIImageList, MUIImageListProps } from '../providers/mui';

export type ImageListProps = MUIImageListProps;

/**
 * Adaptive ImageList Component
 * 
 * @example
 * ```tsx
 * <ImageList cols={3} gap={8} items={[
 *   { src: 'image1.jpg', alt: 'Image 1' },
 *   { src: 'image2.jpg', alt: 'Image 2' },
 * ]} />
 * ```
 */
export const ImageList: React.FC<ImageListProps> = (props) => {
  return <MUIImageList {...props} />;
};

ImageList.displayName = 'AdapterImageList';
