/**
 * Adaptive Separator Component
 * 
 * Simple separator implementation.
 */

import React from 'react';

export interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
  className?: string;
}

/**
 * Adaptive Separator Component
 * 
 * @example
 * ```tsx
 * <Separator />
 * <Separator orientation="vertical" />
 * ```
 */
export const Separator: React.FC<SeparatorProps> = () => {
  return (
    <div style={{ height: '1px', width: '100%', backgroundColor: '#ccc', margin: '8px 0' }} />
  );
};

Separator.displayName = 'AdapterSeparator';
