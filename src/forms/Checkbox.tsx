import React from 'react';
import './Checkbox.css';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  error?: string;
  helperText?: string;
  indeterminate?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked = false,
  onChange,
  error,
  helperText,
  indeterminate = false,
  disabled,
  className = '',
  ...props
}) => {
  const checkboxRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  return (
    <div className={`checkbox-container ${className}`}>
      <label className={`checkbox-label ${disabled ? 'checkbox-label-disabled' : ''}`}>
        <input
          ref={checkboxRef}
          type="checkbox"
          className={`checkbox-input ${error ? 'checkbox-error' : ''}`}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          {...props}
        />
        <span className="checkbox-checkmark"></span>
        {label && <span className="checkbox-text">{label}</span>}
      </label>
      {error && <span className="checkbox-error-text">{error}</span>}
      {!error && helperText && <span className="checkbox-helper-text">{helperText}</span>}
    </div>
  );
};
