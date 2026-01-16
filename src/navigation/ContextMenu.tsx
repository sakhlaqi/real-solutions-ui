import React, { useState, useEffect, useRef } from 'react';
import { Portal } from '../utility/Portal';
import './ContextMenu.css';

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

export const ContextMenu: React.FC<ContextMenuProps> = ({
  items,
  children,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen]);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    
    const x = e.clientX;
    const y = e.clientY;
    
    setPosition({ x, y });
    setIsOpen(true);
  };

  const handleItemClick = (item: ContextMenuItem) => {
    if (item.disabled) return;
    
    item.onClick?.();
    setIsOpen(false);
  };

  return (
    <>
      <div
        ref={triggerRef}
        className={`context-menu-trigger ${className}`}
        onContextMenu={handleContextMenu}
      >
        {children}
      </div>

      {isOpen && (
        <Portal>
          <div
            ref={menuRef}
            className="context-menu"
            style={{
              position: 'fixed',
              top: `${position.y}px`,
              left: `${position.x}px`,
            }}
            role="menu"
          >
            {items.map((item) => (
              <React.Fragment key={item.id}>
                {item.divider ? (
                  <div className="context-menu-divider" role="separator" />
                ) : (
                  <button
                    className={`context-menu-item ${item.disabled ? 'disabled' : ''} ${
                      item.danger ? 'danger' : ''
                    }`}
                    onClick={() => handleItemClick(item)}
                    disabled={item.disabled}
                    role="menuitem"
                    type="button"
                  >
                    <span className="context-menu-item-content">
                      {item.icon && (
                        <span className="context-menu-item-icon">{item.icon}</span>
                      )}
                      <span className="context-menu-item-label">{item.label}</span>
                    </span>
                    {item.shortcut && (
                      <span className="context-menu-item-shortcut">{item.shortcut}</span>
                    )}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>
        </Portal>
      )}
    </>
  );
};
