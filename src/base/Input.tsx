/**
 * Input Component
 * Form input with validation states and accessibility support
 */

import React, { useId } from 'react';
import './Input.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Input label text */
  label?: string;
  /** Error message to display */
  error?: string;
  /** Helper text to display below input */
  helperText?: string;
  /** Whether input should take full width */
  fullWidth?: boolean;
  /** Icon or element to display on the left */
  leftIcon?: React.ReactNode;
  /** Icon or element to display on the right */
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  id,
  required,
  disabled,
  ...props
}) => {
  const autoId = useId();
  const inputId = id || autoId;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;
  
  // If value is provided without onChange or readOnly, make it read-only to avoid React warning
  const hasValue = 'value' in props;
  const hasOnChange = 'onChange' in props;
  const hasReadOnly = 'readOnly' in props;
  const shouldBeReadOnly = hasValue && !hasOnChange && !hasReadOnly;
  
  const wrapperClasses = [
    'input-wrapper',
    fullWidth ? 'input-full-width' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const inputClasses = [
    'input',
    error ? 'input-error' : '',
    leftIcon ? 'input-with-left-icon' : '',
    rightIcon ? 'input-with-right-icon' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
          {required && <span className="input-required" aria-label="required">*</span>}
        </label>
      )}
      <div className="input-container">
        {leftIcon && <span className="input-icon input-icon-left">{leftIcon}</span>}
        <input
          id={inputId}
          className={inputClasses}
          required={required}
          disabled={disabled}
          readOnly={shouldBeReadOnly}
          aria-invalid={!!error}
          aria-describedby={
            error ? errorId : helperText ? helperId : undefined
          }
          {...props}
        />
        {rightIcon && <span className="input-icon input-icon-right">{rightIcon}</span>}
      </div>
      {error && (
        <span id={errorId} className="input-error-text" role="alert">
          {error}
        </span>
      )}
      {helperText && !error && (
        <span id={helperId} className="input-helper-text">
          {helperText}
        </span>
      )}
    </div>
  );
};

export default Input;
