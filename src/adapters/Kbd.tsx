/**
 * Adaptive Kbd Component
 * 
 * Automatically switches between provider implementations based on UIProvider.
 */

import React, { ReactNode } from 'react';

export interface KbdProps {
  children: ReactNode;
  className?: string;
}

/**
 * Adaptive Kbd Component
 * 
 * @example
 * ```tsx
 * <Kbd>Ctrl</Kbd>
 * ```
 */
export const Kbd: React.FC<KbdProps> = ({ children, className = '' }) => {
  return (
    <kbd 
      className={`inline-flex items-center justify-center rounded border border-gray-300 bg-gray-100 px-2 py-1 text-sm font-mono text-gray-700 shadow-sm ${className}`}
    >
      {children}
    </kbd>
  );
};

Kbd.displayName = 'AdapterKbd';
