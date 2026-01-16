import React, { useState, useRef, useEffect } from 'react';
import './Autocomplete.css';

export interface AutocompleteOption {
  id: string | number;
  label: string;
  value: any;
  disabled?: boolean;
}

export interface AutocompleteProps {
  options: AutocompleteOption[];
  value?: AutocompleteOption | null;
  onChange?: (option: AutocompleteOption | null) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  required?: boolean;
  loading?: boolean;
  onSearch?: (query: string) => void;
  noOptionsText?: string;
  className?: string;
}

export const Autocomplete: React.FC<AutocompleteProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Search...',
  label,
  error,
  helperText,
  fullWidth = false,
  disabled = false,
  required = false,
  loading = false,
  onSearch,
  noOptionsText = 'No options',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value?.label || '');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setInputValue(value?.label || '');
  }, [value]);

  useEffect(() => {
    if (inputValue === '' || inputValue === value?.label) {
      setFilteredOptions(options);
    } else {
      const filtered = options.filter((option) =>
        option.label.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredOptions(filtered);
    }
  }, [options, inputValue, value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsOpen(true);
    setHighlightedIndex(-1);
    onSearch?.(newValue);

    if (newValue === '') {
      onChange?.(null);
    }
  };

  const handleOptionClick = (option: AutocompleteOption) => {
    if (option.disabled) return;

    setInputValue(option.label);
    onChange?.(option);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setIsOpen(false);
      if (!value) {
        setInputValue('');
      } else if (inputValue !== value.label) {
        setInputValue(value.label);
      }
    }, 200);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
          handleOptionClick(filteredOptions[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && listRef.current) {
      const highlightedElement = listRef.current.children[highlightedIndex] as HTMLElement;
      highlightedElement?.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedIndex, isOpen]);

  return (
    <div className={`autocomplete-wrapper ${fullWidth ? 'full-width' : ''} ${className}`}>
      {label && (
        <label className="autocomplete-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <div className="autocomplete-container">
        <input
          ref={inputRef}
          type="text"
          className={`autocomplete-input ${error ? 'error' : ''} ${disabled ? 'disabled' : ''}`}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls="autocomplete-listbox"
        />
        {loading && <div className="autocomplete-spinner" aria-label="Loading..." />}
        {isOpen && !loading && (
          <ul
            id="autocomplete-listbox"
            ref={listRef}
            className="autocomplete-list"
            role="listbox"
          >
            {filteredOptions.length === 0 ? (
              <li className="autocomplete-option no-options" role="option">
                {noOptionsText}
              </li>
            ) : (
              filteredOptions.map((option, index) => (
                <li
                  key={option.id}
                  className={`autocomplete-option ${option.disabled ? 'disabled' : ''} ${
                    highlightedIndex === index ? 'highlighted' : ''
                  } ${value?.id === option.id ? 'selected' : ''}`}
                  onClick={() => handleOptionClick(option)}
                  role="option"
                  aria-selected={value?.id === option.id}
                  aria-disabled={option.disabled}
                >
                  {option.label}
                </li>
              ))
            )}
          </ul>
        )}
      </div>
      {error && <span className="autocomplete-error">{error}</span>}
      {!error && helperText && <span className="autocomplete-helper">{helperText}</span>}
    </div>
  );
};
