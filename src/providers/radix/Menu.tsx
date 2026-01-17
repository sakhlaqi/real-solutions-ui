/**
 * Radix UI Menu Wrapper
 * Adapts Radix UI DropdownMenu to match internal Menu API
 */

import React from 'react';
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import type { MenuProps } from '../../core/types';

export const Menu: React.FC<MenuProps> = ({
  open,
  onClose,
  anchorEl: _anchorEl,
  items,
  className,
}) => {
  return (
    <RadixDropdownMenu.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose?.()}>
      <RadixDropdownMenu.Trigger>
        <button>Menu</button>
      </RadixDropdownMenu.Trigger>
      <RadixDropdownMenu.Portal>
        <RadixDropdownMenu.Content
          className={className}
          style={{
            backgroundColor: 'var(--color-background)',
            border: '1px solid var(--gray-7)',
            borderRadius: '6px',
            padding: '4px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            minWidth: '200px',
            zIndex: 1000,
          }}
        >
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {item.divider ? (
                <RadixDropdownMenu.Separator
                  style={{
                    height: '1px',
                    backgroundColor: 'var(--gray-6)',
                    margin: '4px 0',
                  }}
                />
              ) : (
                <RadixDropdownMenu.Item
                  disabled={item.disabled}
                  onClick={item.onClick}
                  style={{
                    padding: '8px 12px',
                    fontSize: '0.875rem',
                    cursor: item.disabled ? 'not-allowed' : 'pointer',
                    borderRadius: '4px',
                    outline: 'none',
                    opacity: item.disabled ? 0.5 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  {item.icon && <span>{item.icon}</span>}
                  {item.label}
                </RadixDropdownMenu.Item>
              )}
            </React.Fragment>
          ))}
        </RadixDropdownMenu.Content>
      </RadixDropdownMenu.Portal>
    </RadixDropdownMenu.Root>
  );
};

export default Menu;
