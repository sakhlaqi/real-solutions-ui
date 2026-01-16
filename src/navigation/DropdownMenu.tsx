import React, { useRef, useEffect, useState } from 'react';
import { Portal } from '../utility/Portal';
import './DropdownMenu.css';

export interface DropdownMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
  divider?: boolean;
  onClick?: () => void;
}

export interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: DropdownMenuItem[];
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  closeOnItemClick?: boolean;
  className?: string;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  trigger,
  items,
  placement = 'bottom-start',
  closeOnItemClick = true,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const updatePosition = () => {
    if (!triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const menuHeight = menuRef.current?.offsetHeight || 0;
    const menuWidth = menuRef.current?.offsetWidth || 0;

    let top = 0;
    let left = 0;

    switch (placement) {
      case 'bottom-start':
        top = rect.bottom + window.scrollY + 4;
        left = rect.left + window.scrollX;
        break;
      case 'bottom-end':
        top = rect.bottom + window.scrollY + 4;
        left = rect.right + window.scrollX - menuWidth;
        break;
      case 'top-start':
        top = rect.top + window.scrollY - menuHeight - 4;
        left = rect.left + window.scrollX;
        break;
      case 'top-end':
        top = rect.top + window.scrollY - menuHeight - 4;
        left = rect.right + window.scrollX - menuWidth;
        break;
    }

    setPosition({ top, left });
  };

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      window.addEventListener('scroll', updatePosition);
      window.addEventListener('resize', updatePosition);

      return () => {
        window.removeEventListener('scroll', updatePosition);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [isOpen, placement]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        triggerRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
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

  const handleTriggerClick = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: DropdownMenuItem) => {
    if (item.disabled) return;

    item.onClick?.();

    if (closeOnItemClick) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <div
        ref={triggerRef}
        className={`dropdown-menu-trigger ${className}`}
        onClick={handleTriggerClick}
      >
        {trigger}
      </div>

      {isOpen && (
        <Portal>
          <div
            ref={menuRef}
            className="dropdown-menu"
            style={{
              position: 'absolute',
              top: `${position.top}px`,
              left: `${position.left}px`,
            }}
            role="menu"
          >
            {items.map((item) => (
              <React.Fragment key={item.id}>
                {item.divider ? (
                  <div className="dropdown-menu-divider" role="separator" />
                ) : (
                  <button
                    className={`dropdown-menu-item ${item.disabled ? 'disabled' : ''} ${item.danger ? 'danger' : ''}`}
                    onClick={() => handleItemClick(item)}
                    disabled={item.disabled}
                    role="menuitem"
                  >
                    {item.icon && <span className="dropdown-menu-item-icon">{item.icon}</span>}
                    <span className="dropdown-menu-item-label">{item.label}</span>
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
