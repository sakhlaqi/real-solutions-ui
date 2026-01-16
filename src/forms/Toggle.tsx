import React from 'react';
import './Toggle.css';

export interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'size'> {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Toggle: React.FC<ToggleProps> = ({
  label,
  checked = false,
  onChange,
  helperText,
  size = 'md',
  disabled,
  className = '',
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  return (
    <div className={`toggle-container ${className}`}>
      <label className={`toggle-label ${disabled ? 'toggle-label-disabled' : ''}`}>
        {label && <span className="toggle-text">{label}</span>}
        <div className={`toggle-switch toggle-switch-${size}`}>
          <input
            type="checkbox"
            className="toggle-input"
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            {...props}
          />
          <span className="toggle-slider"></span>
        </div>
      </label>
      {helperText && <span className="toggle-helper-text">{helperText}</span>}
    </div>
  );
};
