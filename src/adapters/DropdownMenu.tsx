/**
 * Adapter DropdownMenu Component
 * 
 * Dynamically switches between internal, MUI, and Radix implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { DropdownMenu as InternalDropdownMenu, DropdownMenuProps } from '../navigation';

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
  // DropdownMenu always uses internal implementation
  return <InternalDropdownMenu {...props} />;
};

DropdownMenu.displayName = 'AdapterDropdownMenu';
