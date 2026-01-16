/**
 * MUI Menu Wrapper Component
 */

import React from 'react';
import { Menu as MUIMenu, MenuItem as MUIMenuItem, Divider } from '@mui/material';

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
 * MUI Menu wrapper component
 */
export const Menu: React.FC<MenuProps> = ({
  anchorEl,
  open,
  onClose,
  items,
  onItemClick,
}) => {
  const handleItemClick = (value: string) => {
    onItemClick(value);
    onClose();
  };

  return (
    <MUIMenu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      {items.flatMap((item, index) => {
        const menuItem = (
          <MUIMenuItem
            key={item.value}
            onClick={() => handleItemClick(item.value)}
            disabled={item.disabled}
          >
            {item.icon && <span style={{ marginRight: '8px', display: 'flex', alignItems: 'center' }}>{item.icon}</span>}
            {item.label}
          </MUIMenuItem>
        );
        
        // Add divider before the item if needed (except for the first item)
        if (item.divider && index > 0) {
          return [<Divider key={`divider-${item.value}`} />, menuItem];
        }
        
        return [menuItem];
      })}
    </MUIMenu>
  );
};

Menu.displayName = 'MUIMenu';
