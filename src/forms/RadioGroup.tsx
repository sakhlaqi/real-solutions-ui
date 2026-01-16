import React from 'react';
import './RadioGroup.css';

export interface RadioOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  label?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  direction?: 'horizontal' | 'vertical';
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  value,
  onChange,
  label,
  error,
  helperText,
  disabled = false,
  direction = 'vertical',
  className = '',
}) => {
  const handleChange = (optionValue: string | number) => {
    if (onChange && !disabled) {
      onChange(optionValue);
    }
  };

  return (
    <div className={`radio-container ${className}`}>
      {label && <div className="radio-group-label">{label}</div>}
      <div className={`radio-group ${direction === 'horizontal' ? 'radio-group-horizontal' : 'radio-group-vertical'}`} role="radiogroup">
        {options.map((option) => (
          <label
            key={option.value}
            className={`radio-label ${disabled || option.disabled ? 'radio-label-disabled' : ''}`}
          >
            <input
              type="radio"
              name={name}
              className="radio-input"
              value={option.value}
              checked={value === option.value}
              onChange={() => handleChange(option.value)}
              disabled={disabled || option.disabled}
            />
            <span className="radio-checkmark"></span>
            <span className="radio-text">{option.label}</span>
          </label>
        ))}
      </div>
      {error && <span className="radio-error-text">{error}</span>}
      {!error && helperText && <span className="radio-helper-text">{helperText}</span>}
    </div>
  );
};
