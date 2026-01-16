import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Toast.css';

export interface ToastProps {
  message: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
  onClose: () => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  icon?: React.ReactNode;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  variant = 'info',
  duration = 5000,
  onClose,
  position = 'top-right',
  icon,
}) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const classes = [
    'toast',
    `toast-${variant}`,
    `toast-${position}`,
  ].join(' ');

  const defaultIcons = {
    info: 'ℹ️',
    success: '✓',
    warning: '⚠️',
    error: '✕',
  };

  const toastElement = (
    <div className={classes}>
      <div className="toast-icon">
        {icon || defaultIcons[variant]}
      </div>
      <div className="toast-message">{message}</div>
      <button
        type="button"
        className="toast-close"
        onClick={onClose}
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );

  return ReactDOM.createPortal(toastElement, document.body);
};

// Toast Manager Hook
export const useToast = () => {
  const [toasts, setToasts] = React.useState<Array<{ id: string; props: Omit<ToastProps, 'onClose'> }>>([]);

  const show = React.useCallback((props: Omit<ToastProps, 'onClose'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, props }]);
    return id;
  }, []);

  const hide = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const ToastContainer = React.useMemo(
    () => () => (
      <>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast.props}
            onClose={() => hide(toast.id)}
          />
        ))}
      </>
    ),
    [toasts, hide]
  );

  return { show, hide, ToastContainer };
};
