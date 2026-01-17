/**
 * Adapter ContextMenu Component
 * 
 * Dynamically switches between internal, MUI, Radix, and Shadcn implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { useUIContext } from '../core/context';
import { ContextMenu as InternalContextMenu, ContextMenuProps } from '../navigation';
import { ContextMenu as ShadcnContextMenu } from '../providers/shadcn';

/**
 * Adaptive ContextMenu Component
 * 
 * @example
 * ```tsx
 * <ContextMenu
 *   items={[
 *     { label: 'Copy', onClick: handleCopy },
 *     { label: 'Paste', onClick: handlePaste }
 *   ]}
 * >
 *   <div>Right-click me</div>
 * </ContextMenu>
 * ```
 */
export const ContextMenu: React.FC<ContextMenuProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'shadcn') {
    return <ShadcnContextMenu {...props} />;
  }
  
  // ContextMenu uses internal implementation for other providers
  return <InternalContextMenu {...props} />;
};

ContextMenu.displayName = 'AdapterContextMenu';
