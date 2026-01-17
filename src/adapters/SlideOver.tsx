/**
 * Adapter SlideOver Component
 * 
 * Dynamically switches between internal, MUI, and Radix implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { SlideOver as InternalSlideOver, SlideOverProps } from '../overlay';

/**
 * Adaptive SlideOver Component
 * 
 * @example
 * ```tsx
 * <SlideOver
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   position="right"
 * >
 *   <div>Content</div>
 * </SlideOver>
 * ```
 */
export const SlideOver: React.FC<SlideOverProps> = (props) => {
  // SlideOver always uses internal implementation
  return <InternalSlideOver {...props} />;
};

SlideOver.displayName = 'AdapterSlideOver';
