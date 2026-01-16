import React, { useEffect, useRef } from 'react';
import { Portal } from '../utility/Portal';
import './SlideOver.css';

export interface SlideOverProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  position?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  className?: string;
}

export const SlideOver: React.FC<SlideOverProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  position = 'right',
  size = 'md',
  closeOnBackdrop = true,
  closeOnEscape = true,
  showCloseButton = true,
  className = '',
}) => {
  const slideOverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';

      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = '';
      };
    }
  }, [isOpen, closeOnEscape, onClose]);

  useEffect(() => {
    if (isOpen && slideOverRef.current) {
      const focusableElements = slideOverRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      firstElement?.focus();
    }
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <Portal>
      <div className="slideover-backdrop" onClick={handleBackdropClick}>
        <div
          ref={slideOverRef}
          className={`slideover ${position} ${size} ${className}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'slideover-title' : undefined}
        >
          {(title || showCloseButton) && (
            <div className="slideover-header">
              {title && (
                <h2 id="slideover-title" className="slideover-title">
                  {title}
                </h2>
              )}
              {showCloseButton && (
                <button
                  className="slideover-close"
                  onClick={onClose}
                  aria-label="Close"
                  type="button"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
            </div>
          )}

          <div className="slideover-body">{children}</div>

          {footer && <div className="slideover-footer">{footer}</div>}
        </div>
      </div>
    </Portal>
  );
};
