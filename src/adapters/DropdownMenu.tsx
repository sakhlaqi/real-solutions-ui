/**
 * Adapter DropdownMenu Component
 * 
 * Uses internal DropdownMenu implementation.
 */

import React from 'react';
import { DropdownMenu as InternalDropdownMenu, DropdownMenuProps } from '../core/components/navigation';

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
  return <InternalDropdownMenu {...props} />;
};

DropdownMenu.displayName = 'AdapterDropdownMenu';
