import React from 'react';
import './SuccessState.css';

export interface SuccessStateProps {
  title?: string;
  message?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: React.ReactNode;
  className?: string;
}

export const SuccessState: React.FC<SuccessStateProps> = ({
  title = 'Success!',
  message = 'Your action was completed successfully.',
  action,
  icon,
  className = '',
}) => {
  return (
    <div className={`success-state ${className}`} role="status" aria-live="polite">
      <div className="success-state-icon">
        {icon || (
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              d="M20 32L28 40L44 24"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <h2 className="success-state-title">{title}</h2>
      <p className="success-state-message">{message}</p>
      {action && (
        <button className="success-state-action" onClick={action.onClick} type="button">
          {action.label}
        </button>
      )}
    </div>
  );
};
