/**
 * Adaptive Sheet Component
 * 
 * Note: Sheet is now a wrapper around Drawer component.
 * For side panel functionality, use Drawer directly.
 */

import React, { ReactNode } from 'react';
import { Drawer } from './Drawer';

export interface SheetProps {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

/**
 * Adaptive Sheet Component
 * 
 * @example
 * ```tsx
 * <Sheet open={open} onOpenChange={setOpen}>
 *   {children}
 * </Sheet>
 * ```
 */
export const Sheet: React.FC<SheetProps> = ({ open, onOpenChange, children, className }) => {
  return (
    <Drawer
      open={open ?? false}
      onClose={() => onOpenChange?.(false)}
    >
      {children}
    </Drawer>
  );
};

Sheet.displayName = 'AdapterSheet';
