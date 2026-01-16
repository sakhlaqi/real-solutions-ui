/**
 * Adaptive Menu Component
 * 
 * Automatically switches between internal and MUI implementations based on UIProvider.
 */

import React from 'react';
import { useUIContext } from '../core/context';
import { DropdownMenu as InternalMenu } from '../navigation';
import { Menu as MUIMenu } from '../providers/mui';

export interface MenuItem {
  label: string;
  value: string;
  icon?: React.ReactElement;
  disabled?: boolean;
  divider?: boolean;
}

export interface MenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  items: MenuItem[];
  onItemClick: (value: string) => void;
}

/**
 * Adaptive Menu Component
 * 
 * @example
 * ```tsx
 * <Menu
 *   anchorEl={anchorEl}
 *   open={open}
 *   onClose={handleClose}
 *   items={menuItems}
 *   onItemClick={handleItemClick}
 * />
 * ```
 */
export const Menu: React.FC<MenuProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'mui') {
    return <MUIMenu {...props} />;
  }
  
  // Transform for internal DropdownMenu - add id field and handle clicks through items
  const { anchorEl, items, onItemClick, onClose, ...restProps } = props;
  
  const internalItems = items.map(item => ({
    ...item,
    id: item.value,
    onClick: () => {
      onItemClick(item.value);
      onClose();
    },
  }));
  
  return (
    <InternalMenu
      {...restProps}
      items={internalItems}
      trigger={<span />}
    />
  );
};

Menu.displayName = 'AdapterMenu';
