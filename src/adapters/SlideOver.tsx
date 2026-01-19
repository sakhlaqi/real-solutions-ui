/**
 * Adapter SlideOver Component
 * 
 * Uses MUI Drawer implementation.
 * Internal implementation is deprecated.
 */

import React from 'react';
import { Drawer } from '../providers/mui';

export interface SlideOverProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  position?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  className?: string;
}

const sizeMap = {
  sm: 300,
  md: 400,
  lg: 600,
  xl: 800,
};

/**
 * Adaptive SlideOver Component
 * 
 * @example
 * ```tsx
 * <SlideOver
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   position="right"
 * >
 *   <div>Content</div>
 * </SlideOver>
 * ```
 */
export const SlideOver: React.FC<SlideOverProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  position = 'right',
  size = 'md',
  closeOnBackdrop = true,
  className,
  ...rest
}) => {
  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      anchor={position}
      width={sizeMap[size]}
    >
      {title && (
        <div style={{ marginBottom: 16, fontSize: 20, fontWeight: 600 }}>
          {title}
        </div>
      )}
      <div style={{ flex: 1, overflow: 'auto' }}>{children}</div>
      {footer && <div style={{ marginTop: 16 }}>{footer}</div>}
    </Drawer>
  );
};

SlideOver.displayName = 'AdapterSlideOver';
