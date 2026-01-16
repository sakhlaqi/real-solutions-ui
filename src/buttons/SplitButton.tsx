import React, { useState, useRef, useEffect } from 'react';
import { Portal } from '../utility/Portal';
import './SplitButton.css';

export interface SplitButtonAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
}

export interface SplitButtonProps {
  label: string;
  actions: SplitButtonAction[];
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onMainClick?: () => void;
  className?: string;
}

export const SplitButton: React.FC<SplitButtonProps> = ({
  label,
  actions,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onMainClick,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const updatePosition = () => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    setPosition({
      top: rect.bottom + window.scrollY + 4,
      left: rect.left + window.scrollX,
    });
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
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !buttonRef.current.contains(e.target as Node)
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

  const handleMainClick = () => {
    if (!disabled) {
      onMainClick?.();
    }
  };

  const handleDropdownClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleActionClick = (action: SplitButtonAction) => {
    if (!action.disabled) {
      action.onClick();
      setIsOpen(false);
    }
  };

  return (
    <>
      <div ref={buttonRef} className={`split-button ${variant} ${size} ${disabled ? 'disabled' : ''} ${className}`}>
        <button
          className="split-button-main"
          onClick={handleMainClick}
          disabled={disabled}
          type="button"
        >
          {label}
        </button>
        <button
          className="split-button-dropdown"
          onClick={handleDropdownClick}
          disabled={disabled}
          aria-label="More actions"
          aria-expanded={isOpen}
          type="button"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 4L6 8L10 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <Portal>
          <div
            ref={menuRef}
            className="split-button-menu"
            style={{
              position: 'absolute',
              top: `${position.top}px`,
              left: `${position.left}px`,
            }}
          >
            {actions.map(action => (
              <button
                key={action.id}
                className={`split-button-menu-item ${action.disabled ? 'disabled' : ''}`}
                onClick={() => handleActionClick(action)}
                disabled={action.disabled}
                type="button"
              >
                {action.icon && <span className="split-button-menu-icon">{action.icon}</span>}
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        </Portal>
      )}
    </>
  );
};
