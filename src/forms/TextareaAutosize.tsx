import React, { useRef, useEffect } from 'react';
import './TextareaAutosize.css';

export interface TextareaAutosizeProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  value?: string;
  onChange?: (value: string) => void;
  minRows?: number;
  maxRows?: number;
  label?: string;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
}

export const TextareaAutosize: React.FC<TextareaAutosizeProps> = ({
  value = '',
  onChange,
  minRows = 1,
  maxRows,
  label,
  error = false,
  helperText,
  fullWidth = false,
  className = '',
  disabled,
  placeholder,
  ...rest
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = 'auto';

    // Calculate the new height
    const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
    const minHeight = lineHeight * minRows;
    const maxHeight = maxRows ? lineHeight * maxRows : Infinity;

    const newHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);
    textarea.style.height = `${newHeight}px`;

    // Add overflow if we hit maxRows
    textarea.style.overflow = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden';
  };

  useEffect(() => {
    adjustHeight();
  }, [value, minRows, maxRows]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
    adjustHeight();
  };

  return (
    <div className={`textarea-autosize-wrapper ${fullWidth ? 'full-width' : ''} ${className}`}>
      {label && <label className="textarea-label">{label}</label>}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        className={`textarea-autosize ${error ? 'error' : ''} ${disabled ? 'disabled' : ''}`}
        disabled={disabled}
        placeholder={placeholder}
        {...rest}
      />
      {helperText && (
        <span className={`textarea-helper-text ${error ? 'error' : ''}`}>{helperText}</span>
      )}
    </div>
  );
};
