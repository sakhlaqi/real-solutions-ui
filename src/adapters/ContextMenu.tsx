/**
 * Adapter ContextMenu Component
 * 
 * Dynamically switches between internal, MUI, and Radix implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { ContextMenu as InternalContextMenu, ContextMenuProps } from '../navigation';

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
  // ContextMenu always uses internal implementation
  return <InternalContextMenu {...props} />;
};

ContextMenu.displayName = 'AdapterContextMenu';
