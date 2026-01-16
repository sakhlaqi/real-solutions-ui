import React, { useState } from 'react';
import { DatePicker } from './DatePicker';
import { TimePicker } from './TimePicker';
import './DateTimePicker.css';

export interface DateTimePickerProps {
  value?: Date;
  onChange?: (date: Date | null) => void;
  label?: string;
  format?: string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  showSeconds?: boolean;
  className?: string;
}

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  value,
  onChange,
  label,
  format = 'MM/DD/YYYY HH:mm',
  minDate,
  maxDate,
  disabled = false,
  error = false,
  helperText,
  fullWidth = false,
  showSeconds = false,
  className = '',
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);
  const [selectedTime, setSelectedTime] = useState<string>(
    value ? formatTime(value, showSeconds) : ''
  );

  function formatTime(date: Date, includeSeconds: boolean): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return includeSeconds ? `${hours}:${minutes}:${seconds}` : `${hours}:${minutes}`;
  }

  function parseTime(timeStr: string): { hours: number; minutes: number; seconds: number } {
    const parts = timeStr.split(':');
    return {
      hours: parseInt(parts[0] || '0', 10),
      minutes: parseInt(parts[1] || '0', 10),
      seconds: parseInt(parts[2] || '0', 10),
    };
  }

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date && selectedTime) {
      const time = parseTime(selectedTime);
      const combined = new Date(date);
      combined.setHours(time.hours, time.minutes, time.seconds);
      onChange?.(combined);
    } else {
      onChange?.(date);
    }
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
    if (selectedDate && time) {
      const timeParts = parseTime(time);
      const combined = new Date(selectedDate);
      combined.setHours(timeParts.hours, timeParts.minutes, timeParts.seconds);
      onChange?.(combined);
    }
  };

  return (
    <div className={`datetime-picker ${fullWidth ? 'full-width' : ''} ${className}`}>
      {label && <label className="datetime-picker-label">{label}</label>}
      
      <div className="datetime-picker-inputs">
        <DatePicker
          value={selectedDate}
          onChange={handleDateChange}
          format={(format.split(' ')[0] || 'MM/DD/YYYY') as 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD'}
          minDate={minDate}
          maxDate={maxDate}
          disabled={disabled}
          error={error ? helperText : undefined}
          className="datetime-picker-date"
        />
        
        <TimePicker
          value={selectedTime}
          onChange={handleTimeChange}
          showSeconds={showSeconds}
          disabled={disabled}
          error={error ? helperText : undefined}
          className="datetime-picker-time"
        />
      </div>

      {helperText && (
        <span className={`datetime-picker-helper ${error ? 'error' : ''}`}>
          {helperText}
        </span>
      )}
    </div>
  );
};
