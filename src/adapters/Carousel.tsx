/**
 * Adapter Carousel Component
 * 
 * Dynamically switches between internal and MUI implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { Carousel as InternalCarousel, CarouselProps } from '../media';

/**
 * Adaptive Carousel Component
 * 
 * @example
 * ```tsx
 * <Carousel
 *   items={images}
 *   autoPlay
 *   interval={3000}
 * />
 * ```
 */
export const Carousel: React.FC<CarouselProps> = (props) => {
  // Carousel uses internal implementation for all providers
  return <InternalCarousel {...props} />;
};

Carousel.displayName = 'AdapterCarousel';
