/**
 * Adapter DropdownMenu Component
 * 
 * Dynamically switches between internal, MUI, Radix, and Shadcn implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { useUIContext } from '../core/context';
import { DropdownMenu as InternalDropdownMenu, DropdownMenuProps } from '../navigation';
import { DropdownMenu as ShadcnDropdownMenu } from '../providers/shadcn';

/**
 * Adaptive DropdownMenu Component
 * 
 * @example
 * ```tsx
 * <DropdownMenu
 *   trigger={<Button>Options</Button>}
 *   items={[
 *     { label: 'Edit', onClick: handleEdit },
 *     { label: 'Delete', onClick: handleDelete }
 *   ]}
 * />
 * ```
 */
export const DropdownMenu: React.FC<DropdownMenuProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'shadcn') {
    return <ShadcnDropdownMenu {...props as any} />;
  }
  
  // DropdownMenu uses internal implementation for other providers
  return <InternalDropdownMenu {...props} />;
};

DropdownMenu.displayName = 'AdapterDropdownMenu';
