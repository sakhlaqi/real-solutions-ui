/**
 * Adaptive Resizable Component
 * 
 * Automatically switches between provider implementations based on UIProvider.
 */

import React, { ReactNode } from 'react';
import { useUIContext } from '../core/context';
import { ResizablePanelGroup } from '../providers/shadcn';

export interface ResizableProps {
  children: ReactNode;
  direction?: 'horizontal' | 'vertical';
  className?: string;
}

/**
 * Adaptive Resizable Component
 * 
 * @example
 * ```tsx
 * <Resizable direction="horizontal">
 *   <ResizablePanel>Panel 1</ResizablePanel>
 *   <ResizableHandle />
 *   <ResizablePanel>Panel 2</ResizablePanel>
 * </Resizable>
 * ```
 */
export const Resizable: React.FC<ResizableProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'shadcn' || provider === 'radix') {
    return <ResizablePanelGroup {...props} />;
  }
  
  // Fallback to shadcn for other providers
  return <ResizablePanelGroup {...props} />;
};

Resizable.displayName = 'AdapterResizable';
