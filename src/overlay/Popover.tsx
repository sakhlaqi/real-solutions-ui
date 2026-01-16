import React, { useRef, useEffect, useState } from 'react';
import { Portal } from '../utility/Portal';
import './Popover.css';

export interface PopoverProps {
  open: boolean;
  onClose: () => void;
  anchorEl?: HTMLElement | null;
  children: React.ReactNode;
  anchorOrigin?: {
    vertical: 'top' | 'center' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
  transformOrigin?: {
    vertical: 'top' | 'center' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
  closeOnBackdrop?: boolean;
  className?: string;
}

export const Popover: React.FC<PopoverProps> = ({
  open,
  onClose,
  anchorEl,
  children,
  anchorOrigin = { vertical: 'bottom', horizontal: 'left' },
  transformOrigin = { vertical: 'top', horizontal: 'left' },
  closeOnBackdrop = true,
  className = '',
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!open || !anchorEl || !popoverRef.current) return;

    const updatePosition = () => {
      const anchorRect = anchorEl.getBoundingClientRect();
      const popoverRect = popoverRef.current!.getBoundingClientRect();

      let top = 0;
      let left = 0;

      // Calculate anchor position
      switch (anchorOrigin.vertical) {
        case 'top':
          top = anchorRect.top;
          break;
        case 'center':
          top = anchorRect.top + anchorRect.height / 2;
          break;
        case 'bottom':
          top = anchorRect.bottom;
          break;
      }

      switch (anchorOrigin.horizontal) {
        case 'left':
          left = anchorRect.left;
          break;
        case 'center':
          left = anchorRect.left + anchorRect.width / 2;
          break;
        case 'right':
          left = anchorRect.right;
          break;
      }

      // Apply transform origin offset
      switch (transformOrigin.vertical) {
        case 'center':
          top -= popoverRect.height / 2;
          break;
        case 'bottom':
          top -= popoverRect.height;
          break;
      }

      switch (transformOrigin.horizontal) {
        case 'center':
          left -= popoverRect.width / 2;
          break;
        case 'right':
          left -= popoverRect.width;
          break;
      }

      // Keep within viewport
      const maxTop = window.innerHeight - popoverRect.height - 8;
      const maxLeft = window.innerWidth - popoverRect.width - 8;
      top = Math.max(8, Math.min(top, maxTop));
      left = Math.max(8, Math.min(left, maxLeft));

      setPosition({ top, left });
    };

    updatePosition();
    window.addEventListener('scroll', updatePosition);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [open, anchorEl, anchorOrigin, transformOrigin]);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        closeOnBackdrop &&
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        anchorEl &&
        !anchorEl.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, onClose, closeOnBackdrop, anchorEl]);

  if (!open) return null;

  return (
    <Portal>
      <div
        ref={popoverRef}
        className={`popover ${className}`}
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
        role="dialog"
      >
        {children}
      </div>
    </Portal>
  );
};
