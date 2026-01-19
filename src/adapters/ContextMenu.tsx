/**
 * Adapter ContextMenu Component
 * 
 * Uses MUI Menu implementation.
 * Internal implementation is deprecated.
 */

import React, { useState } from 'react';
import { Menu as MUIMenu } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
  divider?: boolean;
  onClick?: () => void;
  shortcut?: string;
}

export interface ContextMenuProps {
  items: ContextMenuItem[];
  children: React.ReactNode;
  className?: string;
}

/**
 * Adaptive ContextMenu Component
 * 
 * @example
 * ```tsx
 * <ContextMenu
 *   items={[
 *     { id: '1', label: 'Copy', onClick: handleCopy },
 *     { id: '2', label: 'Paste', onClick: handlePaste }
 *   ]}
 * >
 *   <div>Right-click me</div>
 * </ContextMenu>
 * ```
 */
export const ContextMenu: React.FC<ContextMenuProps> = ({
  items,
  children,
  className,
}) => {
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
          }
        : null
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  const handleItemClick = (item: ContextMenuItem) => {
    if (item.disabled) return;
    item.onClick?.();
    handleClose();
  };

  return (
    <>
      <div onContextMenu={handleContextMenu} className={className}>
        {children}
      </div>
      <MUIMenu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        {items.map((item) =>
          item.divider ? (
            <Divider key={item.id} />
          ) : (
            <MenuItem
              key={item.id}
              onClick={() => handleItemClick(item)}
              disabled={item.disabled}
              sx={{
                color: item.danger ? 'error.main' : undefined,
              }}
            >
              {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
              <ListItemText>{item.label}</ListItemText>
              {item.shortcut && (
                <span style={{ marginLeft: 16, fontSize: 12, opacity: 0.7 }}>
                  {item.shortcut}
                </span>
              )}
            </MenuItem>
          )
        )}
      </MUIMenu>
    </>
  );
};

ContextMenu.displayName = 'AdapterContextMenu';
