/**
 * Adaptive Menu Component
 * 
 * Uses MUI Menu for all providers.
 */

import React from 'react';
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
  return <MUIMenu {...props} />;
};

Menu.displayName = 'AdapterMenu';
