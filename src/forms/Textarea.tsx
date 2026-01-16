import React from 'react';
import './Textarea.css';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  fullWidth = false,
  resize = 'vertical',
  disabled,
  required,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

  const classes = [
    'textarea-wrapper',
    fullWidth ? 'textarea-full-width' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      {label && (
        <label htmlFor={inputId} className="textarea-label">
          {label}
          {required && <span className="textarea-required">*</span>}
        </label>
      )}
      <textarea
        id={inputId}
        className={`textarea textarea-resize-${resize} ${error ? 'textarea-error' : ''}`}
        disabled={disabled}
        {...props}
      />
      {error && <span className="textarea-error-text">{error}</span>}
      {helperText && !error && <span className="textarea-helper-text">{helperText}</span>}
    </div>
  );
};
