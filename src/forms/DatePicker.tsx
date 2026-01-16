import React, { useState, useRef, useEffect } from 'react';
import './DatePicker.css';

export interface DatePickerProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  required?: boolean;
  minDate?: Date;
  maxDate?: Date;
  format?: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD';
  className?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  label,
  placeholder = 'Select date',
  error,
  helperText,
  fullWidth = false,
  disabled = false,
  required = false,
  minDate,
  maxDate,
  format = 'MM/DD/YYYY',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(value || new Date());
  const [inputValue, setInputValue] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      setInputValue(formatDate(value, format));
      setCurrentMonth(value);
    } else {
      setInputValue('');
    }
  }, [value, format]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const formatDate = (date: Date, fmt: string): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    switch (fmt) {
      case 'DD/MM/YYYY':
        return `${day}/${month}/${year}`;
      case 'YYYY-MM-DD':
        return `${year}-${month}-${day}`;
      case 'MM/DD/YYYY':
      default:
        return `${month}/${day}/${year}`;
    }
  };

  const isDateDisabled = (date: Date): boolean => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const getDaysInMonth = (date: Date): Date[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: Date[] = [];

    // Previous month's days
    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevDate = new Date(year, month, -startingDayOfWeek + i + 1);
      days.push(prevDate);
    }

    // Current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    // Next month's days to complete the grid
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, month + 1, i));
    }

    return days;
  };

  const handleDateClick = (date: Date) => {
    if (isDateDisabled(date)) return;
    onChange?.(date);
    setIsOpen(false);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleClear = () => {
    onChange?.(null);
    setInputValue('');
  };

  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const isToday = (date: Date): boolean => {
    return isSameDay(date, new Date());
  };

  const days = getDaysInMonth(currentMonth);
  const monthYear = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className={`datepicker-wrapper ${fullWidth ? 'full-width' : ''} ${className}`} ref={containerRef}>
      {label && (
        <label className="datepicker-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}

      <div className="datepicker-input-wrapper">
        <input
          type="text"
          className={`datepicker-input ${error ? 'error' : ''} ${disabled ? 'disabled' : ''}`}
          value={inputValue}
          placeholder={placeholder}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          readOnly
          disabled={disabled}
          required={required}
        />
        <div className="datepicker-icons">
          {value && !disabled && (
            <button
              type="button"
              className="datepicker-clear"
              onClick={handleClear}
              aria-label="Clear date"
            >
              ×
            </button>
          )}
          <svg
            className="datepicker-icon"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M6 2V5M14 2V5M3 8H17M5 4H15C16.1046 4 17 4.89543 17 6V16C17 17.1046 16.1046 18 15 18H5C3.89543 18 3 17.1046 3 16V6C3 4.89543 3.89543 4 5 4Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className="datepicker-calendar" role="dialog" aria-label="Choose date">
          <div className="datepicker-header">
            <button
              type="button"
              className="datepicker-nav"
              onClick={handlePrevMonth}
              aria-label="Previous month"
            >
              ‹
            </button>
            <span className="datepicker-month-year">{monthYear}</span>
            <button
              type="button"
              className="datepicker-nav"
              onClick={handleNextMonth}
              aria-label="Next month"
            >
              ›
            </button>
          </div>

          <div className="datepicker-weekdays">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
              <div key={day} className="datepicker-weekday">
                {day}
              </div>
            ))}
          </div>

          <div className="datepicker-days">
            {days.map((day, index) => {
              const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
              const isSelected = value && isSameDay(day, value);
              const isTodayDate = isToday(day);
              const disabled = isDateDisabled(day);

              return (
                <button
                  key={index}
                  type="button"
                  className={`datepicker-day ${!isCurrentMonth ? 'other-month' : ''} ${
                    isSelected ? 'selected' : ''
                  } ${isTodayDate ? 'today' : ''} ${disabled ? 'disabled' : ''}`}
                  onClick={() => handleDateClick(day)}
                  disabled={disabled}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {error && <span className="datepicker-error">{error}</span>}
      {!error && helperText && <span className="datepicker-helper">{helperText}</span>}
    </div>
  );
};
