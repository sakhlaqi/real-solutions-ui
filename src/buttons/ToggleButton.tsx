import React, { useState } from 'react';
import './ToggleButton.css';

export interface ToggleButtonOption {
  value: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface ToggleButtonProps {
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  options: ToggleButtonOption[];
  multiple?: boolean;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  value: propValue,
  onChange,
  options,
  multiple = false,
  size = 'md',
  fullWidth = false,
  disabled = false,
  className = '',
}) => {
  const [value, setValue] = useState<string | string[]>(propValue ?? (multiple ? [] : ''));

  const isSelected = (optionValue: string): boolean => {
    return Array.isArray(value) ? value.includes(optionValue) : value === optionValue;
  };

  const handleClick = (optionValue: string) => {
    if (disabled) return;

    let newValue: string | string[];

    if (multiple) {
      const valueArray = Array.isArray(value) ? value : [];
      newValue = valueArray.includes(optionValue)
        ? valueArray.filter(v => v !== optionValue)
        : [...valueArray, optionValue];
    } else {
      newValue = isSelected(optionValue) ? '' : optionValue;
    }

    setValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div
      className={`toggle-button-group ${size} ${fullWidth ? 'full-width' : ''} ${
        disabled ? 'disabled' : ''
      } ${className}`}
      role="group"
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`toggle-button ${isSelected(option.value) ? 'selected' : ''} ${
            option.disabled ? 'disabled' : ''
          }`}
          onClick={() => handleClick(option.value)}
          disabled={disabled || option.disabled}
          aria-pressed={isSelected(option.value)}
        >
          {option.icon && <span className="toggle-button-icon">{option.icon}</span>}
          <span className="toggle-button-label">{option.label}</span>
        </button>
      ))}
    </div>
  );
};
