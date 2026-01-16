import React, { useState } from 'react';
import { Portal } from '../utility/Portal';
import './Snackbar.css';

export interface SnackbarProps {
  open: boolean;
  onClose?: () => void;
  message: React.ReactNode;
  action?: React.ReactNode;
  autoHideDuration?: number | null;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  className?: string;
}

export const Snackbar: React.FC<SnackbarProps> = ({
  open,
  onClose,
  message,
  action,
  autoHideDuration = 6000,
  position = 'bottom-left',
  className = '',
}) => {
  const [isClosing, setIsClosing] = useState(false);

  React.useEffect(() => {
    if (open && autoHideDuration) {
      const timer = setTimeout(() => {
        handleClose();
      }, autoHideDuration);

      return () => clearTimeout(timer);
    }
  }, [open, autoHideDuration]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose?.();
      setIsClosing(false);
    }, 200);
  };

  if (!open && !isClosing) return null;

  return (
    <Portal>
      <div className={`snackbar position-${position} ${isClosing ? 'closing' : ''} ${className}`}>
        <div className="snackbar-content">
          <span className="snackbar-message">{message}</span>
          {action && <div className="snackbar-action">{action}</div>}
          {onClose && !action && (
            <button
              type="button"
              className="snackbar-close"
              onClick={handleClose}
              aria-label="Close"
            >
              ×
            </button>
          )}
        </div>
      </div>
    </Portal>
  );
};
