import React, { useState, useRef, useEffect } from 'react';
import './MultiSelect.css';

export interface MultiSelectOption {
  id: string | number;
  label: string;
  value: any;
  disabled?: boolean;
}

export interface MultiSelectProps {
  options: MultiSelectOption[];
  value?: MultiSelectOption[];
  onChange?: (selected: MultiSelectOption[]) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  required?: boolean;
  maxSelections?: number;
  searchable?: boolean;
  className?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  value = [],
  onChange,
  placeholder = 'Select options...',
  label,
  error,
  helperText,
  fullWidth = false,
  disabled = false,
  required = false,
  maxSelections,
  searchable = true,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = searchable && searchQuery
    ? options.filter(option => 
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (option: MultiSelectOption) => {
    if (option.disabled) return;

    const isSelected = value.some(v => v.id === option.id);
    
    if (isSelected) {
      onChange?.(value.filter(v => v.id !== option.id));
    } else {
      if (maxSelections && value.length >= maxSelections) return;
      onChange?.([...value, option]);
    }
  };

  const handleRemove = (optionId: string | number, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(value.filter(v => v.id !== optionId));
  };

  const handleClearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.([]);
  };

  return (
    <div className={`multiselect-wrapper ${fullWidth ? 'full-width' : ''} ${className}`} ref={containerRef}>
      {label && (
        <label className="multiselect-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      
      <div
        className={`multiselect-control ${error ? 'error' : ''} ${disabled ? 'disabled' : ''} ${isOpen ? 'open' : ''}`}
        onClick={handleToggle}
      >
        <div className="multiselect-values">
          {value.length === 0 ? (
            <span className="multiselect-placeholder">{placeholder}</span>
          ) : (
            value.map(item => (
              <span key={item.id} className="multiselect-tag">
                {item.label}
                <button
                  type="button"
                  className="multiselect-tag-remove"
                  onClick={(e) => handleRemove(item.id, e)}
                  aria-label={`Remove ${item.label}`}
                >
                  ×
                </button>
              </span>
            ))
          )}
        </div>
        
        <div className="multiselect-actions">
          {value.length > 0 && !disabled && (
            <button
              type="button"
              className="multiselect-clear"
              onClick={handleClearAll}
              aria-label="Clear all"
            >
              ×
            </button>
          )}
          <svg
            className={`multiselect-arrow ${isOpen ? 'open' : ''}`}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className="multiselect-dropdown">
          {searchable && (
            <div className="multiselect-search">
              <input
                type="text"
                className="multiselect-search-input"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
          
          <ul className="multiselect-options" role="listbox" aria-multiselectable="true">
            {filteredOptions.length === 0 ? (
              <li className="multiselect-option no-options">No options found</li>
            ) : (
              filteredOptions.map(option => {
                const isSelected = value.some(v => v.id === option.id);
                return (
                  <li
                    key={option.id}
                    className={`multiselect-option ${isSelected ? 'selected' : ''} ${option.disabled ? 'disabled' : ''}`}
                    onClick={() => handleOptionClick(option)}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}}
                      disabled={option.disabled}
                      className="multiselect-checkbox"
                    />
                    <span>{option.label}</span>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}

      {error && <span className="multiselect-error">{error}</span>}
      {!error && helperText && <span className="multiselect-helper">{helperText}</span>}
    </div>
  );
};
