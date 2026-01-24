import React from 'react';
import './ErrorState.css';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: React.ReactNode;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'An error occurred while processing your request. Please try again.',
  action,
  icon,
  className = '',
}) => {
  return (
    <div className={`error-state ${className}`} role="alert" aria-live="assertive">
      <div className="error-state-icon">
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
              d="M32 20V36"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx="32" cy="44" r="2" fill="currentColor" />
          </svg>
        )}
      </div>
      <h2 className="error-state-title">{title}</h2>
      <p className="error-state-message">{message}</p>
      {action && (
        <button className="error-state-action" onClick={action.onClick} type="button">
          {action.label}
        </button>
      )}
    </div>
  );
};
