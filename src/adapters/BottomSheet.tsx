/**
 * Adapter BottomSheet Component
 * 
 * Uses MUI Drawer implementation.
 * Internal implementation is deprecated.
 */

import React from 'react';
import { Drawer } from '../providers/mui';

export interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  snapPoints?: number[];
  defaultSnap?: number;
  showHandle?: boolean;
  closeOnBackdrop?: boolean;
  className?: string;
}

/**
 * Adaptive BottomSheet Component
 * 
 * @example
 * ```tsx
 * <BottomSheet
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   snapPoints={[50, 100]}
 * >
 *   <div>Content</div>
 * </BottomSheet>
 * ```
 */
export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  children,
  snapPoints = [50, 100],
  showHandle = true,
  className,
  ...rest
}) => {
  const height = snapPoints[0];

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      anchor="bottom"
      width="100%"
    >
      <div style={{ height: `${height}vh`, padding: 16 }}>
        {showHandle && (
          <div
            style={{
              width: 40,
              height: 4,
              backgroundColor: '#ddd',
              borderRadius: 2,
              margin: '8px auto 16px',
            }}
          />
        )}
        {title && (
          <div style={{ marginBottom: 16, fontSize: 20, fontWeight: 600 }}>
            {title}
          </div>
        )}
        <div style={{ overflow: 'auto', height: 'calc(100% - 60px)' }}>{children}</div>
      </div>
    </Drawer>
  );
};

BottomSheet.displayName = 'AdapterBottomSheet';
