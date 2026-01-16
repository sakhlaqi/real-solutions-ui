import React, { InputHTMLAttributes } from 'react';
import './EmailInput.css';

export interface EmailInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  onValidate?: (isValid: boolean, email: string) => void;
}

export const EmailInput: React.FC<EmailInputProps> = ({
  label,
  error,
  helperText,
  fullWidth = false,
  className = '',
  onValidate,
  onChange,
  ...props
}) => {
  const [touched, setTouched] = React.useState(false);
  const [localError, setLocalError] = React.useState<string | undefined>(error);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (touched && value) {
      const isValid = validateEmail(value);
      setLocalError(isValid ? undefined : 'Please enter a valid email address');
      onValidate?.(isValid, value);
    }
    
    onChange?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    const value = e.target.value;
    
    if (value) {
      const isValid = validateEmail(value);
      setLocalError(isValid ? undefined : 'Please enter a valid email address');
      onValidate?.(isValid, value);
    }
    
    props.onBlur?.(e);
  };

  const displayError = error || localError;

  return (
    <div className={`email-input-wrapper ${fullWidth ? 'full-width' : ''} ${className}`}>
      {label && (
        <label className="email-input-label">
          {label}
          {props.required && <span className="required">*</span>}
        </label>
      )}
      <input
        type="email"
        className={`email-input ${displayError ? 'error' : ''} ${props.disabled ? 'disabled' : ''}`}
        onChange={handleChange}
        onBlur={handleBlur}
        {...props}
      />
      {displayError && <span className="email-input-error">{displayError}</span>}
      {!displayError && helperText && <span className="email-input-helper">{helperText}</span>}
    </div>
  );
};
