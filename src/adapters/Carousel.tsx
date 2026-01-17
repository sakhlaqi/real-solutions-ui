/**
 * Adapter Carousel Component
 * 
 * Dynamically switches between internal, MUI, Radix, and Shadcn implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { useUIContext } from '../core/context';
import { Carousel as InternalCarousel, CarouselProps } from '../media';
import { Carousel as ShadcnCarousel } from '../providers/shadcn';

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
  const { provider } = useUIContext();
  
  if (provider === 'shadcn') {
    return <ShadcnCarousel {...props} />;
  }
  
  // Carousel uses internal implementation for other providers
  return <InternalCarousel {...props} />;
};

Carousel.displayName = 'AdapterCarousel';
