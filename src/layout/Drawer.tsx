import React, { useEffect } from 'react';
import './Drawer.css';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position?: 'left' | 'right' | 'top' | 'bottom';
  size?: 'sm' | 'md' | 'lg' | 'full';
  showOverlay?: boolean;
  closeOnOverlayClick?: boolean;
  className?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  position = 'right',
  size = 'md',
  showOverlay = true,
  closeOnOverlayClick = true,
  className = '',
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = () => {
    if (closeOnOverlayClick) {
      onClose();
    }
  };

  const drawerClasses = [
    'drawer',
    `drawer-${position}`,
    `drawer-${size}`,
    isOpen ? 'drawer-open' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      {showOverlay && (
        <div
          className="drawer-overlay"
          onClick={handleOverlayClick}
          aria-hidden="true"
        />
      )}
      <div
        className={drawerClasses}
        role="dialog"
        aria-modal="true"
      >
        <button
          className="drawer-close-btn"
          onClick={onClose}
          aria-label="Close drawer"
        >
          ×
        </button>
        <div className="drawer-content">{children}</div>
      </div>
    </>
  );
};
