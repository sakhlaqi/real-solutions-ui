import React, { InputHTMLAttributes } from 'react';
import './NumberInput.css';

export interface NumberInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  min?: number;
  max?: number;
  step?: number;
  allowDecimals?: boolean;
  allowNegative?: boolean;
  prefix?: string;
  suffix?: string;
  onChange?: (value: number | null) => void;
  onValidate?: (isValid: boolean, value: number | null) => void;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  label,
  error,
  helperText,
  fullWidth = false,
  min,
  max,
  step = 1,
  allowDecimals = true,
  allowNegative = true,
  prefix,
  suffix,
  className = '',
  onChange,
  onValidate,
  value,
  ...props
}) => {
  const [localError, setLocalError] = React.useState<string | undefined>(error);
  const [displayValue, setDisplayValue] = React.useState<string>(value?.toString() || '');

  React.useEffect(() => {
    setDisplayValue(value?.toString() || '');
  }, [value]);

  const validateNumber = (numValue: number | null): string | undefined => {
    if (numValue === null) return undefined;
    
    if (!allowNegative && numValue < 0) {
      return 'Negative numbers are not allowed';
    }
    
    if (min !== undefined && numValue < min) {
      return `Value must be at least ${min}`;
    }
    
    if (max !== undefined && numValue > max) {
      return `Value must be at most ${max}`;
    }
    
    return undefined;
  };

  const parseValue = (strValue: string): number | null => {
    if (!strValue) return null;
    
    const parsed = parseFloat(strValue);
    return isNaN(parsed) ? null : parsed;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    
    // Allow empty string
    if (!newValue) {
      setDisplayValue('');
      setLocalError(undefined);
      onChange?.(null);
      onValidate?.(true, null);
      return;
    }
    
    // Allow negative sign at the start if negative numbers are allowed
    if (allowNegative && newValue === '-') {
      setDisplayValue('-');
      return;
    }
    
    // Allow decimal point if decimals are allowed
    if (allowDecimals && (newValue.endsWith('.') || newValue.endsWith('.0'))) {
      setDisplayValue(newValue);
      return;
    }
    
    const numValue = parseValue(newValue);
    
    if (numValue !== null) {
      setDisplayValue(newValue);
      const validationError = validateNumber(numValue);
      setLocalError(validationError);
      onChange?.(numValue);
      onValidate?.(!validationError, numValue);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const numValue = parseValue(displayValue);
    
    if (numValue !== null && !allowDecimals) {
      const rounded = Math.round(numValue);
      setDisplayValue(rounded.toString());
      onChange?.(rounded);
    }
    
    props.onBlur?.(e);
  };

  const handleIncrement = () => {
    const current = parseValue(displayValue) || 0;
    const newValue = current + step;
    const validationError = validateNumber(newValue);
    
    if (!validationError) {
      setDisplayValue(newValue.toString());
      setLocalError(undefined);
      onChange?.(newValue);
      onValidate?.(true, newValue);
    }
  };

  const handleDecrement = () => {
    const current = parseValue(displayValue) || 0;
    const newValue = current - step;
    const validationError = validateNumber(newValue);
    
    if (!validationError) {
      setDisplayValue(newValue.toString());
      setLocalError(undefined);
      onChange?.(newValue);
      onValidate?.(true, newValue);
    }
  };

  const displayError = error || localError;

  return (
    <div className={`number-input-wrapper ${fullWidth ? 'full-width' : ''} ${className}`}>
      {label && (
        <label className="number-input-label">
          {label}
          {props.required && <span className="required">*</span>}
        </label>
      )}
      <div className="number-input-container">
        {prefix && <span className="number-input-prefix">{prefix}</span>}
        <input
          type="text"
          inputMode="numeric"
          className={`number-input ${displayError ? 'error' : ''} ${props.disabled ? 'disabled' : ''} ${prefix ? 'has-prefix' : ''} ${suffix ? 'has-suffix' : ''}`}
          value={displayValue}
          onChange={handleChange}
          onBlur={handleBlur}
          {...props}
        />
        {suffix && <span className="number-input-suffix">{suffix}</span>}
        <div className="number-input-controls">
          <button
            type="button"
            className="number-input-btn increment"
            onClick={handleIncrement}
            disabled={props.disabled}
            aria-label="Increment"
          >
            ▲
          </button>
          <button
            type="button"
            className="number-input-btn decrement"
            onClick={handleDecrement}
            disabled={props.disabled}
            aria-label="Decrement"
          >
            ▼
          </button>
        </div>
      </div>
      {displayError && <span className="number-input-error">{displayError}</span>}
      {!displayError && helperText && <span className="number-input-helper">{helperText}</span>}
    </div>
  );
};
