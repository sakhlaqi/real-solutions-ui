import React, { useState } from 'react';
import { Portal } from '../utility/Portal';
import './SpeedDial.css';

export interface SpeedDialAction {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export interface SpeedDialProps {
  icon: React.ReactNode;
  actions: SpeedDialAction[];
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  direction?: 'up' | 'down' | 'left' | 'right';
  openOnHover?: boolean;
  ariaLabel?: string;
  className?: string;
}

export const SpeedDial: React.FC<SpeedDialProps> = ({
  icon,
  actions,
  position = 'bottom-right',
  direction = 'up',
  openOnHover = false,
  ariaLabel = 'Speed dial',
  className = '',
}) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    if (!openOnHover) {
      setOpen(!open);
    }
  };

  const handleMouseEnter = () => {
    if (openOnHover) {
      setOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (openOnHover) {
      setOpen(false);
    }
  };

  const handleActionClick = (action: SpeedDialAction) => {
    if (!action.disabled) {
      action.onClick();
      setOpen(false);
    }
  };

  return (
    <Portal>
      <div
        className={`speed-dial position-${position} direction-${direction} ${
          open ? 'open' : ''
        } ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {open && (
          <div className="speed-dial-actions">
            {actions.map((action, index) => (
              <div
                key={index}
                className={`speed-dial-action ${action.disabled ? 'disabled' : ''}`}
                style={{ transitionDelay: `${index * 30}ms` }}
              >
                <span className="speed-dial-action-label">{action.label}</span>
                <button
                  type="button"
                  className="speed-dial-action-button"
                  onClick={() => handleActionClick(action)}
                  disabled={action.disabled}
                  aria-label={action.label}
                >
                  {action.icon}
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          type="button"
          className={`speed-dial-fab ${open ? 'open' : ''}`}
          onClick={handleToggle}
          aria-label={ariaLabel}
          aria-expanded={open}
        >
          <span className={`speed-dial-icon ${open ? 'open' : ''}`}>{icon}</span>
        </button>
      </div>
    </Portal>
  );
};
