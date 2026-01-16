import React, { useState } from 'react';
import './PasswordInput.css';

export interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  showToggle?: boolean;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  error,
  helperText,
  fullWidth = false,
  showToggle = true,
  className = '',
  id,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || `password-${Math.random().toString(36).substr(2, 9)}`;

  const classes = [
    'password-input-wrapper',
    fullWidth ? 'password-input-full-width' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      {label && (
        <label htmlFor={inputId} className="password-input-label">
          {label}
        </label>
      )}
      <div className="password-input-container">
        <input
          id={inputId}
          type={showPassword ? 'text' : 'password'}
          className={`password-input ${error ? 'password-input-error' : ''}`}
          {...props}
        />
        {showToggle && (
          <button
            type="button"
            className="password-input-toggle"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        )}
      </div>
      {error && <span className="password-input-error-text">{error}</span>}
      {helperText && !error && <span className="password-input-helper-text">{helperText}</span>}
    </div>
  );
};
