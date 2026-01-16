/**
 * Radix UI Backdrop Wrapper
 * Simple backdrop/overlay implementation
 */

import React from 'react';
import type { BackdropProps } from '../../core/types';

export const Backdrop: React.FC<BackdropProps> = ({
  open,
  onClick,
  invisible = false,
  className,
  children,
}) => {
  if (!open) return null;

  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: invisible ? 'transparent' : 'rgba(0, 0, 0, 0.5)',
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </div>
  );
};

export default Backdrop;
