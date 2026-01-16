import React, { useState, useRef, useEffect } from 'react';
import './TimePicker.css';

export interface TimePickerProps {
  value?: string; // Format: "HH:mm" or "HH:mm:ss"
  onChange?: (time: string) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  required?: boolean;
  use24Hour?: boolean;
  showSeconds?: boolean;
  step?: number; // Minutes step (e.g., 15 for 15-minute intervals)
  className?: string;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  label,
  placeholder = 'Select time',
  error,
  helperText,
  fullWidth = false,
  disabled = false,
  required = false,
  use24Hour = false,
  showSeconds = false,
  step = 1,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hours, setHours] = useState('12');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [period, setPeriod] = useState<'AM' | 'PM'>('AM');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      parseTime(value);
    }
  }, [value]);

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

  const parseTime = (timeString: string) => {
    const parts = timeString.split(':');
    let h = parseInt(parts[0]);
    const m = parts[1] || '00';
    const s = parts[2] || '00';

    if (!use24Hour) {
      if (h >= 12) {
        setPeriod('PM');
        h = h === 12 ? 12 : h - 12;
      } else {
        setPeriod('AM');
        h = h === 0 ? 12 : h;
      }
    }

    setHours(String(h).padStart(2, '0'));
    setMinutes(m);
    setSeconds(s);
  };

  const formatTime = (): string => {
    let h = parseInt(hours);

    if (!use24Hour) {
      if (period === 'PM' && h !== 12) {
        h += 12;
      } else if (period === 'AM' && h === 12) {
        h = 0;
      }
    }

    const timeString = `${String(h).padStart(2, '0')}:${minutes}${showSeconds ? `:${seconds}` : ''}`;
    return timeString;
  };

  const getDisplayTime = (): string => {
    if (!hours) return '';
    
    const timeString = showSeconds 
      ? `${hours}:${minutes}:${seconds}`
      : `${hours}:${minutes}`;
    
    return use24Hour ? timeString : `${timeString} ${period}`;
  };

  const handleApply = () => {
    onChange?.(formatTime());
    setIsOpen(false);
  };

  const handleClear = () => {
    setHours('12');
    setMinutes('00');
    setSeconds('00');
    setPeriod('AM');
    onChange?.('');
  };

  const generateOptions = (max: number, step: number = 1): string[] => {
    const options: string[] = [];
    for (let i = 0; i < max; i += step) {
      options.push(String(i).padStart(2, '0'));
    }
    return options;
  };

  const hourOptions = use24Hour 
    ? generateOptions(24)
    : generateOptions(12).filter(h => h !== '00').concat(['12']);
  
  const minuteOptions = generateOptions(60, step);
  const secondOptions = generateOptions(60);

  return (
    <div className={`timepicker-wrapper ${fullWidth ? 'full-width' : ''} ${className}`} ref={containerRef}>
      {label && (
        <label className="timepicker-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}

      <div className="timepicker-input-wrapper">
        <input
          type="text"
          className={`timepicker-input ${error ? 'error' : ''} ${disabled ? 'disabled' : ''}`}
          value={getDisplayTime()}
          placeholder={placeholder}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          readOnly
          disabled={disabled}
          required={required}
        />
        <div className="timepicker-icons">
          {value && !disabled && (
            <button
              type="button"
              className="timepicker-clear"
              onClick={handleClear}
              aria-label="Clear time"
            >
              ×
            </button>
          )}
          <svg
            className="timepicker-icon"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M10 6V10L13 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className="timepicker-dropdown" role="dialog" aria-label="Choose time">
          <div className="timepicker-selectors">
            <div className="timepicker-column">
              <div className="timepicker-column-label">Hour</div>
              <div className="timepicker-column-values">
                {hourOptions.map(h => (
                  <button
                    key={h}
                    type="button"
                    className={`timepicker-option ${hours === h ? 'selected' : ''}`}
                    onClick={() => setHours(h)}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>

            <div className="timepicker-column">
              <div className="timepicker-column-label">Min</div>
              <div className="timepicker-column-values">
                {minuteOptions.map(m => (
                  <button
                    key={m}
                    type="button"
                    className={`timepicker-option ${minutes === m ? 'selected' : ''}`}
                    onClick={() => setMinutes(m)}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {showSeconds && (
              <div className="timepicker-column">
                <div className="timepicker-column-label">Sec</div>
                <div className="timepicker-column-values">
                  {secondOptions.map(s => (
                    <button
                      key={s}
                      type="button"
                      className={`timepicker-option ${seconds === s ? 'selected' : ''}`}
                      onClick={() => setSeconds(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {!use24Hour && (
              <div className="timepicker-column">
                <div className="timepicker-column-label">Period</div>
                <div className="timepicker-column-values">
                  <button
                    type="button"
                    className={`timepicker-option ${period === 'AM' ? 'selected' : ''}`}
                    onClick={() => setPeriod('AM')}
                  >
                    AM
                  </button>
                  <button
                    type="button"
                    className={`timepicker-option ${period === 'PM' ? 'selected' : ''}`}
                    onClick={() => setPeriod('PM')}
                  >
                    PM
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="timepicker-actions">
            <button
              type="button"
              className="timepicker-button cancel"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="timepicker-button apply"
              onClick={handleApply}
            >
              Apply
            </button>
          </div>
        </div>
      )}

      {error && <span className="timepicker-error">{error}</span>}
      {!error && helperText && <span className="timepicker-helper">{helperText}</span>}
    </div>
  );
};
